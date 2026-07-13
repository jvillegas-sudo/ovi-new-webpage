import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-bg-base hover:bg-brand-secondary",
        ghost: "border border-white/20 bg-white/5 text-text-primary hover:bg-white/10",
        cta: "border-0 bg-[linear-gradient(90deg,var(--brand-secondary)_0%,var(--brand-accent)_100%)] text-text-primary shadow-glass hover:brightness-105",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-16 px-10 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
