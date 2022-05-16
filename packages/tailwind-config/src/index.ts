import * as defaultTheme from "tailwindcss/defaultTheme";
import * as tailwindConfig from "tailwindcss/tailwind-config";

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
      100: "#FFFFFF",
      200: "#F5F5F5",
    },
    black: {
      100: "#0D0415",
      200: "#13111c",
      300: "#110B1B",
      400: "#1F1928",
      500: "#202231",
    },
    green: {
      100: "#00B815",
      200: "#00D018",
      300: "#00DE1A",
    },
    red: {
      100: "#D62727",
      200: "#EF2C2C",
      300: "#FC2D2D",
    },
    blue: {
      100: "#0882D4",
      200: "#0A93EC",
      300: "#0A9AFA",
    },
    purple: {
      100: "#9700C4",
      200: "#AA00DE",
      300: "#B400EB",
    },
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
