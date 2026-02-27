# `@aishow/hooks`

This package provides a collection of reusable React hooks used throughout the AI-Net workspace applications (`web`, `marketing`, etc.).

## Purpose

By abstracting common logic into custom hooks, we maintain consistency, reduce code duplication, and simplify testing across the platform. These hooks are designed to be framework-agnostic whenever possible, but some may have peer dependencies on Next.js or React.

## Usage

```tsx
import { useSomeHook } from "@aishow/hooks";

export function MyComponent() {
  const value = useSomeHook();
  // ...
}
```
