import type { PluginsConfig } from "tailwindcss/types/config";
import tailwindRadix from "tailwindcss-radix";
import animationDelay from "tailwindcss-animation-delay";

export const plugins: PluginsConfig = [tailwindRadix({}), animationDelay];
