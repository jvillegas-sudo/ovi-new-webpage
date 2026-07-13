"use client";

import { type PropsWithChildren } from "react";

import { cn } from "@/lib/cn";

type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal>
      <div className={cn("w-full max-w-lg rounded-2xl border border-white/15 bg-bg-elevated p-6")}>{children}</div>
      <button
        aria-label="Close modal"
        className="absolute inset-0 -z-10"
        type="button"
        onClick={onClose}
      />
    </div>
  );
};
