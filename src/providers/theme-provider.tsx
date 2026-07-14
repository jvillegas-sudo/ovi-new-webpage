"use client";

import { type PropsWithChildren, useEffect } from "react";

import { env } from "@/config/env";
import { useUIStore } from "@/store/ui-store";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(env.NEXT_PUBLIC_DEFAULT_THEME);
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return children;
};
