/**
 * Environment Variables Type Definitions
 *
 * Typed access to process.env and NEXT_PUBLIC_ variables.
 * This prevents runtime surprises from missing env vars.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_APP_URL: string;
    readonly NEXT_PUBLIC_APP_NAME: string;
    readonly NEXT_PUBLIC_APP_DESCRIPTION: string;
    readonly NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    readonly NEXT_PUBLIC_CDN_URL?: string;
    readonly RESEND_API_KEY?: string;
    readonly CONTACT_EMAIL?: string;
    readonly NODE_ENV: "development" | "production" | "test";
  }
}
