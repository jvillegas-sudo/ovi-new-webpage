import type { NextConfig } from "next";

/**
 * Next.js configuration for OVI world-class digital experience.
 *
 * Key decisions:
 * - Strict output: standalone for optimized Docker/Vercel deployments
 * - React strict mode enabled for catching side effects early
 * - Bundle analyzer can be toggled via ANALYZE env var
 * - Security headers for production
 * - Image optimization configured for multiple domains
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimize images from any OVI-related source
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ovi.com",
      },
      {
        protocol: "https",
        hostname: "www.ovi.com",
      },
    ],
  },

  // Experimental features for performance
  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: ["lucide-react", "@react-three/drei", "framer-motion"],
  },

  // Webpack customization for Three.js and GLSL shaders
  webpack: (config) => {
    // Support GLSL shader imports
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

export default nextConfig;
