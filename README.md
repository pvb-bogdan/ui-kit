# Venue Style Guide / UI Kit

A one-page Nuxt app that documents the design system for the **events ballroom** sales website (weddings, galas, private events). It has two panels:

| Panel | Who uses it | What it can do | Ships on the sales site? |
|---|---|---|---|
| **Themes tab**, `ThemeSwitcher.vue` | The prospective client | Browse **5 themes** and **light/dark**. Nothing else, and nothing is saved. The client tells us which theme they like. | ✅ yes |
| **Theme Studio**, `ThemePanel.vue` | Us (designers) | Edit every token: colors, fonts, radius, spacing, effects. Used to build and tune the 5 themes. | ❌ no |

```bash
npm install
npm run dev   # http://localhost:3000
```

## Stack

Nuxt 4, **Tailwind CSS v4** (via `@tailwindcss/vite`), and Phosphor icons through `@nuxt/icon`. The venue site uses the same stack.

## How it works

```
ThemeSettings (JSON) ──buildThemeCss()──▶ unlayered :root { --color-primary … }
                                                  │ overrides
                                                  ▼
             Tailwind @theme defaults (main.css) ──▶ bg-primary, text-h1, rounded-btn, p-6 …
```

Tailwind v4 utilities read CSS variables (`bg-primary` → `var(--color-primary)`). The theme switcher only changes those variables, so **every utility class re-themes on its own**, with no class swapping and no `dark:` variants for colors.

## Tailwind cheat sheet

| Need | Use | Notes |
|---|---|---|
| Colors | `bg-background` `bg-surface` `bg-surface-alt` `text-foreground` `text-muted` `border-border` `border-border-strong` | Tailwind's default palette is **removed**, so `bg-gray-100` won't exist. Only theme colors do. |
| Brand | `bg-primary` `text-on-primary` `hover:bg-primary-hover` `bg-primary-soft` (and the same for `accent`) | Opacity works too: `ring-primary/30` |
| Status | `text-success` `bg-warning-soft` `border-danger` `bg-info-soft` | Not themed |
| Fonts | `font-heading` `font-body` | `<h1>`–`<h6>` get the heading font automatically |
| Type scale | `text-xs` `text-sm` `text-base` `text-h6` … `text-h1` `text-display` | h1, h2 and display are fluid |
| Heading look on any element | `heading` | Theme font, weight, uppercase and tracking |
| Eyebrow label | `eyebrow` | |
| Link | `link` | |
| Radius | `rounded-sm` `rounded-md` `rounded-lg` `rounded-btn` `rounded-full` | Set by the theme |
| Border width | `border-theme` `border-t-theme` `border-b-theme` | 1px or 2px, set by the theme |
| Spacing | normal Tailwind: `p-6` `gap-4` `mt-12` | Multiplied by the theme density |
| Shadows | `shadow-sm` `shadow-md` `shadow-lg` | Set by the theme; stronger in dark mode |
| Focus | `focus-ring` | Ring in the primary color |
| Motion | `transition` | Duration follows the theme's animation speed |

## Files

| Path | What it is | Copy to the venue site? |
|---|---|---|
| `app/assets/css/main.css` | Tailwind `@theme`, custom utilities, base styles | ✅ as-is |
| `app/theme/*` | Settings model, 5 presets, fonts, token builder, contrast helpers | ✅ as-is |
| `app/composables/useTheme.ts` | Shared state, optional cookie persistence, CSS injection | ✅ as-is |
| `app/utils/ui.ts` | Shared Tailwind class strings for form controls | ✅ as-is |
| `app/components/ui/*` | `UiButton` `UiCard` `UiBadge` `UiAlert` `UiField` `UiInput` `UiSelect` `UiTextarea` `UiCheckbox` `UiRadio` `UiSwitch` `UiAccordion` `UiOrnament` `UiMedia` `UiIcon` `UiGallery` `UiTestimonials` | ✅ as-is |
| `app/composables/useFormField.ts` | Connects `UiField` to the control inside it (id, `aria-describedby`, `aria-invalid`, `required`) | ✅ as-is |
| `app/components/ThemeSwitcher.vue` | Client Themes tab and panel | ✅ as-is |
| `app/components/ThemePanel.vue` + `panel/*` | Designer Theme Studio | ❌ |
| `app/components/guide/*`, `app.vue` | Style guide pages | ❌ |

### A note on overriding component classes

Classes passed to a component are added to its own classes; they are not merged. This also applies to `hidden`: `<UiBadge class="hidden sm:inline-flex">` doesn't work reliably, so put responsive visibility on a wrapper element instead. If both set the same property (e.g. `shadow-md` inside `UiCard` and `shadow-none` from outside), Tailwind's CSS order decides which one wins, not the order in the markup. The components avoid this by leaving layout, size and spacing to the caller (`<UiMedia class="aspect-4/3 rounded-md">`, `<UiCard class="p-6">`). If you need real overrides later, add [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) configured with our custom `text-h*` sizes.

## Using it on the sales site

```vue
<!-- app.vue -->
<script setup lang="ts">
useThemeProvider({ persist: false }) // preview only: every visit starts on the default theme
</script>

<template>
  <NuxtPage />
  <ThemeSwitcher />
</template>
```

With `persist: false` nothing is written to cookies or storage. The chosen theme stays while the client moves between pages, and resets on a full reload.

## Accessibility built in

- **Forms:** put a control inside `<UiField label error hint required>` and it's wired automatically: the label is linked, the error/hint is announced through `aria-describedby`, and the field gets `aria-invalid` and `required`. Errors show an icon plus text, never color alone. The inquiry form demo also shows a focusable error summary.
- **Touch:** on touch screens (`pointer-coarse:`) buttons, chips, checkboxes and the client switcher are at least 44px. With a mouse they stay compact; WCAG's minimum there is 24px.
- **Gallery:** the lightbox is a native `<dialog>`. Focus is trapped, Esc and backdrop click close it, and focus returns to the photo that opened it. Images lazy-load and their space is reserved, so nothing shifts.
- **Testimonials:** manual carousel only, with no auto-rotation. Prev/next, dots and arrow keys, and the slide position is announced to screen readers.
- **Skip link:** the first Tab press shows "Skip to main content".
- Icons are hidden from screen readers by default (`aria-hidden`). Icon-only buttons must get an `aria-label`.

## Rules

1. **Components never hard-code values.** Use theme utilities only: no hex codes and no `text-[#…]`. Arbitrary values are fine for one-off layout.
2. A theme defines only **7 seed colors per mode**. Hover, soft and border-strong tones are mixed from them in `@theme` (`color-mix`).
3. Status colors (success, warning, danger, info) are **not themed**.
4. Button **style** (solid, outline, text) and button **shape** (radius, pill) are separate settings.
5. Icons: Phosphor through Iconify (`<UiIcon name="heart" />`). The weight comes from the theme. Browse names at https://icones.js.org/collection/ph

## Adding a preset

Tweak the theme in the Designer view, then go to **Tokens & export → JSON**, copy the JSON and add it to `PRESETS` in `app/theme/presets.ts`.
