# `@aishow/types`

This package serves as the central repository for shared TypeScript type definitions and interfaces for the AI-Net workspace.

## Purpose

By maintaining types in a dedicated package, we ensure type safety and consistency across all apps and internal modules. This includes API response schemas, complex generic UI models, and generic utility types.

## Usage

```ts
import type { UserProfile } from "@aishow/types";

function renderProfile(user: UserProfile) {
  // ...
}
```
