# `@aishow/ui`

This package contains the shared UI component library for the AI-Net platform, implemented in React and tailored with Tailwind CSS.

## Purpose

To ensure a unified and consistent design system across both the `web` and `marketing` apps. This package relies heavily on composable components and adheres to our accessibility guidelines.

## Usage

You can import any of the exported UI components directly into an application:

```tsx
import { Button } from "@aishow/ui/components/button";

export default function Page() {
  return <Button variant="default">Click Me</Button>;
}
```
