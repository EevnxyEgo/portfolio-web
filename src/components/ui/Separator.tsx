import * as React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          aria-label={label}
          className={cn(
            "flex items-center",
            isVertical ? "flex-col h-full" : "flex-row w-full",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex-1 bg-[var(--color-border)]",
              isVertical ? "w-[1px] h-full" : "h-[1px] w-full"
            )}
          />
          <span
            className={cn(
              "px-3 py-1 text-xs font-mono text-[var(--color-text-tertiary)]",
              isVertical && "writing-mode-vertical"
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              "flex-1 bg-[var(--color-border)]",
              isVertical ? "w-[1px] h-full" : "h-[1px] w-full"
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "bg-[var(--color-border)]",
          isVertical ? "w-[1px] h-full" : "h-[1px] w-full",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
