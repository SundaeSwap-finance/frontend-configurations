import defaultTheme from "tailwindcss/defaultTheme";
import tailwindConfig from "tailwindcss/tailwind-config";

const theme: tailwindConfig.TailwindTheme = {
  ...defaultTheme,
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
    white: {
      DEFAULT: "#FFFFFF",
      200: "#F5F5F5",
      300: "#DBDBDB",
      400: "#B5B5B5",
      500: "#757575",
    },
    black: {
      DEFAULT: "#000000",
      200: "#0D0415",
      300: "#110B1B",
      400: "#1F1928",
      500: "#202231",
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
  // @ts-ignore
  configViewer: {
    fonts:
      "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap",
  },
};

module.exports = { theme };
