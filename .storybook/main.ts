import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@config": path.resolve(__dirname, "../src/config"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@animations": path.resolve(__dirname, "../src/animations"),
        "@three": path.resolve(__dirname, "../src/three"),
        "@store": path.resolve(__dirname, "../src/store"),
        "@lib": path.resolve(__dirname, "../src/lib"),
        "@hooks": path.resolve(__dirname, "../src/hooks"),
      };
    }
    return config;
  },
};

export default config;
