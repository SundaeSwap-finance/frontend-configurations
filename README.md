# frontend-configurations

This is a collection of generic and reusable _frontend_ configurations across the SundaeSwap cosmos. The idea is to create configuration files as independent packages that can be extended from/installed separately.

## Published packages

- [eslint-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/eslint-config) - _base_ eslint config without any react/ui-related ruleset
- [tailwind-config](https://github.com/SundaeSwap-finance/frontend-configurations/tree/main/packages/twailwind-config) - _base_ config for tailwind applications

## Development

### Install

In the project root, run

```shell
yarn
```

### Build

In order to build the packages, run `yarn build` inside the `root` directory.

## Release

The current pipeline will release every unpublished package based on the version field in the ./package.json file. The packages are published in the sundae-shared AWS CodeArtifact repository. To bump the package versions in the project root:

```shell
yarn bump
```

After that commit & push the changes and the pipeline should release the packages soon. You can also manually publish a release by changing the version number in your preferred package, and then running from the root directory:

```shell
yarn release
```
