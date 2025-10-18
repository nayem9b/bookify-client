// src/lib/utils.js

/**
 * cn - ClassNames utility
 * Accepts any number of class strings and filters out falsy values
 * Returns a single string suitable for React className
 *
 * Example:
 *   cn("bg-red-500", isActive && "text-white")
 *   => "bg-red-500 text-white" if isActive is true
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
