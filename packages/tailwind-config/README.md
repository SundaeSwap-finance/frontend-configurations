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

- **Colors**: `primary` (plum), `secondary` (cyan), `success`, `error`, `warning`, `highlight`, `silent`, `neutral`, plus the true-color ramps (`purple`, `ground`, `pink`, `magenta`, `violet`, `indigo`, `cyan`, `aqua`, `citron`, `gold`, `mint`, `coral`, `ink`, `slate`) and the six `opal` stops (`opal-{pink,lilac,azure,cyan,pearl,peach}`)
- **Opal finish** (the website's iridescent holo palette): `bg-opal` (static pearl fill), `bg-opal-animated` (drifting CTA fill), `bg-opal-pearl-animated` (muted pearl tier), `opal-pearl-glow`, `opal-pearl-ring`, and `text-opal` (the chord clipped to glyphs)
- **Gloss primary**: `gloss-primary` paints the website's glossy primary pill — the ground-pink gloss on the dark plum page, the plum gloss on the light ground page — with `text-text-on-primary` as its label color
- **Data-viz**: nine mode-aware series (`bg-chart-1` … `bg-chart-9`) — a pastel chord on the dark page, normalized to one weight on paper in light. `colors.chart` mirrors the dark chord for JS chart libs.
- **Typography**: `font-sans` (Geist, falls back to DM Sans), `font-mono` (DM Mono), `text-xxs`
- **Breakpoints**: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl` (utilities `p-xs` … `p-xl`)
- **Animations**: Toast, dialog, collapsible, accordion, the opal drift, and more

Breakpoints, spacing, and animations are defined in the CSS layer (`theme.css`)
and consumed as Tailwind utilities — they are not re-exported as JS.

### Programmatic Access

For programmatic access to theme values, only `colors` and `fontFamily` are
exported:

```ts
import { colors, fontFamily } from "@sundaeswap/tailwind-config";

// Access color values
console.log(colors.primary.DEFAULT); // "#523a7d" (plum — purple-700)
console.log(colors.ground[200]); // "#fceaff" (the ground)
console.log(colors.opal.lilac); // "#cdb8fa"
console.log(colors.secondary[400]); // "#69cffd" (cyan)
console.log(colors.chart[0]); // "#ac99fe" (lavender — series 1)
```

## Migration from v4 → v5

### Breaking Changes

1. **Brand re-anchored — primary pink → purple; secondary violet → cyan**: `primary` resolves to the `purple` ramp and `secondary` resolves to `cyan` (`#69cffd`). The legacy `pink` ramp is retained as a standalone accent but no longer leads.
2. **New default sans font**: `font-sans` now leads with Geist (falling back to DM Sans), replacing DM Sans as the primary typeface.
3. **JS exports trimmed to `colors` + `fontFamily`**: the `animations`, `screens`, and `spacing` JS exports were removed. Keyframes, breakpoints, and spacing now live only in the CSS layer (`theme.css`) and are consumed as Tailwind utilities.
4. **OKLCH semantic-token layer**: Components should reference the new mode-aware semantic tokens instead of raw color ramps. These include:
   - `action-*` — `action-{primary,secondary,success,error,warning,info,silent,highlight}` with `-hover`, `-active`, `-disabled`, `-muted` variants
   - `surface-*` — `surface-{page,card,inset,input,hover}`
   - `text-*` — `text-{heading,body,muted,faint,on-accent,on-primary,link,link-hover}`
   - `border-*` — `border-{subtle,default,strong,hover,control}`

   Raw ramp utilities (e.g. `pink-500`, `slate-700`) still resolve via aliases but bypass light/dark mode-switching — prefer the semantic tokens.

### Palette — "Sundae Plum"

The product wears the marketing site's plum system; ramp NAMES and stop
numbers of the existing ramps are unchanged, so no callsite moves.

- **Neutral spine** `ink` / `slate` sit at hue 300, the website `plum` scale's hue. The dark page floor is `purple-950` (`#110a1f`, website plum-950); overlays are `purple-900` (`#261d38`).
- **`purple`** is a muted plum ramp (hue ~300, peak chroma 0.124): `300` `#cdb8fa` (lilac — dark links and focus ring), `600` `#6a4e97` (light-mode primary), `700`/`800` the plum gloss, `900`/`950` the website plum-900/950.
- **`ground`** (hue ~321) is the website's pale pink: `200` `#fceaff` is the dark-mode primary pill and text color and the light-mode page; `50`–`300` are the gloss stops.
- **Text ladder** (dark) is ground over plum: scion `#fceaff`, secondary `#c1b2c7` (ground/75), tertiary `#92859a` (ground/55), subtle `#6f6479` (ground/40, sub-AA by design). Light mode uses plum-900 text on the ground page.
- **`opal`** is the iridescent signature: `pink #f6a8dc`, `lilac #cdb8fa`, `azure #6e9cff`, `cyan #8fe7f2`, `pearl #f3f5ff`, `peach #fad3c8`. `--gradient-opal` is the website `.btn-holo` fill; `--gradient-opal-text` the full-strength glyph chord.
- **Accents** `violet` (291) is the periwinkle-lavender pastel accent, `indigo` 272, `mint` 147, `coral` 17; `aqua` (172) and `citron` (112) fill the data-viz chord.
- **Light mode** is a full peer of dark: its own surfaces, borders, text tiers, action stops, and a normalized chart chord (`oklch(from <hue>-500 60% min(c, 0.15) h)`).

`bun run check:tokens` gates the palette: every stop must be in sRGB gamut, the
`colors.ts` hexes must match the CSS OKLCH to within 1 LSB, the WCAG pairs
resolved from `theme.css` must clear their floors, the website-anchored stops
(`purple`, `ground`, `opal`, both page floors) must render to their exact hex,
and the ramps must keep their shape (plum spine hue, hue bands, tapered chroma,
muted `purple`).

## Color Palette

| Color       | Default   | Range   |
| ----------- | --------- | ------- |
| `primary`   | `#523a7d` | 50-950  |
| `secondary` | `#69cffd` | 50-950  |
| `success`   | `#4fc765` | 50-950  |
| `error`     | `#f23156` | 50-950  |
| `warning`   | `#fcb956` | 50-950  |
| `highlight` | `#fcb956` | 50-950  |
| `silent`    | `#59506b` | 50-1000 |
| `neutral`   | `#f4f1fb` | 50-1500 |
| `ground`    | `#fceaff` | 50-950  |
| `pink`      | `#f7538e` | 50-950  |

`primary` aliases the `purple` ramp and `secondary` aliases the `cyan` ramp;
the semantic `bg-primary` / `bg-action-primary` fill is `ground-200` in dark
mode and `purple-600` in light. `pink` is retained as a standalone legacy
accent.

## License

MIT
