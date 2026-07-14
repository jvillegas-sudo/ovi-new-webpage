import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type TextProps = HTMLAttributes<HTMLParagraphElement>;

export const Text = ({ className, ...props }: TextProps) => {
  return <p className={cn("text-pretty text-base leading-7 text-text-secondary", className)} {...props} />;
};
