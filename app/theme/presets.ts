import type { ThemePreset, ThemeSettings } from './types'

/**
 * Five curated directions for an events ballroom (weddings, galas, private events).
 * Each one is a complete theme: palette (light + dark), font pair, shape, spacing, effects.
 * Keep it at ≤ 5 — more choice makes clients less confident, not more.
 */
export const PRESETS: ThemePreset[] = [
  {
    id: 'ivory-sage',
    name: 'Ivory & Sage',
    mood: 'Classic and timeless, soft greenery accents.',
    settings: {
      colors: {
        light: { bg: '#FAF7F2', surface: '#FFFFFF', text: '#2B2A26', muted: '#6B675D', border: '#E6DFD3', primary: '#566F58', accent: '#785A32' },
        dark: { bg: '#161916', surface: '#1F231F', text: '#EEEAE2', muted: '#A8A498', border: '#343A34', primary: '#9DB59F', accent: '#D4B48A' }
      },
      fonts: { heading: 'cormorant', body: 'jost' },
      type: { baseSize: 17, scale: 1.333, headingWeight: 500, headingUppercase: false, headingTracking: 0, lineHeight: 1.7 },
      shape: { radius: 8, buttonRadius: 8, buttonPill: true, borderWidth: 1 },
      spacing: { density: 1 },
      buttons: { uppercase: false, weight: 500 },
      effects: { shadow: 'soft', iconWeight: 'light', motion: 1 }
    }
  },
  {
    id: 'blush-rose',
    name: 'Blush & Rosé',
    mood: 'Romantic and warm, made for weddings.',
    settings: {
      colors: {
        light: { bg: '#FDF8F6', surface: '#FFFFFF', text: '#3A2A2E', muted: '#7A666A', border: '#F0E1DE', primary: '#A1505C', accent: '#7F5A3A' },
        dark: { bg: '#1D1618', surface: '#291F22', text: '#F5EAEC', muted: '#BBA6AA', border: '#3F3135', primary: '#E39AA4', accent: '#DDBB98' }
      },
      fonts: { heading: 'playfair', body: 'lato' },
      type: { baseSize: 16, scale: 1.25, headingWeight: 500, headingUppercase: false, headingTracking: 0, lineHeight: 1.65 },
      shape: { radius: 16, buttonRadius: 12, buttonPill: false, borderWidth: 1 },
      spacing: { density: 1 },
      buttons: { uppercase: false, weight: 700 },
      effects: { shadow: 'soft', iconWeight: 'regular', motion: 1 }
    }
  },
  {
    id: 'midnight-gala',
    name: 'Midnight Gala',
    mood: 'Black-tie evenings, champagne and gold.',
    settings: {
      colors: {
        light: { bg: '#F6F5F1', surface: '#FFFFFF', text: '#14182A', muted: '#5A5F72', border: '#DEDCD3', primary: '#1F2A4A', accent: '#7E5F2C' },
        dark: { bg: '#0D111E', surface: '#151A2C', text: '#EDE8DC', muted: '#9EA2B3', border: '#2A3049', primary: '#D1B178', accent: '#8A9BD0' }
      },
      fonts: { heading: 'cinzel', body: 'montserrat' },
      type: { baseSize: 16, scale: 1.25, headingWeight: 500, headingUppercase: true, headingTracking: 0.06, lineHeight: 1.7 },
      shape: { radius: 0, buttonRadius: 0, buttonPill: false, borderWidth: 1 },
      spacing: { density: 1.15 },
      buttons: { uppercase: true, weight: 500 },
      effects: { shadow: 'none', iconWeight: 'thin', motion: 1.4 }
    }
  },
  {
    id: 'emerald-deco',
    name: 'Emerald Deco',
    mood: 'Art-deco glamour, emerald and brass.',
    settings: {
      colors: {
        light: { bg: '#F5F3EE', surface: '#FFFFFF', text: '#1C2420', muted: '#5C6660', border: '#DCD8CC', primary: '#1F5A47', accent: '#7F6129' },
        dark: { bg: '#0E1714', surface: '#15211D', text: '#ECE6D8', muted: '#9EAAA3', border: '#26352F', primary: '#C9A961', accent: '#6FBFA0' }
      },
      fonts: { heading: 'marcellus', body: 'josefin' },
      type: { baseSize: 17, scale: 1.25, headingWeight: 400, headingUppercase: true, headingTracking: 0.04, lineHeight: 1.7 },
      shape: { radius: 4, buttonRadius: 2, buttonPill: false, borderWidth: 1 },
      spacing: { density: 1.1 },
      buttons: { uppercase: true, weight: 600 },
      effects: { shadow: 'soft', iconWeight: 'light', motion: 1.2 }
    }
  },
  {
    id: 'modern-noir',
    name: 'Modern Noir',
    mood: 'Minimal black and white, editorial.',
    settings: {
      colors: {
        light: { bg: '#FAFAFA', surface: '#FFFFFF', text: '#111111', muted: '#5F5F5F', border: '#E2E2E2', primary: '#111111', accent: '#6B5C43' },
        dark: { bg: '#0B0B0B', surface: '#161616', text: '#F2F2F2', muted: '#A3A3A3', border: '#2A2A2A', primary: '#F2F2F2', accent: '#C8B48E' }
      },
      fonts: { heading: 'bodoni', body: 'manrope' },
      type: { baseSize: 16, scale: 1.333, headingWeight: 500, headingUppercase: false, headingTracking: -0.01, lineHeight: 1.65 },
      shape: { radius: 2, buttonRadius: 0, buttonPill: true, borderWidth: 1 },
      spacing: { density: 1.1 },
      buttons: { uppercase: true, weight: 600 },
      effects: { shadow: 'none', iconWeight: 'regular', motion: 1 }
    }
  }
]

export const DEFAULT_PRESET_ID = 'ivory-sage'

export const getPreset = (id: string) => PRESETS.find(p => p.id === id) ?? PRESETS[0]!

export const settingsFromPreset = (id: string): ThemeSettings => ({
  presetId: getPreset(id).id,
  ...structuredClone(getPreset(id).settings)
})

/** Merge possibly-stale stored settings onto a preset so new fields always have values. */
export const normalizeSettings = (input: unknown): ThemeSettings => {
  let raw = (input && typeof input === 'object' ? input : {}) as Partial<ThemeSettings>
  // Stored data from a preset that no longer exists is discarded entirely.
  if (!PRESETS.some(p => p.id === raw.presetId)) raw = {}
  const base = settingsFromPreset(raw.presetId ?? DEFAULT_PRESET_ID)
  const merge = <T extends object>(a: T, b?: Partial<T>): T => ({ ...a, ...(b ?? {}) })
  return {
    presetId: base.presetId,
    colors: {
      light: merge(base.colors.light, raw.colors?.light),
      dark: merge(base.colors.dark, raw.colors?.dark)
    },
    fonts: merge(base.fonts, raw.fonts),
    type: merge(base.type, raw.type),
    shape: merge(base.shape, raw.shape),
    spacing: merge(base.spacing, raw.spacing),
    buttons: merge(base.buttons, raw.buttons),
    effects: merge(base.effects, raw.effects)
  }
}
