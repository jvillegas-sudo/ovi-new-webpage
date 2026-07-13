import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://www.oviventures.com"),
  NEXT_PUBLIC_SITE_NAME: z.string().min(2).default("OVI"),
  NEXT_PUBLIC_DEFAULT_THEME: z.enum(["dark", "light"]).default("dark"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_DEFAULT_THEME: process.env.NEXT_PUBLIC_DEFAULT_THEME,
});
