# `@aishow/typescript-config`

This package provides the base internal TSConfig settings used across the AI-Net Turborepo workspace to guarantee consistent TypeScript compilation and strictness options.

## Usage

Extend this configuration in the `tsconfig.json` of your individual apps and packages.

```json
{
  "extends": "@aishow/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```
