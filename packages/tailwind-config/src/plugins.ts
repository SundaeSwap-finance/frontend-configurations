import animationDelay from "tailwindcss-animation-delay";
import tailwindRadix from "tailwindcss-radix";
import type { PluginsConfig } from "tailwindcss/types/config";

export const plugins: PluginsConfig = [
  tailwindRadix({
    variantPrefix: "radix",
  }),
  animationDelay,
];
