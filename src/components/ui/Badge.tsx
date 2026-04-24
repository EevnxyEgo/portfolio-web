import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
    inline-flex items-center justify-center
    font-mono text-xs font-medium
    px-2.5 py-1 rounded-[var(--radius-sm)]
    transition-all duration-200
  `,
  {
    variants: {
      variant: {
        default: `
          bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]
          border border-[var(--color-border)]
        `,
        primary: `
          bg-[var(--color-primary-muted)] text-[var(--color-primary)]
          border border-[rgba(232,51,10,0.3)]
          hover:border-[var(--color-primary)]
        `,
        accent: `
          bg-[var(--color-accent-muted)] text-[var(--color-accent)]
          border border-[rgba(0,212,255,0.3)]
          hover:border-[var(--color-accent)]
        `,
        success: `
          bg-[rgba(34,197,94,0.15)] text-[var(--color-success)]
          border border-[rgba(34,197,94,0.3)]
        `,
        warning: `
          bg-[rgba(245,158,11,0.15)] text-[var(--color-warning)]
          border border-[rgba(245,158,11,0.3)]
        `,
        error: `
          bg-[rgba(239,68,68,0.15)] text-[var(--color-error)]
          border border-[rgba(239,68,68,0.3)]
        `,
        outline: `
          bg-transparent text-[var(--color-text-secondary)]
          border border-[var(--color-border-bright)]
        `,
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
