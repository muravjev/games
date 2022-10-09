# Configure core

Common core configs.

The purpose of these configs is to define a common set of strict rules to validate the coding standards in monorepo.

Installation shall be runned in corresponded root directory.

# Setup core

- [Typescript](#typescript)

## Typescript

- Add reference to `@muravjev/ts-config-core` and its peer dependencies

  ```sh
  pnpx install-peerdeps @muravjev/ts-config-core --pnpm --extra-args "-D"
  ```

- Add typescript configuration file `./tsconfig.json`

  ```json
  // tsconfig.json

  {
    "extends": "@muravjev/ts-config-core"
    // ...
    // add here extra configuration
    // ...
  }
  ```
