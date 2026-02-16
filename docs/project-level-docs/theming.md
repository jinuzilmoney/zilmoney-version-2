# Theming & Fonts

How the design token system, dark mode, and typography work across the application.

## Overview

The theming system is built on three layers:

1. **CSS custom properties** — All colors are defined as CSS variables in `app/globals.css`, with `:root` for light mode and `.dark` for dark mode
2. **Tailwind v4 `@theme inline` bridge** — Maps CSS variables to Tailwind's `--color-*` namespace, generating utility classes like `bg-primary`, `text-foreground`, `border-border`
3. **`next-themes`** — Manages the `dark` class on `<html>`, persists theme preference to localStorage, and respects the user's OS preference

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  app/globals.css                                        │
│                                                         │
│  :root { --primary: rgb(32 49 157); ... }   ← Light    │
│  .dark { --primary: hsl(225 61% 55%); ... } ← Dark     │
│                                                         │
│  @theme inline {                                        │
│    --color-primary: var(--primary);  ← Tailwind bridge  │
│    ...                                                  │
│  }                                                      │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Tailwind utility classes                               │
│                                                         │
│  bg-primary  text-foreground  border-border  bg-card    │
│  These classes resolve to the CSS variables above.      │
│  When .dark is on <html>, the dark values kick in.      │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Components                                             │
│                                                         │
│  <button className="bg-primary text-primary-neon">     │
│  No dark: prefix needed — the variables switch          │
│  automatically based on the active theme.               │
└─────────────────────────────────────────────────────────┘
```

### Theme switching flow

```
ThemeProvider (src/app/providers/ThemeProvider.tsx)
  ↓  wraps the entire app in layout.tsx
  ↓  uses next-themes with attribute="class"
  ↓
ThemeToggle (src/shared/ui/theme-toggle/ThemeToggle.tsx)
  ↓  cycles: light → dark → system
  ↓  calls setTheme() from useTheme()
  ↓
next-themes toggles .dark class on <html>
  ↓
CSS variables in .dark { } override :root values
  ↓
All Tailwind classes update automatically
```

## How Dark Mode Works

- **Class-based**: The `.dark` class is added/removed on the `<html>` element
- **Managed by `next-themes`**: The `ThemeProvider` in `app/layout.tsx` handles everything
- **Three modes**: `light`, `dark`, `system` (follows OS preference)
- **Persisted**: Theme choice is saved to `localStorage` and restored on page load
- **No flash**: `next-themes` injects a blocking script to set the class before React hydrates. This is why `<html>` has `suppressHydrationWarning`

### Important: No `dark:` prefix needed for theme tokens

Since the CSS variables themselves change between light and dark mode, you do **not** need `dark:` prefixes when using theme token classes:

```tsx
// CORRECT — variables handle the switch
<div className="bg-card text-foreground border-border">

// WRONG — redundant, don't do this
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100">
```

The only exception is when using Tailwind's built-in palette colors (like `red-50`, `green-200`) that don't come from CSS variables. In that case, `dark:` variants are needed (see Toast component for an example).

## Color Token Reference

### Brand Colors

| CSS Variable | Tailwind Class | Value |
|---|---|---|
| `--brand-neon-green` | `bg-brand-neon-green` | `rgb(59 244 147)` |
| `--brand-royal-blue` | `bg-brand-royal-blue` | `rgb(32 49 157)` |
| `--brand-midnight-violet` | `bg-brand-midnight-violet` | `rgb(46 0 86)` |
| `--brand-vivid-violet` | `bg-brand-vivid-violet` | `rgb(121 36 255)` |
| `--brand-sky-blue` | `bg-brand-sky-blue` | `rgb(5 149 229)` |
| `--brand-soft-silver` | `bg-brand-soft-silver` | `rgb(234 234 234)` |

### Primary & Secondary

| CSS Variable | Tailwind Class | Light | Dark |
|---|---|---|---|
| `--primary` | `bg-primary`, `text-primary` | `rgb(32 49 157)` | `hsl(225 61% 55%)` |
| `--primary-foreground` | `text-primary-foreground` | white | white |
| `--primary-neon` | `bg-primary-neon`, `text-primary-neon` | `rgb(59 244 147)` | `rgb(59 244 147)` |
| `--primary-dark` | `hover:bg-primary-dark` | `#1a2780` | `#5570cc` |
| `--primary-neon-light` | `hover:bg-primary-neon-light` | `#2ee082` | `#6bfaaf` |
| `--secondary` | `bg-secondary` | `rgb(234 234 234)` | `hsl(217.2 32.6% 25%)` |
| `--secondary-foreground` | `text-secondary-foreground` | `hsl(0 0% 15%)` | `hsl(210 40% 98%)` |

### Core UI

| CSS Variable | Tailwind Class | Purpose |
|---|---|---|
| `--background` | `bg-main-background` | Page background |
| `--foreground` | `text-foreground` | Primary text color |
| `--card` | `bg-card` | Card / panel backgrounds |
| `--card-foreground` | `text-card-foreground` | Text on cards |
| `--popover` | `bg-popover` | Dropdown panels, popovers |
| `--popover-foreground` | `text-popover-foreground` | Text in popovers |
| `--muted` | `bg-muted` | Subtle backgrounds |
| `--muted-foreground` | `text-muted-foreground` | Secondary / helper text |
| `--accent` | `bg-accent` | Active / highlighted items |
| `--accent-foreground` | `text-accent-foreground` | Text on accented items |
| `--destructive` | `bg-destructive` | Error / danger backgrounds |
| `--destructive-foreground` | `text-destructive-foreground` | Text on destructive elements |
| `--border` | `border-border` | Default border color |
| `--input` | `border-input` | Input field borders |
| `--ring` | `ring-ring` | Focus ring color |

### Status Colors

| CSS Variable | Tailwind Class | Purpose |
|---|---|---|
| `--success` | `text-success`, `bg-success` | Success state |
| `--warning` | `text-warning`, `bg-warning` | Warning state |
| `--info` | `text-info`, `bg-info` | Informational state |
| `--violet` | `text-violet`, `bg-violet` | Violet accent |

Each has a `-foreground` variant (e.g., `text-success-foreground`).

### Semantic Colors

| CSS Variable | Tailwind Class | Purpose |
|---|---|---|
| `--placeholder` | `text-placeholder` | Input placeholder text |
| `--surface` | `bg-surface` | Elevated surface |
| `--panel` | `bg-panel` | Side panels |
| `--hover` | `bg-hover` | Hover state background |
| `--active` | `bg-active` | Active/pressed state |

### Border Radius

| Token | Tailwind Class | Value |
|---|---|---|
| `--ui-radius` | `rounded-lg` | `0.75rem` |
| calc'd | `rounded-md` | `calc(0.75rem - 2px)` |
| calc'd | `rounded-sm` | `calc(0.75rem - 4px)` |

## Font System

### Fonts Used

| Font | CSS Variable | Applied To | Loaded From |
|---|---|---|---|
| **Funnel Display** | `--font-funnel` | Headings (`h1`–`h6`) | Google Fonts via `next/font` |
| **Plus Jakarta Sans** | `--font-peridot` | Body text (everything else) | Google Fonts via `next/font` |

### How Fonts Are Loaded

Fonts are loaded in `app/layout.tsx` using `next/font/google` for automatic optimization (subsetting, self-hosting, zero layout shift):

```tsx
const funnelDisplay = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-peridot",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
```

The CSS variables are injected on `<body>` via className, then applied in `app/globals.css`:

```css
@layer base {
  * {
    font-family: "Plus Jakarta Sans", var(--font-peridot), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-funnel), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}
```

### Using Fonts in Tailwind

The fonts are registered in `@theme inline` as:

```css
--font-funnel: var(--font-funnel), sans-serif;
--font-peridot: var(--font-peridot), sans-serif;
```

This means you can use `font-funnel` or `font-peridot` as Tailwind classes if you need to override the default for a specific element:

```tsx
<span className="font-funnel">Uses Funnel Display</span>
<span className="font-peridot">Uses Plus Jakarta Sans</span>
```

## Using Theme Tokens in Components

### Basic usage

```tsx
// Card with themed colors — automatically adapts to light/dark
<div className="bg-card text-card-foreground border border-border rounded-lg p-4">
  <h2 className="text-foreground">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Input fields

```tsx
<input
  className={cn(
    "border bg-card text-foreground placeholder:text-placeholder",
    "focus-visible:ring-2 focus-visible:ring-ring",
    error ? "border-destructive" : "border-input"
  )}
/>
```

### Buttons with brand colors

```tsx
// Primary button — blue background, neon green text
<button className="bg-primary text-primary-neon hover:bg-primary-dark">

// Neon button — green background
<button className="bg-primary-neon text-foreground hover:bg-primary-neon-light">

// Outline button
<button className="border-2 border-primary text-primary hover:bg-primary/10">
```

### Using `cn()` for conditional classes

Import from the shared utility:

```tsx
import { cn } from "@/src/shared/lib";

<div className={cn(
  "bg-card border border-border",
  isActive && "bg-accent text-accent-foreground",
  className
)}>
```

## Key Files

| File | Purpose |
|---|---|
| `app/globals.css` | All CSS variables (light + dark), `@theme inline` bridge, `@layer base` styles |
| `app/layout.tsx` | Font loading (`next/font/google`), `ThemeProvider` wrapping |
| `src/app/providers/ThemeProvider.tsx` | `next-themes` configuration (class-based, system default) |
| `src/shared/ui/theme-toggle/ThemeToggle.tsx` | Theme toggle button (light/dark/system cycle) |
| `src/shared/lib/utils.ts` | Shared `cn()` utility (`clsx` + `tailwind-merge`) |

## Rules

1. **Never hardcode colors** — Use theme tokens (`bg-primary`, `text-foreground`, etc.) instead of hex values (`bg-[#20319D]`) or Tailwind palette colors (`bg-gray-200`)
2. **No `dark:` prefix for themed colors** — CSS variables handle mode switching automatically. Only use `dark:` for Tailwind's built-in palette colors when necessary
3. **Always use `cn()` for conditional classes** — Import from `@/src/shared/lib`, not from `clsx` directly
4. **Test both modes** — Verify your component looks correct in both light and dark mode before committing
