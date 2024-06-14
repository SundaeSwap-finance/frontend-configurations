import defaultTheme from "tailwindcss/defaultTheme.js";
import type { ThemeConfig } from "tailwindcss/types/config.js";

import { colors } from "./colors.js";
import { fontFamily } from "./fontFamily.js";
import { keyFrames } from "./keyFrames.js";

export * from "./colors.js";
export * from "./fontFamily.js";
export * from "./keyFrames.js";
export * from "./plugins.js";

interface ISundaeSwapTheme extends Omit<ThemeConfig, "colors"> {
  colors: typeof colors;
}

export const theme: Partial<ISundaeSwapTheme> & {
  // For our specific keyframes, we have to overwrite the _keyframes_ property.
  // TailwindThemeAnimations officially only allows _opacity_ and _transform_ as keyframe values.
  // keyframes?: {
  //   [key: string]: {
  //     [key: string]: {
  //       [key: string]: string | number;
  //     };
  //   };
  // };
  configViewer?: {
    fonts?: string;
  };
} = {
  ...defaultTheme,
  keyframes: {
    ...defaultTheme.keyframes,
    ...keyFrames,
  },
  animation: {
    ...defaultTheme.animation,
    // bell shake
    "bell-shake": "bell-shake 1s cubic-bezier(.36,.07,.19,.97) both",
    // Toast progress bar
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
    // Tooltip
    "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    "slide-right-fade": "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    // Popover
    "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    "slide-left": "slide-left 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    "slide-right": "slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    // Dialog
    "dialog-overlay-show":
      "dialog-overlay-show 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    "dialog-content-show":
      "dialog-content-show 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    // Collapsible
    "collapsible-open": "collapsible-open 0.3s ease-out forwards",
    "collapsible-close": "collapsible-close 0.3s ease-out forwards",
    // Loader
    "dot-flashing": "dot-flashing 1s infinite alternate",
    "dot-flashing-dark": "dot-flashing-dark 1s infinite alternate",
    // Input
    "shadow-pulse": "shadow-pulse 0.3s forwards",
    // Shake
    shake: "shake 1s cubic-bezier(.36,.07,.19,.97) both",
    // Spin (slow)
    "spin-slow": "spin 5s linear infinite",
    // Navigation Menu
    enterFromRight: "enterFromRight 250ms ease",
    enterFromLeft: "enterFromLeft 250ms ease",
    exitToRight: "exitToRight 250ms ease",
    exitToLeft: "exitToLeft 250ms ease",
    scaleIn: "scaleIn 200ms ease",
    scaleOut: "scaleOut 200ms ease",
    fadeIn: "fadeIn 200ms ease",
    fadeOut: "fadeOut 200ms ease",
    // Offcanvas
    openOffCanvas: "openOffCanvas 250ms ease forwards",
    closeOffCanvas: "closeOffCanvas 250ms ease forwards",
    // Accordion
    openAccordion: "openAccordion 250ms cubic-bezier(0.87, 0, 0.13, 1)",
    closeAccordion: "closeAccordion 250ms cubic-bezier(0.87, 0, 0.13, 1)",
  },
  screens: {
    xxs: "240px",
    xs: "360px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
    xxl: "1920px",
  },
  colors,
  fontSize: {
    ...defaultTheme.fontSize,
    xxs: ["0.625rem", { lineHeight: "0.75rem" }], // 10px/12px
  },
  fontFamily: {
    ...defaultTheme.fontFamily,
    ...fontFamily,
  },
  configViewer: {
    fonts:
      "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap",
  },
};
