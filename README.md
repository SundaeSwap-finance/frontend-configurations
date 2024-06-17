# frontend-configurations

This is a collection of generic and reusable _frontend_ configurations across the SundaeSwap cosmos. The idea is to create configuration files as independent packages that can be extended from/installed separately.

## Published packages

- [bable-preset](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/babel-preset)
- [eslint-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/eslint-config)
- [i18n-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/i18n-config)
- [jest-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/jest-config)
- [postcss-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/postcss-config)
- [prettier-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/prettier-config)
- [tailwind-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/tailwind-config)
- [webpack-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/webpack-config)

## Development

### Install

We use [Bun.sh](https://bun.sh) to manage our projects. In the project root, run

```shell
bun install
```

### Build

In order to build the packages, run `bun run build` inside the `root` directory.

## Release

The current pipeline will release every unpublished package based on the version field in the ./package.json file. The packages are published to the public NPM registry. Our pipeline currently does not automate this, so it requires this to be included in the commit. To bump the package versions in the project root:

```shell
bun run bump
```

After that commit & push the changes. Once merged, the pipeline will release changed packages soon.
