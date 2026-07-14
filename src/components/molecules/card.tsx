import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <article
      className={cn(
        "rounded-2xl border border-white/15 bg-bg-glass p-6 shadow-glass backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
};
