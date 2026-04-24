import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: ReactNode;
  tooltipContent: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      tooltipContent,
      side = "top",
      align = "center",
      delayDuration = 300,
      children,
    },
    ref
  ) => {
    const sideClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const alignClasses = {
      start: "-translate-x-0",
      center: "-translate-x-1/2",
      end: "-translate-x-full",
    };

    return (
      <div ref={ref} className="relative group inline-block">
        {children}
        <div
          className={cn(
            `
            absolute z-[var(--z-dropdown)] px-3 py-1.5
            bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
            rounded-[var(--radius-md)]
            text-xs text-[var(--color-text-primary)] font-mono
            whitespace-nowrap
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-all ease-out
            pointer-events-none
            `,
            sideClasses[side],
            align !== "center" && alignClasses[align],
            className
          )}
          style={{ transitionDelay: `${delayDuration}ms` }}
          role="tooltip"
        >
          {tooltipContent}
          <div
            className={cn(
              `
              absolute w-2 h-2 bg-[var(--color-bg-elevated)] border-[var(--color-border)]
              rotate-45
              `,
              side === "top" && "top-full left-1/2 -translate-x-1/2 border-b border-r",
              side === "bottom" && "bottom-full left-1/2 -translate-x-1/2 border-t border-l",
              side === "left" && "left-full top-1/2 -translate-y-1/2 border-t border-r",
              side === "right" && "right-full top-1/2 -translate-y-1/2 border-b border-l"
            )}
          />
        </div>
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export { Tooltip };
