"use client";

/**
 * UI Component: Loader
 *
 * Full-screen loading overlay shown on initial page load.
 * Animated with Framer Motion — fades out after assets are ready.
 *
 * The OVI Loader features the brand icon with a pulse animation.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useUIStore } from "@store/ui.store";
import { cn } from "@utils/cn";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  const isLoading = useUIStore((s) => s.isLoading);
  const setLoading = useUIStore((s) => s.setLoading);

  useEffect(() => {
    let didFinish = false;
    let hideTimer: number | undefined;
    let fallbackTimer: number | undefined;

    const finishLoading = () => {
      if (didFinish) return;
      didFinish = true;
      hideTimer = window.setTimeout(() => setLoading(false), 250);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
      fallbackTimer = window.setTimeout(finishLoading, 6000);
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [setLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[9998] flex items-center justify-center",
            "bg-[var(--color-bg-base)]",
            className,
          )}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          aria-label="Cargando OVI — Ingeniería en Limpieza"
          role="status"
          aria-live="polite"
        >
          {/* Brand Logo Mark */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Outer ring pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[var(--color-brand-primary)] opacity-30"
                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Logo container */}
              <div className="flex size-16 items-center justify-center rounded-2xl border border-[var(--color-border-brand)] bg-[var(--glass-bg)] backdrop-blur-sm">
                <span
                  className="text-2xl font-black tracking-tighter text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                >
                  OVI
                </span>
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="h-px w-32 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
              <motion.div
                className="h-full bg-[var(--color-brand-primary)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.2,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
