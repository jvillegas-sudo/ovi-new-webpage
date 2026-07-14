import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-text-primary outline-none transition focus-visible:ring-2 focus-visible:ring-brand-primary",
        className,
      )}
      {...props}
    />
  );
};
