import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-text-primary outline-none transition focus-visible:ring-2 focus-visible:ring-brand-primary",
        className,
      )}
      {...props}
    />
  );
};
