import React, { forwardRef } from "react";

// Simple class merging utility
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Button style variants (replicates cva functionality manually)
const buttonVariants = (variant = "default", size = "default", extra = "") => {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
    "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return cn(base, variants[variant], sizes[size], extra);
};

// JSX-compatible Button component
const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button"; // replaced Slot with span for JSX simplicity
  return <Comp ref={ref} className={buttonVariants(variant, size, className)} {...props} />;
});

Button.displayName = "Button";

export { Button, buttonVariants };
