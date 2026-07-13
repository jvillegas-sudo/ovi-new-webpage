import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText, SkeletonCard } from "@components/ui/Skeleton";

/**
 * ## Skeleton
 *
 * Loading placeholder that mimics content structure.
 * Shows an animated shimmer while real data loads.
 *
 * ### Components
 * - `Skeleton` — single block
 * - `SkeletonText` — multi-line text block
 * - `SkeletonCard` — pre-built card placeholder
 *
 * ### Guidelines
 * - Mirror the shape of the content it replaces
 * - Use `variant="circle"` for avatars
 * - Combine Skeleton primitives to match complex layouts
 */
const meta: Meta<typeof Skeleton> = {
  title: "Design System/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Block: Story = {
  args: { className: "h-4 w-48" },
};

export const Circle: Story = {
  args: { variant: "circle", className: "size-10" },
};

export const TextBlock: Story = {
  render: () => <SkeletonText lines={4} style={{ width: 360 }} />,
};

export const CardPlaceholder: Story = {
  render: () => <SkeletonCard style={{ width: 360 }} />,
};

export const TableRows: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 480 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circle" className="size-8 shrink-0" />
          <div className="flex flex-1 gap-4">
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: 600 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  ),
};

export const ProfileHeader: Story = {
  render: () => (
    <div className="flex items-start gap-4" style={{ width: 400 }}>
      <Skeleton variant="circle" className="size-16 shrink-0" />
      <div className="flex flex-1 flex-col gap-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3.5 w-24" />
        <SkeletonText lines={2} lastLineWidth="70%" />
      </div>
    </div>
  ),
};
