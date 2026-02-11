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
 * For programmatic access to values:
 * ```ts
 * import { colors, fontFamily, keyFrames } from "@sundaeswap/tailwind-config";
 * ```
 */

export * from "./colors.js";
export * from "./fontFamily.js";
export * from "./keyFrames.js";

import { colors } from "./colors.js";
import { fontFamily } from "./fontFamily.js";
import { keyFrames } from "./keyFrames.js";

/**
 * Animation definitions for programmatic use.
 * In Tailwind v4, these are defined in theme.css via @theme.
 */
export const animations = {
  "marquee-left": "marquee-left var(--duration, 40s) linear infinite",
  "marquee-up": "marquee-up var(--duration, 40s) linear infinite",
  "bell-shake": "bell-shake 1s cubic-bezier(.36,.07,.19,.97) both",
  "toast-progress-bar": "toast-progress-bar 6s linear forwards",
  "toast-swipe-out": "toast-swipe-out 100ms ease-out forwards",
  "toast-slide-in-from-bottom":
    "toast-slide-in-from-bottom 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "toast-slide-down-to-bottom":
    "toast-slide-down-to-bottom 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "toast-slide-in-from-right":
    "toast-slide-in-from-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "toast-slide-out-to-right":
    "toast-slide-out-to-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-right-fade": "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-left": "slide-left 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-right": "slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "dialog-overlay-show":
    "dialog-overlay-show 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  "dialog-content-show":
    "dialog-content-show 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  "collapsible-open": "collapsible-open 0.3s ease-out forwards",
  "collapsible-close": "collapsible-close 0.3s ease-out forwards",
  "dot-flashing": "dot-flashing 1s infinite alternate",
  "dot-flashing-dark": "dot-flashing-dark 1s infinite alternate",
  "shadow-pulse": "shadow-pulse 0.3s forwards",
  shake: "shake 1s cubic-bezier(.36,.07,.19,.97) both",
  "spin-slow": "spin 5s linear infinite",
  enterFromRight: "enterFromRight 250ms ease",
  enterFromLeft: "enterFromLeft 250ms ease",
  exitToRight: "exitToRight 250ms ease",
  exitToLeft: "exitToLeft 250ms ease",
  scaleIn: "scaleIn 200ms ease",
  scaleOut: "scaleOut 200ms ease",
  fadeIn: "fadeIn 200ms ease",
  fadeOut: "fadeOut 200ms ease",
  openOffCanvas: "openOffCanvas 250ms ease forwards",
  closeOffCanvas: "closeOffCanvas 250ms ease forwards",
  openAccordion: "openAccordion 250ms cubic-bezier(0.87, 0, 0.13, 1)",
  closeAccordion: "closeAccordion 250ms cubic-bezier(0.87, 0, 0.13, 1)",
};

/**
 * Breakpoint definitions for programmatic use.
 */
export const screens = {
  xxs: "240px",
  xs: "360px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  xxl: "1920px",
};

/**
 * Spacing definitions for programmatic use.
 */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
};

/**
 * @deprecated The `theme` export is deprecated in v4. Import theme.css instead.
 * For programmatic access, use the individual exports (colors, fontFamily, etc.)
 */
export const theme = {
  colors,
  fontFamily,
  keyframes: keyFrames,
  animations,
  screens,
  spacing,
};

export default theme;
