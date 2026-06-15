# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.1](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@4.0.4...@sundaeswap/tailwind-config@5.0.1) (2026-06-15)

### Bug Fixes

- **colors:** sync neutral ramp with theme.css — add neutral-50 ([c257383](https://github.com/sundaeswap-finance/frontend-configurations/commit/c2573834654958538c5036c85423b5dc59b7f37a))
- **tailwind-config:** bump overlay surface chroma to be perceptible ([54bfac3](https://github.com/sundaeswap-finance/frontend-configurations/commit/54bfac3cb6150956d27fcb82e25c9e794f5fd2cd))
- **tailwind-config:** commit to magenta on overlay surfaces ([4e9704b](https://github.com/sundaeswap-finance/frontend-configurations/commit/4e9704b4d76a86b084eb389f00cb657a117b075b))
- **tailwind-config:** dial back overlay tint to oklch(16% 0.045 322) ([439bd7c](https://github.com/sundaeswap-finance/frontend-configurations/commit/439bd7c0fdcafa4522ff57bfa03a9c27058c3756))
- **tailwind-config:** make dark surface-overlay fully opaque to remove sheen band ([fefd6b8](https://github.com/sundaeswap-finance/frontend-configurations/commit/fefd6b822d11b48c0382680d27f89153280a25f6))
- **tailwind-config:** resolve token-gate contrast pairs live from theme.css ([6ee9831](https://github.com/sundaeswap-finance/frontend-configurations/commit/6ee983103ee80120b9fc7bc72831b1023af88d64))
- **theme:** use deep-ramp silent values for dark action surfaces ([43e8a27](https://github.com/sundaeswap-finance/frontend-configurations/commit/43e8a27b8c68a342e1425b4b20bb013da03ca32e))
- **theme:** use literal hex values for semantic tokens in [@theme](https://github.com/theme) ([a514d82](https://github.com/sundaeswap-finance/frontend-configurations/commit/a514d825c2777fbc0cf035b731b421e88752b710))

- refactor(tailwind-config)!: consolidate keyframes into theme.css ([0559424](https://github.com/sundaeswap-finance/frontend-configurations/commit/0559424a6d54dbf2b68ee13723bbe8cc9f75fed0))
- refactor(tailwind-config)!: rename accent ramp to semantic hue keys ([22ddb0a](https://github.com/sundaeswap-finance/frontend-configurations/commit/22ddb0a9b75422cbcefdd7e80b20e21e728b6530)), closes [#48CAE4](https://github.com/sundaeswap-finance/frontend-configurations/issues/48CAE4) [#F5B7B1](https://github.com/sundaeswap-finance/frontend-configurations/issues/F5B7B1) [#F0](https://github.com/sundaeswap-finance/frontend-configurations/issues/F0)
- feat(tailwind-config)!: remove deprecated gray namespace ([5e2384d](https://github.com/sundaeswap-finance/frontend-configurations/commit/5e2384d933270a858baaa8f8d4fe9aa8fc357823)), closes [sundaeswap/ui-toolkit#39d7](https://github.com/sundaeswap/ui-toolkit/issues/39d7) [dex-v2#8d5baee9](https://github.com/dex-v2/issues/8d5baee9) [#e6ecf0](https://github.com/sundaeswap-finance/frontend-configurations/issues/e6ecf0)
- feat(design-system)!: promote Geist to canonical sans + migrate postcss-config to Tailwind v4 ([451c05c](https://github.com/sundaeswap-finance/frontend-configurations/commit/451c05ce94ed179dc81fb2fa6b5393fcbd83af6c))

### Features

- **colors:** retune silent ramp toward brand magenta hue ([5641b19](https://github.com/sundaeswap-finance/frontend-configurations/commit/5641b19a2ca7b2b647f72cab943e0b5074b7e87e))
- **tailwind-config:** add iris-morph and magenta color ramps ([4bc4acd](https://github.com/sundaeswap-finance/frontend-configurations/commit/4bc4acda205af33ab951f0bb128338ee31e23f7e))
- **tailwind-config:** add semantic radii, shadows, and motion tokens ([22e8db9](https://github.com/sundaeswap-finance/frontend-configurations/commit/22e8db983497409976c177ff9296379602e62c78))
- **tailwind-config:** add shadow-soft-rest and shadow-soft-hover tokens ([2347582](https://github.com/sundaeswap-finance/frontend-configurations/commit/2347582e307acb840c232068167bf65fb3dca69d))
- **tailwind-config:** add stateful action surface tokens ([c1b42c1](https://github.com/sundaeswap-finance/frontend-configurations/commit/c1b42c1cf4e2881efd56b6dd39752d87ad531c17))
- **tailwind-config:** add surface-well tier and refine light mode surfaces ([617fa74](https://github.com/sundaeswap-finance/frontend-configurations/commit/617fa74548551feb4ba4d3261a5ee80b227b95c6))
- **tailwind-config:** add violet, blue, and socials color namespaces ([4e6a591](https://github.com/sundaeswap-finance/frontend-configurations/commit/4e6a59178f7bd1369f9a4d72a53d27b6f563941b)), closes [#A78](https://github.com/sundaeswap-finance/frontend-configurations/issues/A78) [#7C3](https://github.com/sundaeswap-finance/frontend-configurations/issues/7C3) [#8B5CF6](https://github.com/sundaeswap-finance/frontend-configurations/issues/8B5CF6) [#60A5](https://github.com/sundaeswap-finance/frontend-configurations/issues/60A5) [#2563](https://github.com/sundaeswap-finance/frontend-configurations/issues/2563)
- **tailwind-config:** lift light-mode cards to pure white ([d0796a8](https://github.com/sundaeswap-finance/frontend-configurations/commit/d0796a84b3e0f6461ab68af38f40f323ea6996c9))
- **tailwind-config:** re-anchor action tokens to neon ramp stops ([f96c00c](https://github.com/sundaeswap-finance/frontend-configurations/commit/f96c00c4adbfbfdea5af0815159689ec55b06602))
- **tailwind-config:** re-anchor success green toward the iris-mint family ([055d3ec](https://github.com/sundaeswap-finance/frontend-configurations/commit/055d3ec65e2bf7cc002f9b03e39a01e198541943))
- **tailwind-config:** semantic surface/text/border tokens with dark cascade ([9223ff0](https://github.com/sundaeswap-finance/frontend-configurations/commit/9223ff077a4359337cf1a22945c40d003aa88f41))
- **tailwind-config:** source iris gradient from the brand ramp and expose iris utilities ([b76bd34](https://github.com/sundaeswap-finance/frontend-configurations/commit/b76bd343f2519f7262d618bff5c7162173801c2d))
- **tailwind-config:** warm-tint overlay surfaces in dark mode ([7369de3](https://github.com/sundaeswap-finance/frontend-configurations/commit/7369de3450b803688470b504aff6ddd525883a24)), closes [#202230](https://github.com/sundaeswap-finance/frontend-configurations/issues/202230)

### BREAKING CHANGES

- drops the \`keyFrames\` and \`theme\` JS exports.
  Consumers had none in this org, but external consumers should import
  animations and individual color/spacing maps directly.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>

- consumers must update to the new keys.
  bg-accent-100/200/300 -> bg-accent-cyan/salmon/peach
  colors.accent[100/200/300] -> colors.accent.cyan/salmon/peach

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>

- consumers of bg-gray-_, text-gray-_, colors.gray._,
  etc. must migrate to the neutral-_ equivalents. Migration mapping
  documented in the ui-toolkit and dex-v2 migration commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>

- @sundaeswap/postcss-config v3 requires tailwindcss ^4.0.0.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>

## [4.0.4](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@4.0.3...@sundaeswap/tailwind-config@4.0.4) (2026-02-12)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [4.0.3](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@4.0.1...@sundaeswap/tailwind-config@4.0.3) (2026-02-12)

### Bug Fixes

- naming conflict ([fba297e](https://github.com/sundaeswap-finance/frontend-configurations/commit/fba297e0b7727b1c6ba24e56b7520a14512dcfed))

## [4.0.1](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@3.0.5...@sundaeswap/tailwind-config@4.0.1) (2026-02-11)

- feat(tailwind-config)!: migrate to Tailwind CSS v4 ([81da7a7](https://github.com/sundaeswap-finance/frontend-configurations/commit/81da7a70333d77ac7388e45b802d2d5faa0c603c))

### BREAKING CHANGES

- This is a major version update (3.x -> 4.0.0) that migrates to Tailwind CSS v4's CSS-first configuration approach.

Changes:

- Add theme.css with @theme definitions for colors, animations, keyframes
- Update package.json to v4.0.0 with tailwindcss ^4.0.0 peer dependency
- Remove tailwindcss-radix and tailwindcss-animation-delay plugins (incompatible with v4)
- Simplify index.ts exports, deprecate theme object
- Update README with v4 migration guide

Migration:
Instead of extending a JS config, import the CSS theme:

```css
@import "tailwindcss";
@import "@sundaeswap/tailwind-config/theme.css";
```

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>

## [3.0.5](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@3.0.4...@sundaeswap/tailwind-config@3.0.5) (2024-10-17)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [3.0.4](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@3.0.3...@sundaeswap/tailwind-config@3.0.4) (2024-10-11)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [3.0.3](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@3.0.2...@sundaeswap/tailwind-config@3.0.3) (2024-10-10)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [3.0.2](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@3.0.1...@sundaeswap/tailwind-config@3.0.2) (2024-10-10)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [3.0.1](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.17...@sundaeswap/tailwind-config@3.0.1) (2024-09-25)

### Bug Fixes

- eslint ([58399a0](https://github.com/sundaeswap-finance/frontend-configurations/commit/58399a03a83ce5aa2c27fe40317725d2542aaf98))

## [2.0.17](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.16...@sundaeswap/tailwind-config@2.0.17) (2024-07-18)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [2.0.16](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.15...@sundaeswap/tailwind-config@2.0.16) (2024-07-18)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [2.0.15](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.14...@sundaeswap/tailwind-config@2.0.15) (2024-07-17)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [2.0.14](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.13...@sundaeswap/tailwind-config@2.0.14) (2024-06-26)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [2.0.13](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.12...@sundaeswap/tailwind-config@2.0.13) (2024-06-26)

### Bug Fixes

- cjs exports ([b6720fc](https://github.com/sundaeswap-finance/frontend-configurations/commit/b6720fc27363ecbb808d3311bbf06482df472916))

## [2.0.12](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.11...@sundaeswap/tailwind-config@2.0.12) (2024-06-20)

### Bug Fixes

- missing marque keyframes ([6501940](https://github.com/sundaeswap-finance/frontend-configurations/commit/6501940365ea063ba87e2ce7469e8ef8083ae785))

## [2.0.11](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.9...@sundaeswap/tailwind-config@2.0.11) (2024-06-20)

### Bug Fixes

- radix tailwind options ([7fe6f36](https://github.com/sundaeswap-finance/frontend-configurations/commit/7fe6f36c495fbf97a6adf2ae07c8d106e4eb74c5))

## [2.0.10](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.9...@sundaeswap/tailwind-config@2.0.10) (2024-06-20)

### Bug Fixes

- radix tailwind options ([7fe6f36](https://github.com/sundaeswap-finance/frontend-configurations/commit/7fe6f36c495fbf97a6adf2ae07c8d106e4eb74c5))

## 2.0.9 (2024-06-20)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## 2.0.8 (2024-06-20)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## 2.0.7 (2024-06-20)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## 2.0.6 (2024-06-19)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## 2.0.5 (2024-06-19)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## [2.0.4](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.3...@sundaeswap/tailwind-config@2.0.4) (2024-06-19)

### Bug Fixes

- exports ([07cb71d](https://github.com/sundaeswap-finance/frontend-configurations/commit/07cb71d72501b886d4fd1b8ed1304212b86bb436))

## [2.0.3](https://github.com/sundaeswap-finance/frontend-configurations/compare/@sundaeswap/tailwind-config@2.0.2...@sundaeswap/tailwind-config@2.0.3) (2024-06-19)

**Note:** Version bump only for package @sundaeswap/tailwind-config

## 2.0.2 (2024-06-17)

### Bug Fixes

- collapsible animation ([5d26bb3](https://github.com/sundaeswap-finance/frontend-configurations/commit/5d26bb32a76c71edb0a9dd196487385c84595abc))
- duplicate replace ([806626d](https://github.com/sundaeswap-finance/frontend-configurations/commit/806626de43e7ab56b579a248c082753d804f3c2a))
- offcanvas animation ([b29db55](https://github.com/sundaeswap-finance/frontend-configurations/commit/b29db55db91ecdbad89319ffa66c4a4bef517858))
- openOffCanvas animation ([2961c76](https://github.com/sundaeswap-finance/frontend-configurations/commit/2961c76370963ebd34dd2b26f8aaa0c18a32cd4f))
- openOffCanvas animation ([5695102](https://github.com/sundaeswap-finance/frontend-configurations/commit/5695102acaab93f02dc71046c0dcd72b5403704b))

### Features

- add toast progress bar animation ([3abcfde](https://github.com/sundaeswap-finance/frontend-configurations/commit/3abcfdedb7df120b60f609d4aa3ea4da0cd1541c))
- add toast slide animations ([573a4a9](https://github.com/sundaeswap-finance/frontend-configurations/commit/573a4a94b724b73f4bd2364349c3384b837867ba))
- add toast slide animations ([e3e9843](https://github.com/sundaeswap-finance/frontend-configurations/commit/e3e98432ae2293861510fec3a11d2581c5584b8c))
- add toast swipe animation ([8b18dcc](https://github.com/sundaeswap-finance/frontend-configurations/commit/8b18dcc71505c40adfda4fd1bc0ee968a0eab70c))

# 1.6.0 (2022-07-02)

### Bug Fixes

- cleanup ([04ae9c1](https://github.com/sundaeswap-finance/frontend-configurations/commit/04ae9c17650cfef9c9138b5914edced1f281387e))
- **eslint:** set main to dist/index.js, eslint config ([f6578a7](https://github.com/sundaeswap-finance/frontend-configurations/commit/f6578a70de716375055823a9a13aac07db430e3a))
- pacakage version ([681d8f4](https://github.com/sundaeswap-finance/frontend-configurations/commit/681d8f469ca86c1fe53a7df95fa1c1ec53b40d11))

### Features

- **tailwind-config:** add `xxs` as fontSize ([d0b8483](https://github.com/sundaeswap-finance/frontend-configurations/commit/d0b84839bdc131848aa45d1120cf092362d16906))
- **tailwind-config:** add ui-toolkit config to default ([cc781fb](https://github.com/sundaeswap-finance/frontend-configurations/commit/cc781fb0347caf8513ce075590c91cc8d7babaf1))

# 1.7.0 (2022-09-17)

### Refactors

- refactor: **Add new Theme Palette Naming** ([1488f5c](https://github.com/sundaeswap-finance/frontend-configurations/commit/1488f5c4d97e56a7bece8e7e73dde886bf764955))

# 1.6.0 (2022-07-02)

### Bug Fixes

- cleanup ([04ae9c1](https://github.com/sundaeswap-finance/frontend-configurations/commit/04ae9c17650cfef9c9138b5914edced1f281387e))
- **eslint:** set main to dist/index.js, eslint config ([f6578a7](https://github.com/sundaeswap-finance/frontend-configurations/commit/f6578a70de716375055823a9a13aac07db430e3a))
- pacakage version ([681d8f4](https://github.com/sundaeswap-finance/frontend-configurations/commit/681d8f469ca86c1fe53a7df95fa1c1ec53b40d11))

### Features

- **tailwind-config:** add `xxs` as fontSize ([d0b8483](https://github.com/sundaeswap-finance/frontend-configurations/commit/d0b84839bdc131848aa45d1120cf092362d16906))
- **tailwind-config:** add ui-toolkit config to default ([cc781fb](https://github.com/sundaeswap-finance/frontend-configurations/commit/cc781fb0347caf8513ce075590c91cc8d7babaf1))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.2.1

### Added

- A `CHANGELOG.md` file to track future changes.

### Changed

- The color pallete for the default TailwindCSS config, including defaults for color shades.
