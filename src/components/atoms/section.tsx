import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement>;

export const Section = ({ className, ...props }: SectionProps) => {
  return <section className={cn("py-16 md:py-24", className)} {...props} />;
};
