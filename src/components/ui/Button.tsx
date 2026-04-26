"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { MagneticElement } from "@/components/shared/MagneticElement";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    font-dm-sans font-medium text-sm
    transition-all duration-200 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
    disabled:pointer-events-none disabled:opacity-50
    cursor-pointer
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-[var(--color-primary)] text-white
          hover:bg-[var(--color-primary-dark)]
          active:bg-[var(--color-primary-dark)]
        `,
        secondary: `
          bg-transparent text-[var(--color-primary)] border border-[var(--color-border-strong)]
          hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
          active:bg-[var(--color-primary-muted)]
        `,
        ghost: `
          bg-transparent text-[var(--color-text)]
          hover:bg-[var(--color-bg-elevated)]
          active:bg-[var(--color-bg-subtle)]
        `,
      },
      size: {
        sm: "h-9 px-4 rounded-[var(--radius-md)] text-xs",
        md: "h-11 px-6 rounded-[var(--radius-lg)] text-sm",
        lg: "h-13 px-8 rounded-[var(--radius-xl)] text-base",
        pill: "h-11 px-8 rounded-[var(--radius-full)] text-sm",
        icon: "h-10 w-10 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      asChild = false,
      magnetic = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = buttonVariants({ variant, size, className });

    const content = (
      <>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    );

    const element = asChild ? (
      <Link href={href || "#"} className={baseClasses}>
        {content}
      </Link>
    ) : (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );

    if (magnetic && !asChild) {
      return <MagneticElement strength={0.2}>{element}</MagneticElement>;
    }

    return element;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
