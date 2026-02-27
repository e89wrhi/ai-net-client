# `@aishow/eslint-config`

This package provides a collection of internal ESLint configurations used across the AI-Net Turborepo workspace.

## Usage

To use these configurations within a workspace package, simply extend the relevant config in your `eslint.config.js` or `.eslintrc.*` file.

```js
module.exports = {
  extends: ["@aishow/eslint-config/next.js"],
};
```

This ensures consistent code quality and formatting across all apps and packages in the repository.
