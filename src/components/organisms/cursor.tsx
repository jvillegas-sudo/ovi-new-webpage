"use client";

import { motion } from "framer-motion";

export const Cursor = () => {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-cursor hidden h-6 w-6 rounded-full border border-brand-primary/60 bg-brand-primary/20 backdrop-blur md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.75 }}
      transition={{ duration: 0.4 }}
    />
  );
};
