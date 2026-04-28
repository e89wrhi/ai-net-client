# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> homepage loads
- Location: tests\home.spec.ts:3:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /AI-Net/
Received string:  "AI-net"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    8 × unexpected value "AI-net"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - img "logo" [ref=e7]
        - heading "AI-net" [level=1] [ref=e8]
        - paragraph [ref=e9]: try AI in .NET framework.
      - generic [ref=e10]:
        - generic [ref=e11]:
          - button "Continue with Google" [ref=e12] [cursor=pointer]:
            - img
            - generic [ref=e13]: Continue with Google
          - generic [ref=e17]: Or
        - generic [ref=e18]:
          - generic [ref=e19]:
            - generic [ref=e20]: Email
            - textbox "Email" [ref=e21]:
              - /placeholder: name@example.com
          - generic [ref=e22]:
            - generic [ref=e23]:
              - generic [ref=e24]: Password
              - link "Forgot?" [ref=e25] [cursor=pointer]:
                - /url: /identity/forgot-password
            - textbox "Password" [ref=e26]:
              - /placeholder: ••••••••••••
          - button "Sign in" [ref=e28] [cursor=pointer]
        - paragraph [ref=e30]:
          - text: Don't have an account?
          - link "Create one for free" [ref=e31] [cursor=pointer]:
            - /url: /register
    - paragraph [ref=e33]: AI-NET APP • v1.0
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e39] [cursor=pointer]:
    - img [ref=e40]
  - alert [ref=e43]
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test"
  2 | 
  3 | test("homepage loads", async ({ page }) => {
  4 |   await page.goto("/")
> 5 |   await expect(page).toHaveTitle(/AI-Net/)
    |                      ^ Error: expect(page).toHaveTitle(expected) failed
  6 | })
```