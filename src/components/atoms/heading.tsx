import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({ className, ...props }: HeadingProps) => {
  return (
    <h2
      className={cn(
        "text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl",
        className,
      )}
      {...props}
    />
  );
};
