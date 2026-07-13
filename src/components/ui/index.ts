/**
 * UI Components — Barrel Export
 * Atomic Design: Atoms and Molecules
 *
 * ─── Layout Primitives ───────────────────────────────────────────────────────
 * Container, Section
 *
 * ─── Typography ──────────────────────────────────────────────────────────────
 * Heading, Text, Label, Kbd
 *
 * ─── Buttons & Actions ───────────────────────────────────────────────────────
 * Button, Icon, IconButton
 *
 * ─── Feedback & Status ───────────────────────────────────────────────────────
 * Badge, Alert, Spinner, Loader, Progress, Skeleton
 *
 * ─── Data Display ────────────────────────────────────────────────────────────
 * Card, Avatar, AvatarGroup, Separator
 *
 * ─── Forms ───────────────────────────────────────────────────────────────────
 * Input, Textarea, Select, Checkbox, RadioGroup, Radio, Switch, FormField, FormGroup
 *
 * ─── Navigation ──────────────────────────────────────────────────────────────
 * Tabs, TabsList, TabsTrigger, TabsContent, Breadcrumb
 *
 * ─── Overlays ────────────────────────────────────────────────────────────────
 * Modal, Dialog, Tooltip
 *
 * ─── Animation ───────────────────────────────────────────────────────────────
 * AnimateIn, AnimateStagger
 *
 * ─── App Shell ───────────────────────────────────────────────────────────────
 * Cursor
 */

// ─── Layout Primitives ───────────────────────────────────────────────────────
export { Container } from "./Container";
export type { ContainerProps } from "./Container";

export { Section } from "./Section";
export type { SectionProps } from "./Section";

// ─── Typography ──────────────────────────────────────────────────────────────
export { Heading, headingVariants } from "./Heading";
export type { HeadingProps } from "./Heading";

export { Text, textVariants } from "./Text";
export type { TextProps } from "./Text";

export { Label } from "./Label";
export type { LabelProps } from "./Label";

export { Kbd } from "./Kbd";
export type { KbdProps } from "./Kbd";

// ─── Buttons & Actions ───────────────────────────────────────────────────────
export { Button, buttonVariants } from "./Button";
export type { ButtonProps } from "./Button";

export { Icon, IconButton, iconVariants, iconButtonVariants } from "./Icon";
export type { IconProps, IconButtonProps } from "./Icon";

// ─── Feedback & Status ───────────────────────────────────────────────────────
export { Badge, badgeVariants } from "./Badge";
export type { BadgeProps } from "./Badge";

export { Alert, alertVariants } from "./Alert";
export type { AlertProps } from "./Alert";

export { Spinner, spinnerVariants } from "./Spinner";
export type { SpinnerProps } from "./Spinner";

export { Loader } from "./Loader";

export { Progress, progressTrackVariants, progressFillVariants } from "./Progress";
export type { ProgressProps } from "./Progress";

export { Skeleton, SkeletonText, SkeletonCard, skeletonVariants } from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";

// ─── Data Display ─────────────────────────────────────────────────────────────
export { Card, CardHeader, CardContent, CardFooter, cardVariants } from "./Card";
export type { CardProps } from "./Card";

export { Avatar, AvatarGroup, avatarVariants } from "./Avatar";
export type { AvatarProps } from "./Avatar";

export { Separator, separatorVariants } from "./Separator";
export type { SeparatorProps } from "./Separator";

// ─── Forms ────────────────────────────────────────────────────────────────────
export { Input } from "./Input";
export type { InputProps } from "./Input";

export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export { Select } from "./Select";
export type { SelectProps, SelectOption } from "./Select";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { RadioGroup, Radio } from "./RadioGroup";
export type { RadioGroupProps, RadioProps } from "./RadioGroup";

export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

export { FormField, FormGroup } from "./FormField";
export type { FormFieldProps } from "./FormField";

// ─── Navigation ───────────────────────────────────────────────────────────────
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./Tabs";

export { Breadcrumb } from "./Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb";

// ─── Overlays ─────────────────────────────────────────────────────────────────
export { Modal, Dialog } from "./Modal";

export { Tooltip } from "./Tooltip";
export type { TooltipProps } from "./Tooltip";

// ─── Animation ────────────────────────────────────────────────────────────────
export { AnimateIn } from "./AnimateIn";
export type { AnimateInProps, AnimateInAnimation } from "./AnimateIn";

export { AnimateStagger } from "./AnimateStagger";
export type { AnimateStaggerProps } from "./AnimateStagger";

// ─── App Shell ────────────────────────────────────────────────────────────────
export { Cursor } from "./Cursor";
