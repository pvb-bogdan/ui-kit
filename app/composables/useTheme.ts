import type { Mode, Palette, ResolvedMode, ThemeSettings } from '~/theme/types'
import { normalizeSettings, settingsFromPreset, getPreset } from '~/theme/presets'
import { buildThemeCss } from '~/theme/tokens'
import { googleFontsUrl } from '~/theme/fonts'

const SETTINGS_COOKIE = 'venue-theme'
const MODE_COOKIE = 'venue-mode'
const COOKIE_OPTS = { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' as const }

/**
 * Shared theme state. Any component can call `useTheme()`;
 * `useThemeProvider()` must be called once (app.vue) to persist + apply it.
 */
export function useTheme() {
  // When persistence is off nothing is ever written, so these cookies are simply absent.
  const settings = useState<ThemeSettings>('theme:settings', () =>
    normalizeSettings(useCookie(SETTINGS_COOKIE, COOKIE_OPTS).value)
  )
  const mode = useState<Mode>('theme:mode', () => {
    const v = useCookie<Mode>(MODE_COOKIE, COOKIE_OPTS).value
    return v === 'light' || v === 'dark' ? v : 'system'
  })
  const systemDark = useState('theme:system-dark', () => false)

  const resolvedMode = computed<ResolvedMode>(() =>
    mode.value === 'system' ? (systemDark.value ? 'dark' : 'light') : mode.value
  )

  /** Palette of whatever mode is currently on screen. */
  const palette = computed<Palette>(() => settings.value.colors[resolvedMode.value])

  const isModified = computed(() =>
    JSON.stringify(settings.value) !== JSON.stringify(settingsFromPreset(settings.value.presetId))
  )

  const applyPreset = (id: string) => { settings.value = settingsFromPreset(id) }
  const reset = () => applyPreset(settings.value.presetId)
  const importSettings = (json: string) => { settings.value = normalizeSettings(JSON.parse(json)) }
  const exportSettings = () => JSON.stringify(settings.value, null, 2)

  return {
    settings,
    mode,
    resolvedMode,
    palette,
    isModified,
    preset: computed(() => getPreset(settings.value.presetId)),
    applyPreset,
    reset,
    importSettings,
    exportSettings
  }
}

/**
 * @param persist  true  = remember the theme in a cookie (style guide / designer tool).
 *                 false = preview only: every full page load starts from the default
 *                         preset (client-side navigation keeps the choice in memory).
 *                         Use this on the sales/presentation site.
 */
export function useThemeProvider({ persist = true }: { persist?: boolean } = {}) {
  const { settings, mode } = useTheme()
  const systemDark = useState('theme:system-dark', () => false)

  if (persist) {
    const settingsCookie = useCookie(SETTINGS_COOKIE, COOKIE_OPTS)
    const modeCookie = useCookie<Mode>(MODE_COOKIE, COOKIE_OPTS)
    watch(settings, v => { settingsCookie.value = v as never }, { deep: true })
    watch(mode, v => { modeCookie.value = v })
  }

  // After hydration: the server can't know the OS preference (CSS handles first paint).
  onNuxtReady(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = mq.matches
    mq.addEventListener('change', e => { systemDark.value = e.matches })
  })

  useHead({
    htmlAttrs: { 'data-mode': computed(() => (mode.value === 'system' ? undefined : mode.value)) },
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { key: 'theme-fonts', rel: 'stylesheet', href: computed(() => googleFontsUrl([settings.value.fonts.heading, settings.value.fonts.body])) }
    ],
    style: [{ key: 'theme-vars', innerHTML: computed(() => buildThemeCss(settings.value)) }]
  })
}
