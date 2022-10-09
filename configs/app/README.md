# Configure app

Common config for apps.

The purpose of these configs is to define a common set of strict rules to validate the coding standards in monorepo.

Installation shall be runned in app's root directory.

# Setup app

- [ESLint](#eslint)
- [Typescript](#typescript)

## ESLint

- Add reference to `@muravjev/eslint-config-app-next` and its peer dependencies

  ```sh
  pnpx install-peerdeps @muravjev/eslint-config-app-next --pnpm --extra-args "-D"
  ```

- Add eslint configuration file `./.eslintrc.js`

  ```js
  // .eslintrc.js

  module.exports = require('@muravjev/eslint-config-app-next');
  ```

## Typescript

- Add reference to `@muravjev/ts-config-app-next` and its peer dependencies

  ```sh
  pnpx install-peerdeps @muravjev/ts-config-app-next --pnpm --extra-args "-D"
  ```

- Add typescript configuration file `./tsconfig.json`

  ```json
  // tsconfig.json

  {
    "extends": "@muravjev/ts-config-app-next",
    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["next-env.d.ts", "src"]
  }
  ```
