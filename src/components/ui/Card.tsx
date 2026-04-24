import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const cardVariants = cva(
  `
    relative overflow-hidden
    bg-[var(--gradient-card)] rounded-[var(--radius-lg)]
    border border-[var(--color-border)]
    transition-all duration-200 ease-out
  `,
  {
    variants: {
      variant: {
        default: `
          hover:border-[var(--color-border-bright)]
          hover:shadow-[var(--shadow-md)]
        `,
        featured: `
          border-[var(--color-border-primary)]
          hover:border-[var(--color-primary)]
          hover:shadow-[var(--shadow-glow-sm)]
        `,
        glass: `
          bg-[var(--color-bg-overlay)] backdrop-blur-xl
          border border-[var(--color-border-bright)]
          hover:bg-[var(--color-bg-overlay)]/90
        `,
        interactive: `
          cursor-pointer
          hover:border-[var(--color-border-bright)]
          hover:shadow-[var(--shadow-md)]
          hover:-translate-y-1
        `,
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "article" | "section";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "font-heading font-semibold text-[var(--color-text-primary)] leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--color-text-secondary)]", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "featured" | "glass" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  index?: number;
  delay?: number;
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, variant, padding, index = 0, delay = 0, children }, ref) => {
    const prefersReduced = useReducedMotion();

    if (prefersReduced) {
      return (
        <Card
          ref={ref}
          className={className}
          variant={variant}
          padding={padding}
        >
          {children}
        </Card>
      );
    }

    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.5,
          delay: delay + index * 0.08,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(cardVariants({ variant, padding, className }))}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedCard.displayName = "AnimatedCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  AnimatedCard,
  cardVariants,
};
