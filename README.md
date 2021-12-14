# sundaeswap-toolkit

---

TypeScript Monorepo with yarn workspaces and lerna

### Published packages

- `packages/`

### Apps

- `apps/`

### Services

- `services/`

## development

### install

In the project root

```
yarn install
```

### local development

in `apps/example.com-app`

```sh
yarn dev
```

<!-- ### Release -->

<!-- The current pipeline will release every unpublished package based on the `version` field in the [`./package.json`](./package.json) file.
The packages are published in the `sundae-shared` AWS CodeArtifact repository.
To bump the package versions in the project root:

```
yarn bump
```

After that commit & push the changes and the pipeline should release the packages soon. -->
