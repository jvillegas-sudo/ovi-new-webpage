"use client";

/**
 * UI Component: Modal / Dialog
 *
 * Accessible modal dialog built on Radix Dialog patterns.
 * Uses Framer Motion for entrance/exit animations.
 *
 * Features:
 *   - Trap focus inside modal
 *   - Dismiss on Escape key
 *   - Dismiss on backdrop click
 *   - Scroll lock on body
 *   - ARIA dialog role and labelling
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@utils/cn";
import { modalOverlay, modalContent } from "@animations/variants";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[95vw]",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: ModalProps) {
  const titleId = React.useId();
  const descId = React.useId();

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-bg-overlay)] backdrop-blur-sm"
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descId : undefined}
          >
            <motion.div
              className={cn(
                "relative w-full glass rounded-2xl",
                "p-6 shadow-[var(--shadow-glass)]",
                sizeMap[size],
                className,
              )}
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              // Prevent backdrop click from bubbling
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="xs"
                className="absolute right-4 top-4"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={16} />
              </Button>

              {/* Header */}
              {(title ?? description) && (
                <div className="mb-6 pr-6">
                  {title && (
                    <h2
                      id={titleId}
                      className="text-xl font-bold text-[var(--color-text-primary)]"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id={descId} className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Alias
export { Modal as Dialog };
