import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary",
        className,
      )}
      {...props}
    />
  );
};
