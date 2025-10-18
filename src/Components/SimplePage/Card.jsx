import * as React from "react";
import { cn } from "./utils";

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-2xl border border-gray-100 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-5 border-b border-gray-100", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-lg font-semibold text-gray-800", className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-5", className)} {...props} />
);
