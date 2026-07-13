"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Modal } from "@/components/organisms/modal";

type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

export const Dialog = ({ open, title, description, onClose }: DialogProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <AlertTriangle className="h-5 w-5 text-brand-primary" aria-hidden />
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
