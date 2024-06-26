# `babel-preset`

This exports default preset configurations for dealing with modern ESM and TypeScript.

## Installation

To install, run the following in your project root:

```
bun run add @sundaeswap/babel-preset -D
```

Within your `.babelrc` file, extend this config via:

```json
{
  "presets": ["@sundaeswap/babel-preset"]
}
```

In your `package.json` file, use the following build scripts (replace `bun run` with your package manager of choice):

```json
{
  "scripts": {
    "build": "bun run clean && bun run types && bun run build:esm && bun run build:cjs && bun run set-cjs",
    "build:esm": "cross-env BABEL_ENV=esmUnbundled babel src --extensions '.ts' --out-dir './dist/esm' --source-maps",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --extensions '.ts' --out-dir 'dist/cjs' --source-maps",
    "types": "tsc --project ./tsconfig.json"
  }
}
```
