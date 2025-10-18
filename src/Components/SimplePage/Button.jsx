import * as React from "react";
import { cn } from "./utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      default:
        "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
