"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { MagneticElement } from "@/components/shared/MagneticElement";

const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    font-heading font-medium text-sm
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
          hover:bg-[var(--color-primary-glow)] hover:shadow-[var(--shadow-glow)]
          active:bg-[var(--color-primary-dark)]
        `,
        secondary: `
          bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)]
          hover:bg-[var(--color-primary-alpha)]
          active:bg-[var(--color-primary-muted)]
        `,
        ghost: `
          bg-transparent text-[var(--color-text-primary)]
          hover:bg-[var(--color-bg-subtle)]
          active:bg-[var(--color-bg-elevated)]
        `,
        accent: `
          bg-[var(--color-accent)] text-[var(--color-text-inverse)]
          hover:bg-[var(--color-accent-glow)] hover:shadow-[var(--shadow-cyan)]
          active:bg-[var(--color-accent-glow)]
        `,
      },
      size: {
        sm: "h-9 px-4 rounded-[var(--radius-md)] text-xs",
        md: "h-11 px-6 rounded-[var(--radius-md)] text-sm",
        lg: "h-14 px-8 rounded-[var(--radius-lg)] text-base",
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
  magnetic?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      magnetic = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = buttonVariants({ variant, size, className });

    const content = (
      <>
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </>
    );

    const buttonElement = asChild ? (
      <Link
        href={href || "#"}
        className={baseClasses}
      >
        {content}
      </Link>
    ) : (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );

    if (magnetic && !asChild) {
      return (
        <MagneticElement strength={0.2}>
          {buttonElement}
        </MagneticElement>
      );
    }

    return buttonElement;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
