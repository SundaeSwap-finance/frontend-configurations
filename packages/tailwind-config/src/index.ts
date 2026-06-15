/**
 * SundaeSwap Tailwind CSS v4 Configuration
 *
 * This package provides theme values for Tailwind CSS v4.
 *
 * ## Usage
 *
 * In your CSS file:
 * ```css
 * @import "tailwindcss";
 * @import "@sundaeswap/tailwind-config/theme.css";
 * ```
 *
 * For programmatic access to color values:
 * ```ts
 * import { colors, fontFamily } from "@sundaeswap/tailwind-config";
 * ```
 *
 * Keyframes, breakpoints, and spacing live in the CSS layer (`theme.css` /
 * `tailwind.theme.css`) — the single source of truth. They are intentionally
 * not re-exported as JS to avoid a parallel definition that can drift.
 */

export * from "./colors.js";
export * from "./fontFamily.js";
