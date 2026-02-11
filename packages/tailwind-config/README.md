# `@sundaeswap/tailwind-config`

SundaeSwap's shared Tailwind CSS v4 theme configuration with colors, animations, and utilities.

## Installation

```bash
bun add tailwindcss @sundaeswap/tailwind-config
```

## Usage (Tailwind CSS v4)

In your main CSS file:

```css
@import "tailwindcss";
@import "@sundaeswap/tailwind-config/theme.css";

/* If using @sundaeswap/ui-toolkit, add source scanning */
@source "../node_modules/@sundaeswap/ui-toolkit/src/**/*";

/* Optional: Set up dark mode variant */
@custom-variant dark (&:is(.dark *));
```

That's it! The theme provides:

- **Colors**: `primary`, `secondary`, `success`, `error`, `warning`, `highlight`, `silent`, `neutral`, `gray`
- **Typography**: `font-sans` (DM Sans), `font-mono` (DM Mono), `text-xxs`
- **Breakpoints**: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl`
- **Animations**: Toast, dialog, collapsible, accordion, and more

### Programmatic Access

For programmatic access to theme values:

```ts
import { colors, fontFamily, keyFrames, animations, screens, spacing } from "@sundaeswap/tailwind-config";

// Access color values
console.log(colors.primary.DEFAULT); // "#4092E5"
console.log(colors.secondary[400]); // "#DC53DE"
```

## Migration from v3

### Breaking Changes

1. **CSS-first configuration**: Tailwind v4 uses CSS `@theme` instead of JS config
2. **Removed plugins**: `tailwindcss-radix` and `tailwindcss-animation-delay` are no longer included
3. **No `plugins` export**: Use native CSS or Tailwind v4's plugin system

### Before (v3)

```js
// tailwind.config.js
const { plugins, theme } = require("@sundaeswap/tailwind-config");

module.exports = {
  content: ["./src/**/*.tsx", "./node_modules/@sundaeswap/ui-toolkit/**/*"],
  theme: { ...theme },
  plugins: [...plugins],
};
```

### After (v4)

```css
/* src/index.css */
@import "tailwindcss";
@import "@sundaeswap/tailwind-config/theme.css";

@source "../node_modules/@sundaeswap/ui-toolkit/src/**/*";
```

No `tailwind.config.js` needed for basic usage!

## Color Palette

| Color       | Default   | Range     |
| ----------- | --------- | --------- |
| `primary`   | `#4092E5` | 50-900    |
| `secondary` | `#D328D6` | 50-900    |
| `success`   | `#58C7BA` | 50-900    |
| `error`     | `#DE5555` | 50-900    |
| `warning`   | `#F19436` | 50-900    |
| `highlight` | `#F9E79F` | 50-900    |
| `silent`    | `#65597C` | 50-1000   |
| `neutral`   | `#FFFFFF` | 50-1500   |
| `gray`      | `#F0F6FA` | 200-1000  |

## License

MIT
