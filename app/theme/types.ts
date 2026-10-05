/**
 * Theme model — framework-agnostic.
 * Everything in /app/theme is plain TypeScript so it can be copied as-is
 * into the venue website (or any other stack) together with the side panel.
 */

export type Mode = 'light' | 'dark' | 'system'
export type ResolvedMode = 'light' | 'dark'

/** Seed colors per mode. Everything else (hover, soft, rings…) is derived in CSS. */
export interface Palette {
  bg: string
  surface: string
  text: string
  muted: string
  border: string
  primary: string
  accent: string
}

export type ButtonVariant = 'solid' | 'outline' | 'text'
export type ShadowLevel = 'none' | 'soft' | 'lifted'
export type IconWeight = 'thin' | 'light' | 'regular' | 'bold'

export interface ThemeSettings {
  /** Preset the settings started from — used for "Reset" and the "modified" badge. */
  presetId: string
  colors: Record<ResolvedMode, Palette>
  fonts: {
    heading: string // FontId
    body: string // FontId
  }
  type: {
    baseSize: number // px, body text
    scale: number // modular scale ratio
    headingWeight: number
    headingUppercase: boolean
    headingTracking: number // em
    lineHeight: number
  }
  shape: {
    radius: number // px, cards / inputs / media
    buttonRadius: number // px
    buttonPill: boolean
    borderWidth: number // px
  }
  spacing: {
    density: number // multiplier for the whole spacing scale
  }
  buttons: {
    uppercase: boolean
    weight: number
  }
  effects: {
    shadow: ShadowLevel
    iconWeight: IconWeight
    motion: number // 0 = off, 1 = default, 2 = slow
  }
}

export interface ThemePreset {
  id: string
  name: string
  mood: string
  settings: Omit<ThemeSettings, 'presetId'>
}
