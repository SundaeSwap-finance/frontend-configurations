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

- **Colors**: `primary` (deep purple), `secondary` (cyan), `success`, `error`, `warning`, `highlight`, `silent`, `neutral`, plus the true-color ramps (`purple`, `pink`, `magenta`, `violet`, `indigo`, `cyan`, `aqua`, `citron`, `gold`, `mint`, `coral`, `ink`, `slate`)
- **Data-viz**: nine mode-aware series (`bg-chart-1` … `bg-chart-9`) — a pastel chord on the dark page, normalized to one weight on paper in light. `colors.chart` mirrors the dark chord for JS chart libs.
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
console.log(colors.primary.DEFAULT); // "#401993" (deep purple)
console.log(colors.secondary[400]); // "#69cffd" (cyan)
console.log(colors.chart[0]); // "#ac99fe" (lavender — series 1)
```

## Migration from v4 → v5

### Breaking Changes

1. **Brand re-anchored — primary pink → deep purple; secondary violet → cyan**: `primary` now resolves to the new `purple` ramp (`#401993`, the `purple-700` stop) and `secondary` resolves to `cyan` (`#69cffd`). The `purple` ramp anchors the warm pole of the V4 iris gradient (`bg-iris` / `bg-iris-animated`), which morphs purple → cyan → mint. The legacy `pink` ramp is retained as a standalone accent but no longer leads.
2. **New default sans font**: `font-sans` now leads with Geist (falling back to DM Sans), replacing DM Sans as the primary typeface.
3. **JS exports trimmed to `colors` + `fontFamily`**: the `animations`, `screens`, and `spacing` JS exports were removed. Keyframes, breakpoints, and spacing now live only in the CSS layer (`theme.css`) and are consumed as Tailwind utilities.
4. **OKLCH semantic-token layer**: Components should reference the new mode-aware semantic tokens instead of raw color ramps. These include:
   - `action-*` — `action-{primary,secondary,success,error,warning,info,silent,highlight}` with `-hover`, `-active`, `-disabled`, `-muted` variants
   - `surface-*` — `surface-{page,card,inset,input,hover}`
   - `text-*` — `text-{heading,body,muted,faint,on-accent,link,link-hover}`
   - `border-*` — `border-{subtle,default,strong,hover,control}`

   Raw ramp utilities (e.g. `pink-500`, `slate-700`) still resolve via aliases but bypass light/dark mode-switching — prefer the semantic tokens.

### Palette retune — "Sundae Cosmic"

Every ramp was re-hued onto a cosmic-night spine and pushed past the reference
saturation; ramp NAMES and stop numbers are unchanged, so no callsite moves.

- **Neutral spine** `ink` / `slate` moved from hue 300 (magenta-violet) to 286 / 288 (blue-violet) at roughly double the chroma. The dark page floor is `oklch(15.5% 0.044 286)`; the light page floor is `ink-50`, a lavender paper rather than white.
- **Accents** re-anchored: `violet` (291) is the lit periwinkle-lavender accent, `purple` (288) the deep brand fill, `indigo` pulled to 272, `mint` to 147, `coral` to 17.
- **New ramps** `aqua` (172) and `citron` (112) fill the two holes in the hue wheel; they exist for the nine-series data-viz chord.
- **Light mode** is a full peer of dark: its own surfaces, borders, text tiers, action stops, and a normalized chart chord (`oklch(from <hue>-500 60% min(c, 0.15) h)`).

`bun run check:tokens` gates the palette: every stop must be in sRGB gamut, the
`colors.ts` hexes must match the CSS OKLCH to within 1 LSB, and the WCAG pairs
resolved from `theme.css` must clear their floors.

## Color Palette

| Color       | Default   | Range   |
| ----------- | --------- | ------- |
| `primary`   | `#401993` | 50-950  |
| `secondary` | `#69cffd` | 50-950  |
| `success`   | `#4fc765` | 50-950  |
| `error`     | `#f23156` | 50-950  |
| `warning`   | `#fcb956` | 50-950  |
| `highlight` | `#fcb956` | 50-950  |
| `silent`    | `#54526d` | 50-1000 |
| `neutral`   | `#f1f1fc` | 50-1500 |
| `pink`      | `#f7538e` | 50-950  |

`primary` aliases the `purple` ramp and `secondary` aliases the `cyan` ramp.
`pink` is retained as a standalone legacy accent.

## License

MIT
