"use client";

/**
 * UI Component: Avatar
 *
 * User profile picture with image, initials, and icon fallback states.
 * Supports multiple sizes and optional online indicator.
 *
 * @example
 *   <Avatar src="/user.jpg" alt="Jane Doe" />
 *   <Avatar initials="JD" size="lg" />
 *   <AvatarGroup avatars={[...]} max={4} />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import { cn } from "@utils/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-bg-elevated)] select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px]",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
        "2xl": "size-20 text-xl",
      },
      ring: {
        none: "",
        default: "ring-2 ring-[var(--color-border-subtle)]",
        brand: "ring-2 ring-[var(--color-brand-primary)]",
        accent: "ring-2 ring-[var(--color-brand-accent)]",
      },
    },
    defaultVariants: {
      size: "md",
      ring: "none",
    },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  /** Show online status indicator */
  online?: boolean;
}

function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ring, src, alt, initials, online, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = src && !imgError;
    const displayInitials = initials ?? (alt ? getInitials(alt) : "");

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, ring }), className)}
        aria-label={alt}
        role={alt ? "img" : undefined}
        {...props}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            className="size-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : displayInitials ? (
          <span className="font-semibold text-[var(--color-text-secondary)]">
            {displayInitials}
          </span>
        ) : (
          <User className="size-[45%] text-[var(--color-text-tertiary)]" aria-hidden="true" />
        )}

        {/* Online indicator */}
        {online !== undefined && (
          <span
            className={cn(
              "absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-[var(--color-bg-base)]",
              online ? "bg-[var(--color-brand-success)]" : "bg-[var(--color-text-tertiary)]",
            )}
            aria-label={online ? "Online" : "Offline"}
          />
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

// ─── Avatar Group ─────────────────────────────────────────────────────────────

interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
}

function AvatarGroup({ avatars, max = 5, size = "sm", className, ...props }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div
      className={cn("flex items-center -space-x-2", className)}
      aria-label={`${avatars.length} users`}
      {...props}
    >
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar.src}
          alt={avatar.alt}
          initials={avatar.initials}
          size={size}
          ring="default"
          className="transition-transform hover:z-10 hover:-translate-y-0.5"
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            avatarVariants({ size, ring: "default" }),
            "bg-[var(--glass-bg)] font-semibold text-[var(--color-text-secondary)]",
          )}
          aria-label={`${overflow} more users`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
