#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, join, parse, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const INPUT_DIR = resolve(ROOT, "content/ingest");
const OUTPUT_DIR = resolve(ROOT, "public/ovi-dam");
const METADATA_DIR = resolve(OUTPUT_DIR, "metadata");
const THUMBNAILS_DIR = resolve(OUTPUT_DIR, "thumbnails");
const IMAGE_TARGET_WIDTH = { mobile: 768, retina: 2048 };
const THUMBNAIL_SIZES = [256, 512, 1024];
const MIN_IMAGE_WIDTH = 1024;
const MIN_IMAGE_HEIGHT = 720;
const MIN_VIDEO_HEIGHT = 720;
const OFFICIAL_SOURCES = new Set([
  "sitio-web-oficial-ovi",
  "instagram-oficial-ovi",
  "brochure-oficial",
  "caso-de-exito-oficial",
  "catalogo-de-productos-oficial",
  "fotografia-oficial",
  "video-oficial",
  "logo-oficial",
  "manual-de-marca-oficial",
  "documentacion-tecnica-oficial",
]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".m4v", ".webm"]);
const REQUIRED_METADATA_FIELDS = [
  "id",
  "name",
  "title",
  "description",
  "category",
  "sector",
  "service",
  "product",
  "client",
  "case",
  "asset",
  "language",
  "priority",
  "qualityScore",
  "commercialScore",
  "dnaOviScore",
  "date",
  "source",
  "copyright",
  "status",
];

function run(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function ensureTool(tool) {
  try {
    run(tool, ["-version"]);
  } catch {
    console.error(`Missing required binary: ${tool}`);
    process.exit(1);
  }
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function normalizeCategoryFromPath(filePath) {
  const rel = relative(INPUT_DIR, filePath).replaceAll("\\", "/");
  return rel.split("/")[0] ?? "uncategorized";
}

function outputCategoryFolder(category, resourceType) {
  if (resourceType === "video") return resolve(OUTPUT_DIR, "videos");
  const allowed = new Set([
    "cases",
    "services",
    "products",
    "industries",
    "team",
    "logos",
    "textures",
  ]);
  return resolve(OUTPUT_DIR, "images", allowed.has(category) ? category : "products");
}

function hashFile(filePath) {
  const hash = createHash("sha256");
  hash.update(readFileSync(filePath));
  return hash.digest("hex");
}

function ffprobe(filePath) {
  const output = run("ffprobe", [
    "-v",
    "error",
    "-print_format",
    "json",
    "-show_format",
    "-show_streams",
    filePath,
  ]);
  return JSON.parse(output);
}

function getVisualStream(probe, codecType) {
  return probe.streams.find((stream) => stream.codec_type === codecType);
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function scoreInRange(score) {
  return Number.isInteger(score) && score >= 1 && score <= 5;
}

function validateMetadata(meta, filePath) {
  const missing = REQUIRED_METADATA_FIELDS.filter(
    (field) => meta[field] === undefined || meta[field] === null || meta[field] === "",
  );
  if (missing.length > 0)
    throw new Error(`Metadata incompleta (${missing.join(", ")}) en ${filePath}`);
  if (!OFFICIAL_SOURCES.has(meta.sourceType))
    throw new Error(`Fuente no autorizada en ${filePath}: ${meta.sourceType}`);
  if (
    !scoreInRange(meta.qualityScore) ||
    !scoreInRange(meta.commercialScore) ||
    !scoreInRange(meta.dnaOviScore)
  ) {
    throw new Error(`Scores fuera de rango (1-5) en ${filePath}`);
  }
}

function loadSidecarMetadata(assetPath) {
  const sidecarPath = `${assetPath}.json`;
  if (!existsSync(sidecarPath)) throw new Error(`Metadata sidecar faltante: ${sidecarPath}`);
  const metadata = JSON.parse(readFileSync(sidecarPath, "utf8"));
  validateMetadata(metadata, sidecarPath);
  return metadata;
}

function createImageDerivatives(assetPath, baseName, category) {
  const categoryOutput = outputCategoryFolder(category, "image");
  ensureDir(categoryOutput);
  ensureDir(THUMBNAILS_DIR);

  const ext = extname(assetPath).toLowerCase();
  const originalPath = join(categoryOutput, `${baseName}-ORIGINAL${ext}`);
  const webpPath = join(categoryOutput, `${baseName}.webp`);
  const avifPath = join(categoryOutput, `${baseName}.avif`);
  const mobilePath = join(categoryOutput, `${baseName}-MOBILE.webp`);
  const retinaPath = join(categoryOutput, `${baseName}-RETINA.webp`);

  cpSync(assetPath, originalPath);
  run("ffmpeg", ["-y", "-i", assetPath, "-q:v", "85", webpPath]);
  run("ffmpeg", ["-y", "-i", assetPath, "-q:v", "40", avifPath]);
  run("ffmpeg", [
    "-y",
    "-i",
    assetPath,
    "-vf",
    `scale=${IMAGE_TARGET_WIDTH.mobile}:-2`,
    "-q:v",
    "85",
    mobilePath,
  ]);
  run("ffmpeg", [
    "-y",
    "-i",
    assetPath,
    "-vf",
    `scale=${IMAGE_TARGET_WIDTH.retina}:-2`,
    "-q:v",
    "85",
    retinaPath,
  ]);

  const thumbnails = THUMBNAIL_SIZES.map((size) => {
    const thumbnailPath = join(THUMBNAILS_DIR, `${baseName}-THUMB-${size}.webp`);
    run("ffmpeg", ["-y", "-i", assetPath, "-vf", `scale=${size}:-2`, "-q:v", "85", thumbnailPath]);
    return thumbnailPath;
  });

  return { originalPath, webpPath, avifPath, mobilePath, retinaPath, thumbnails };
}

function createVideoDerivatives(assetPath, baseName) {
  const videosOutput = resolve(OUTPUT_DIR, "videos");
  ensureDir(videosOutput);
  ensureDir(THUMBNAILS_DIR);

  const mp4Path = join(videosOutput, `${baseName}.mp4`);
  const previewPath = join(videosOutput, `${baseName}-PREVIEW.mp4`);
  const posterPath = join(THUMBNAILS_DIR, `${baseName}-POSTER.jpg`);

  run("ffmpeg", [
    "-y",
    "-i",
    assetPath,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "22",
    "-c:a",
    "aac",
    mp4Path,
  ]);
  run("ffmpeg", [
    "-y",
    "-i",
    mp4Path,
    "-ss",
    "00:00:01",
    "-t",
    "00:00:06",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "28",
    "-an",
    previewPath,
  ]);
  run("ffmpeg", ["-y", "-i", mp4Path, "-ss", "00:00:02", "-vframes", "1", posterPath]);

  return { mp4Path, previewPath, posterPath };
}

function writeMetadata(baseName, metadata, assetPath, derivatives, mediaProbe) {
  ensureDir(METADATA_DIR);
  const stream = getVisualStream(mediaProbe, metadata.asset === "video" ? "video" : "video") ?? {};
  const payload = {
    ...metadata,
    id: metadata.id || baseName,
    fileName: parse(assetPath).base,
    generatedAt: new Date().toISOString(),
    qualityTotal: metadata.qualityScore + metadata.commercialScore + metadata.dnaOviScore,
    resolution: stream.width && stream.height ? `${stream.width}x${stream.height}` : null,
    durationSeconds: mediaProbe.format?.duration ? Number(mediaProbe.format.duration) : null,
    outputs: derivatives,
  };
  writeFileSync(join(METADATA_DIR, `${baseName}.json`), `${JSON.stringify(payload, null, 2)}\n`);
}

function validateMediaQuality(assetPath, resourceType, probe) {
  const stream = getVisualStream(probe, "video");
  if (!stream) throw new Error(`Archivo corrupto o sin stream visual: ${assetPath}`);
  const width = Number(stream.width || 0);
  const height = Number(stream.height || 0);
  if (resourceType === "image" && (width < MIN_IMAGE_WIDTH || height < MIN_IMAGE_HEIGHT)) {
    throw new Error(`Calidad mínima no cumplida para imagen ${assetPath} (${width}x${height})`);
  }
  if (resourceType === "video" && height < MIN_VIDEO_HEIGHT) {
    throw new Error(`Calidad mínima no cumplida para video ${assetPath} (${width}x${height})`);
  }
}

function main() {
  const files = walk(INPUT_DIR).filter((filePath) => {
    const extension = extname(filePath).toLowerCase();
    return IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension);
  });

  if (files.length === 0) {
    console.log("No hay recursos en content/ingest para procesar.");
    return;
  }

  ensureTool("ffmpeg");
  ensureTool("ffprobe");

  const seenHashes = new Map();
  const skipped = [];
  const processed = [];

  for (const filePath of files) {
    const extension = extname(filePath).toLowerCase();
    const resourceType = IMAGE_EXTENSIONS.has(extension) ? "image" : "video";
    const hash = hashFile(filePath);

    if (seenHashes.has(hash)) {
      skipped.push({ filePath, reason: `Duplicado de ${seenHashes.get(hash)}` });
      continue;
    }
    seenHashes.set(hash, filePath);

    try {
      const metadata = loadSidecarMetadata(filePath);
      const probe = ffprobe(filePath);
      validateMediaQuality(filePath, resourceType, probe);

      const baseName = metadata.id;
      const category = normalizeCategoryFromPath(filePath);
      const derivatives =
        resourceType === "image"
          ? createImageDerivatives(filePath, baseName, category)
          : createVideoDerivatives(filePath, baseName);

      writeMetadata(baseName, metadata, filePath, derivatives, probe);
      processed.push(filePath);
    } catch (error) {
      skipped.push({ filePath, reason: error.message });
    }
  }

  const reportPath = resolve(OUTPUT_DIR, "dam-report.json");
  writeFileSync(
    reportPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        processedCount: processed.length,
        skippedCount: skipped.length,
        processed,
        skipped,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Procesados: ${processed.length}`);
  console.log(`Descartados: ${skipped.length}`);
  console.log(`Reporte: ${relative(ROOT, reportPath)}`);
}

main();
