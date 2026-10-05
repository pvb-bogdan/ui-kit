<script setup lang="ts">
import { SPACE_STEPS } from '~/theme/tokens'

const { settings } = useTheme()
const radii = ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-btn', 'rounded-full']
const shadows = ['shadow-sm', 'shadow-md', 'shadow-lg']
// Full class names so Tailwind's scanner finds them
const widths: Record<number, string> = { 1: 'w-1', 2: 'w-2', 3: 'w-3', 4: 'w-4', 6: 'w-6', 8: 'w-8', 12: 'w-12', 16: 'w-16', 24: 'w-24' }
const space = computed(() => SPACE_STEPS.map(n => ({ n, cls: widths[n], px: Math.round(n * 4 * settings.value.spacing.density) })))
</script>

<template>
  <GuideSpec title="Radius" :note="`Base radius ${settings.shape.radius}px (rounded-md); sm and lg are derived from it. Buttons use rounded-btn${settings.shape.buttonPill ? ' (pill on)' : ''}.`">
    <div class="flex flex-wrap gap-6">
      <div v-for="r in radii" :key="r" class="grid justify-items-center gap-2">
        <span class="h-18 w-24 border-theme border-primary bg-primary-soft" :class="r" />
        <code class="font-mono text-xs text-muted">{{ r }}</code>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Spacing scale" :note="`Tailwind's normal scale (p-4, gap-6, mt-12…) multiplied by the theme density (${settings.spacing.density}×). Just use regular spacing utilities.`">
    <div class="grid gap-2">
      <div v-for="s in space" :key="s.n" class="grid grid-cols-[72px_1fr_56px] items-center gap-4">
        <code class="font-mono text-xs text-muted">{{ s.n }}</code>
        <span class="h-3.5 max-w-full rounded-[3px] bg-accent" :class="s.cls" />
        <span class="text-sm text-muted">{{ s.px }}px</span>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Elevation" :note="`Shadow style: ${settings.effects.shadow}. In dark mode shadows get stronger, since light shadows disappear on dark backgrounds.`">
    <div class="flex flex-wrap gap-6">
      <div v-for="s in shadows" :key="s" class="grid h-28 w-44 place-items-center rounded-md border border-border/50 bg-surface" :class="s">
        <code class="font-mono text-xs text-muted">{{ s }}</code>
      </div>
    </div>
  </GuideSpec>
</template>
