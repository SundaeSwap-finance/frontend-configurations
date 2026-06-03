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

- **Colors**: `primary` (deep purple), `secondary` (cyan), `success`, `error`, `warning`, `highlight`, `silent`, `neutral`, plus the true-color ramps (`purple`, `pink`, `violet`, `indigo`, `cyan`, `gold`, `mint`, `coral`, `ink`, `slate`)
- **Typography**: `font-sans` (Geist, falls back to DM Sans), `font-mono` (DM Mono), `text-xxs`
- **Breakpoints**: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl` (utilities `p-xs` … `p-xl`)
- **Animations**: Toast, dialog, collapsible, accordion, the iris gradient, and more

Breakpoints, spacing, and animations are defined in the CSS layer (`theme.css`)
and consumed as Tailwind utilities — they are not re-exported as JS.

### Programmatic Access

For programmatic access to theme values, only `colors` and `fontFamily` are
exported:

```ts
import { colors, fontFamily } from "@sundaeswap/tailwind-config";

// Access color values
console.log(colors.primary.DEFAULT); // "#451a8b" (deep purple)
console.log(colors.secondary[400]); // "#5ed6ff" (cyan)
```

## Migration from v4 → v5

### Breaking Changes

1. **Brand re-anchored — primary pink → deep purple; secondary violet → cyan**: `primary` now resolves to the new `purple` ramp (`#451a8b`, the `purple-700` stop) and `secondary` resolves to `cyan` (`#5ed6ff`). The `purple` ramp anchors the warm pole of the V4 iris gradient (`bg-iris` / `bg-iris-animated`), which morphs purple → cyan → mint. The legacy `pink` ramp is retained as a standalone accent but no longer leads.
2. **New default sans font**: `font-sans` now leads with Geist (falling back to DM Sans), replacing DM Sans as the primary typeface.
3. **JS exports trimmed to `colors` + `fontFamily`**: the `animations`, `screens`, and `spacing` JS exports were removed. Keyframes, breakpoints, and spacing now live only in the CSS layer (`theme.css`) and are consumed as Tailwind utilities.
4. **OKLCH semantic-token layer**: Components should reference the new mode-aware semantic tokens instead of raw color ramps. These include:
   - `action-*` — `action-{primary,secondary,success,error,warning,info,silent,highlight}` with `-hover`, `-active`, `-disabled`, `-muted` variants
   - `surface-*` — `surface-{page,card,inset,input,hover}`
   - `text-*` — `text-{heading,body,muted,faint,on-accent,link,link-hover}`
   - `border-*` — `border-{subtle,default,strong,hover,control}`

   Raw ramp utilities (e.g. `pink-500`, `slate-700`) still resolve via aliases but bypass light/dark mode-switching — prefer the semantic tokens.

## Color Palette

| Color       | Default   | Range     |
| ----------- | --------- | --------- |
| `primary`   | `#451a8b` | 50-950    |
| `secondary` | `#5ed6ff` | 50-950    |
| `success`   | `#36ca95` | 50-950    |
| `error`     | `#ed3d57` | 50-950    |
| `warning`   | `#f9bb5c` | 50-950    |
| `highlight` | `#f9bb5c` | 50-950    |
| `silent`    | `#575263` | 50-1000   |
| `neutral`   | `#f4f3f7` | 50-1500   |
| `pink`      | `#f7538e` | 50-950    |

`primary` aliases the `purple` ramp and `secondary` aliases the `cyan` ramp.
`pink` is retained as a standalone legacy accent.

## License

MIT
