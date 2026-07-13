import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

/**
 * Storybook Preview Configuration
 *
 * Sets up the OVI design system context for all stories:
 * - Injects global CSS (design tokens, Tailwind)
 * - Dark-first theme (matches production)
 * - Consistent viewport and background settings
 */
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#050508" },
        { name: "surface", value: "#0a0a0f" },
        { name: "elevated", value: "#0f0f18" },
      ],
    },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: ["dark"],
        showName: true,
      },
    },
  },
};

export default preview;
