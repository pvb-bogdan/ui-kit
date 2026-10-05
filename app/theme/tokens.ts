import type { Palette, ResolvedMode, ThemeSettings } from './types'
import { fontStack } from './fonts'
import { onColor } from './color'

/**
 * ThemeSettings  ->  CSS custom properties.
 * Names follow Tailwind v4's theme namespaces, so overriding them at runtime
 * re-themes every utility: --color-primary → bg-primary, --text-h1 → text-h1,
 * --radius-btn → rounded-btn, --density → every p-*, gap-*, m-* (via --spacing).
 * Static defaults for the same names live in @theme (assets/css/main.css).
 */

type Vars = Record<string, string>

const rem = (px: number) => `${+(px / 16).toFixed(4)}rem`

/** Status colors stay fixed across themes so warnings always look like warnings. */
const STATUS: Record<ResolvedMode, Vars> = {
  light: { '--color-success': '#2E6B45', '--color-warning': '#8A560B', '--color-danger': '#A3352F', '--color-info': '#3D6A9E' },
  dark: { '--color-success': '#7BC59A', '--color-warning': '#E3B15E', '--color-danger': '#EB8A84', '--color-info': '#8DB4E2' }
}

const SHADOWS = {
  none: [0, 0, 0],
  soft: [0.05, 0.08, 0.14],
  lifted: [0.1, 0.16, 0.26]
} as const

/** Tailwind spacing steps documented in the guide (p-1 … p-24). */
export const SPACE_STEPS = [1, 2, 3, 4, 6, 8, 12, 16, 24] as const

export function colorVars(p: Palette, mode: ResolvedMode, s: ThemeSettings): Vars {
  const [a1, a2, a3] = SHADOWS[s.effects.shadow].map(a => +(a * (mode === 'dark' ? 3 : 1)).toFixed(2))
  const shadow = (v: string) => (s.effects.shadow === 'none' ? '0 0 #0000' : v)
  return {
    '--color-background': p.bg,
    '--color-surface': p.surface,
    '--color-foreground': p.text,
    '--color-muted': p.muted,
    '--color-border': p.border,
    '--color-primary': p.primary,
    '--color-on-primary': onColor(p.primary),
    '--color-accent': p.accent,
    '--color-on-accent': onColor(p.accent),
    ...STATUS[mode],
    '--shadow-sm': shadow(`0 1px 2px rgb(0 0 0 / ${a1})`),
    '--shadow-md': shadow(`0 6px 16px -6px rgb(0 0 0 / ${a2})`),
    '--shadow-lg': shadow(`0 22px 44px -16px rgb(0 0 0 / ${a3})`),
    'color-scheme': mode
  }
}

export function sharedVars(s: ThemeSettings): Vars {
  const { baseSize: b, scale: r } = s.type
  const step = (n: number) => b * r ** n
  const fluid = (n: number) => {
    const max = step(n)
    const min = Math.max(step(n) * 0.62, step(2))
    return `clamp(${rem(min)}, ${rem(min)} + 2.6vw, ${rem(max)})`
  }

  return {
    // typography → font-heading, font-body, text-xs … text-display, leading-body
    '--font-heading': fontStack(s.fonts.heading),
    '--font-body': fontStack(s.fonts.body),
    '--text-xs': rem(Math.max(step(-2), 11.5)), // floor keeps small labels legible
    '--text-sm': rem(Math.max(step(-1), 13)),
    '--text-base': rem(b),
    '--text-h6': rem(step(0.5)),
    '--text-h5': rem(step(1)),
    '--text-h4': rem(step(2)),
    '--text-h3': rem(step(3)),
    '--text-h2': fluid(4),
    '--text-h1': fluid(5),
    '--text-display': fluid(6),
    '--leading-body': String(s.type.lineHeight),
    // read by the `heading` / `btn-label` utilities
    '--heading-weight': String(s.type.headingWeight),
    '--heading-case': s.type.headingUppercase ? 'uppercase' : 'none',
    '--heading-tracking': `${s.type.headingTracking}em`,
    '--btn-case': s.buttons.uppercase ? 'uppercase' : 'none',
    '--btn-tracking': s.buttons.uppercase ? '0.1em' : '0.01em',
    '--btn-weight': String(s.buttons.weight),
    // shape → rounded-sm / rounded-md / rounded-lg / rounded-btn, border-theme
    '--radius-sm': `${Math.round(s.shape.radius * 0.5)}px`,
    '--radius-md': `${s.shape.radius}px`,
    '--radius-lg': `${Math.round(s.shape.radius * 1.5)}px`,
    '--radius-btn': s.shape.buttonPill ? '999px' : `${s.shape.buttonRadius}px`,
    '--border-width': `${s.shape.borderWidth}px`,
    // spacing → @theme sets --spacing: calc(0.25rem * var(--density))
    '--density': String(s.spacing.density),
    // motion → Tailwind's default transition duration
    '--duration': `${Math.round(200 * s.effects.motion)}ms`
  }
}

const block = (selector: string, vars: Vars) =>
  `${selector}{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`

/**
 * Full stylesheet for a theme. Unlayered, so it overrides Tailwind's @layer theme
 * defaults. Works without JS on first paint (SSR):
 * - no data-mode      -> follows the OS (prefers-color-scheme)
 * - data-mode="light" -> forced light, data-mode="dark" -> forced dark
 */
export function buildThemeCss(s: ThemeSettings, selector = ':root'): string {
  const light = colorVars(s.colors.light, 'light', s)
  const dark = colorVars(s.colors.dark, 'dark', s)
  return [
    block(selector, { ...sharedVars(s), ...light }),
    `@media (prefers-color-scheme: dark){${block(`${selector}:not([data-mode="light"])`, dark)}}`,
    block(`${selector}[data-mode="dark"]`, dark)
  ].join('\n')
}

/** Human-readable version for the export panel. */
export function prettyThemeCss(s: ThemeSettings): string {
  const fmt = (vars: Vars, indent = '  ') => Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join('\n')
  return `:root {\n${fmt(sharedVars(s))}\n\n  /* light */\n${fmt(colorVars(s.colors.light, 'light', s))}\n}\n\n:root[data-mode="dark"] {\n${fmt(colorVars(s.colors.dark, 'dark', s))}\n}\n`
}
