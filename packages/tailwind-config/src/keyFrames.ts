export const keyFrames = {
  "marquee-left": {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(calc(-100% - var(--gap)))" },
  },
  "marquee-up": {
    from: { transform: "translateY(0)" },
    to: { transform: "translateY(calc(-100% - var(--gap)))" },
  },
  "toast-progress-bar": {
    "0%": { left: "0" },
    "100%": { left: "-100%" },
  },
  "toast-swipe-out": {
    "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
    "100%": {
      transform: `translateX(calc(100% + 1rem))`,
    },
  },
  "toast-slide-in-from-bottom": {
    "0%": { opacity: "0", transform: "translateY(10px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  "toast-slide-down-to-bottom": {
    "0%": { opacity: "1", transform: "translateY(0)" },
    "100%": { opacity: "0", transform: "translateY(10px)" },
  },
  "toast-slide-in-from-right": {
    "0%": { opacity: "0", transform: "translateX(10px)" },
    "100%": { opacity: "1", transform: "translateX(0)" },
  },
  "toast-slide-out-to-right": {
    "0%": { opacity: "1", transform: "translateX(0)" },
    "100%": { opacity: "0", transform: "translateX(10px)" },
  },
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
    "0%": { height: "0" },
    "100%": { height: "var(--radix-collapsible-content-height)" },
  },
  "collapsible-close": {
    "0%": { height: "var(--radix-collapsible-content-height)" },
    "100%": { height: "0" },
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
      opacity: "0",
    },
    to: {
      transform: "translateX(0)",
      opacity: "1",
    },
  },
  enterFromLeft: {
    from: {
      transform: "translateX(-200px)",
      opacity: "0",
    },
    to: {
      transform: "translateX(0)",
      opacity: "1",
    },
  },
  exitToRight: {
    from: {
      transform: "translateX(0)",
      opacity: "1",
    },
    to: {
      transform: "translateX(200px)",
      opacity: "0",
    },
  },
  exitToLeft: {
    from: {
      transform: "translateX(0)",
      opacity: "1",
    },
    to: {
      transform: "translateX(-200px)",
      opacity: "0",
    },
  },
  scaleIn: {
    from: {
      transform: "rotateX(-30deg) scale(0.9)",
      opacity: "0",
    },
    to: {
      transform: "rotateX(0deg) scale(1)",
      opacity: "1",
    },
  },
  scaleOut: {
    from: {
      transform: "rotateX(0deg) scale(1)",
      opacity: "1",
    },
    to: {
      transform: "rotateX(-10deg) scale(0.95)",
      opacity: "0",
    },
  },
  fadeIn: {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
  fadeOut: {
    from: {
      opacity: "1",
    },
    to: {
      opacity: "0",
    },
  },
  openOffCanvas: {
    from: {
      transform: "translateX(100%)",
      opacity: "0",
    },
    to: {
      transform: "translateX(-1.5rem)",
      opacity: "1",
    },
  },
  closeOffCanvas: {
    from: {
      transform: "translateX(-1.5rem)",
      opacity: "1",
    },
    to: {
      transform: "translateX(100%)",
      opacity: "0",
    },
  },
  openAccordion: {
    from: {
      height: "0",
    },
    to: {
      height: "var(--radix-accordion-content-height)",
    },
  },
  closeAccordion: {
    from: {
      height: "var(--radix-accordion-content-height)",
    },
    to: {
      height: "0",
    },
  },
  "bell-shake": {
    "0%": { transform: "rotate(0)" },
    "15%": { transform: "rotate(5deg)" },
    "30%": { transform: "rotate(-5deg)" },
    "45%": { transform: "rotate(3deg)" },
    "60%": { transform: "rotate(-3deg)" },
    "75%": { transform: "rotate(2deg)" },
    "85%": { transform: "rotate(-2deg)" },
    "92%": { transform: "rotate(1deg)" },
    "100%": { transform: "rotate(0)" },
  },
};
