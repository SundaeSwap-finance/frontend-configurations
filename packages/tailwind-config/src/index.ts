import defaultTheme from "tailwindcss/defaultTheme";
import type { TailwindPlugin } from "tailwindcss/plugin";
import tailwindConfig from "tailwindcss/tailwind-config";

const theme: Omit<tailwindConfig.TailwindTheme, "keyframes"> & {
  // For our specific keyframes, we have to overwrite the _keyframes_ property.
  // TailwindThemeAnimations officially only allows _opacity_ and _transform_ as keyframe values.
  keyframes?: {
    [key: string]: {
      [key: string]: {
        [key: string]: string | number;
      };
    };
  };
  configViewer?: {
    fonts?: string;
  };
} = {
  ...defaultTheme,
  keyframes: {
    ...defaultTheme.keyframes,
    // Tooltip
    "slide-up-fade": {
      "0%": { opacity: "0", transform: "translateY(2px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    "slide-right-fade": {
      "0%": { opacity: "0", transform: "translateX(-2px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    "slide-down-fade": {
      "0%": { opacity: "0", transform: "translateY(-2px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    "slide-left-fade": {
      "0%": { opacity: "0", transform: "translateX(2px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    "slide-down": {
      "0%": { opacity: "0", transform: "translateY(-10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    "slide-up": {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    "slide-left": {
      "0%": { opacity: "0", transform: "translateX(10px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    "slide-right": {
      "0%": { opacity: "0", transform: "translateX(-10px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    // Dialog
    "dialog-overlay-show": {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    "dialog-content-show": {
      "0%": { opacity: "0", transform: "translate(50%, 48%) scale(.96)" },
      "100%": { opacity: "1", transform: "translate(50%, 50%) scale(1)" },
    },
    // Collapsible
    "collapsible-open": {
      "0%": { height: 0 },
      "100%": { height: "auto" },
    },
    "collapsible-close": {
      "0%": { height: "var(--radix-collapsible-content-height)" },
      "100%": { height: 0 },
    },
    // Loader
    "dot-flashing": {
      "0%": { backgroundColor: "rgb(96 165 250)" },
      "50%, 100%": { backgroundColor: "rgb(243 244 246)" },
    },
    "dot-flashing-dark": {
      "0%": { backgroundColor: "rgb(96 165 250)" },
      "50%, 100%": { backgroundColor: "#202231" },
    },
    // Input
    "shadow-pulse": {
      "0%": {
        boxShadow: "0 0 0 0 rgba(96, 165, 250, 0.4)",
      },
      "70%": {
        boxShadow: "0 0 0 20px rgba(252, 165, 165, 0)",
      },
      "100%": {
        boxShadow: "0 0 0 0 rgba(252, 165, 165, 0)",
      },
    },
    // Shake
    shake: {
      "10%, 90%": {
        transform: "translate3d(-1px, 0, 0)",
      },

      "20%, 80%": {
        transform: "translate3d(2px, 0, 0)",
      },

      "30%, 50%, 70%": {
        transform: "translate3d(-4px, 0, 0)",
      },

      "40%, 60%": {
        transform: "translate3d(4px, 0, 0)",
      },
    },
    // Navigation Menu
    enterFromRight: {
      from: {
        transform: "translateX(200px)",
        opacity: 0,
      },
      to: {
        transform: "translateX(0)",
        opacity: 1,
      },
    },
    enterFromLeft: {
      from: {
        transform: "translateX(-200px)",
        opacity: 0,
      },
      to: {
        transform: "translateX(0)",
        opacity: 1,
      },
    },
    exitToRight: {
      from: {
        transform: "translateX(0)",
        opacity: 1,
      },
      to: {
        transform: "translateX(200px)",
        opacity: 0,
      },
    },
    exitToLeft: {
      from: {
        transform: "translateX(0)",
        opacity: 1,
      },
      to: {
        transform: "translateX(-200px)",
        opacity: 0,
      },
    },
    scaleIn: {
      from: {
        transform: "rotateX(-30deg) scale(0.9)",
        opacity: 0,
      },
      to: {
        transform: "rotateX(0deg) scale(1)",
        opacity: 1,
      },
    },
    scaleOut: {
      from: {
        transform: "rotateX(0deg) scale(1)",
        opacity: 1,
      },
      to: {
        transform: "rotateX(-10deg) scale(0.95)",
        opacity: 0,
      },
    },
    fadeIn: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    fadeOut: {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
    openOffCanvas: {
      from: {
        transform: "translateX(100%)",
        opacity: 0,
      },
      to: {
        transform: "translateX(-2rem)",
        opacity: 1,
      },
    },
    closeOffCanvas: {
      from: {
        transform: "translateX(-2rem)",
        opacity: 1,
      },
      to: {
        transform: "translateX(100%)",
        opacity: 0,
      },
    },
  },
  animation: {
    ...defaultTheme.animation,
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
  colors: {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    white: "#FFFFFF",
    black: "#000000",
    gray: {
      DEFAULT: "#F0F6FA",
      200: "#E6ECF0",
      300: "#DCE2E6",
      400: "#CAD5DB",
      500: "#C0CBD1",
      600: "#202231",
      700: "#1F1928",
      800: "#110B1B",
      900: "#0D0415",
      1000: "#202231",
    },
    green: {
      DEFAULT: "#00D018",
      200: "#00B815",
      300: "#00DE1A",
    },
    red: {
      DEFAULT: "#EF2C2C",
      200: "#D62727",
      300: "#FC2D2D",
    },
    amber: {
      DEFAULT: "#FFD740",
      200: "#FFC400",
      300: "#FF8F00",
    },
    blue: {
      DEFAULT: "#0A93EC",
      200: "#0882D4",
      300: "#0A9AFA",
    },
    purple: {
      DEFAULT: "#AA00DE",
      200: "#9700C4",
      300: "#B400EB",
    },
  },
  fontSize: {
    ...defaultTheme.fontSize,
    xxs: ["0.625rem", { lineHeight: "0.75rem" }], // 10px/12px
  },
  fontFamily: {
    ...defaultTheme.fontFamily,
    sans: [
      '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    ],
  },
  configViewer: {
    fonts:
      "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap",
  },
};

const plugins: TailwindPlugin[] = [
  require("tailwindcss-radix")(),
  require("tailwindcss-animation-delay"),
];

module.exports = { plugins, theme };
