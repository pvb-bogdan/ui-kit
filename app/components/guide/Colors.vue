<script setup lang="ts">
import { contrastRatio, onColor, wcagLevel } from '~/theme/color'

const { palette, resolvedMode } = useTheme()

const core = computed(() => [
  { name: 'Primary', cls: 'bg-primary', token: 'primary', hex: palette.value.primary, use: 'Main actions, links, focus' },
  { name: 'Accent', cls: 'bg-accent', token: 'accent', hex: palette.value.accent, use: 'Ornaments, eyebrows, stars' },
  { name: 'Background', cls: 'bg-background', token: 'background', hex: palette.value.bg, use: 'Page background' },
  { name: 'Surface', cls: 'bg-surface', token: 'surface', hex: palette.value.surface, use: 'Cards, inputs, modals' },
  { name: 'Foreground', cls: 'bg-foreground', token: 'foreground', hex: palette.value.text, use: 'Headings & body copy' },
  { name: 'Muted', cls: 'bg-muted', token: 'muted', hex: palette.value.muted, use: 'Secondary text, captions' },
  { name: 'Border', cls: 'bg-border', token: 'border', hex: palette.value.border, use: 'Dividers, outlines' }
])

const derived = [
  { name: 'Primary hover', cls: 'bg-primary-hover', token: 'primary-hover' },
  { name: 'Primary soft', cls: 'bg-primary-soft', token: 'primary-soft' },
  { name: 'Accent soft', cls: 'bg-accent-soft', token: 'accent-soft' },
  { name: 'Surface alt', cls: 'bg-surface-alt', token: 'surface-alt' },
  { name: 'Border strong', cls: 'bg-border-strong', token: 'border-strong' },
  { name: 'Success', cls: 'bg-success', token: 'success' },
  { name: 'Warning', cls: 'bg-warning', token: 'warning' },
  { name: 'Danger', cls: 'bg-danger', token: 'danger' },
  { name: 'Info', cls: 'bg-info', token: 'info' }
]

const pairs = computed(() => {
  const p = palette.value
  return [
    { label: 'Body text on background', fg: p.text, bg: p.bg },
    { label: 'Muted text on background', fg: p.muted, bg: p.bg },
    { label: 'Text on surface', fg: p.text, bg: p.surface },
    { label: 'Button label on primary', fg: onColor(p.primary), bg: p.primary },
    { label: 'Primary link on background', fg: p.primary, bg: p.bg },
    { label: 'Accent on background', fg: p.accent, bg: p.bg }
  ].map(x => ({ ...x, ratio: contrastRatio(x.fg, x.bg) }))
})
</script>

<template>
  <GuideSpec title="Core palette" :note="`Seven seed colors per mode — showing the ${resolvedMode} palette. Use them with any color utility: bg-primary, text-muted, border-border, ring-primary/30…`">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
      <div v-for="c in core" :key="c.token" class="overflow-hidden rounded-md border-theme bg-surface">
        <div class="heading flex h-22 items-end border-b-theme p-3 text-h4" :class="c.cls">
          <span :style="{ color: onColor(c.hex) }">Aa</span>
        </div>
        <div class="grid gap-0.5 p-3">
          <strong class="text-sm">{{ c.name }}</strong>
          <code class="font-mono text-xs">{{ c.hex }}</code>
          <code class="font-mono text-xs text-muted">{{ c.token }}</code>
          <span class="text-xs text-muted">{{ c.use }}</span>
        </div>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Derived & status colors" note="Derived tones are mixed in CSS from the seeds (color-mix), so they follow any theme automatically. Status colors are fixed across themes so a warning always looks like a warning.">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
      <div v-for="c in derived" :key="c.token" class="grid grid-cols-[auto_1fr] items-center gap-x-3">
        <span class="row-span-2 size-9 rounded-sm ring-1 ring-border ring-inset" :class="c.cls" />
        <span class="text-sm">{{ c.name }}</span>
        <code class="font-mono text-xs text-muted">{{ c.token }}</code>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Contrast check (WCAG 2.2)" note="Updates live as you change colors. Body text needs 4.5:1 (AA); large headings need 3:1.">
    <div class="overflow-hidden rounded-md border-theme">
      <div v-for="p in pairs" :key="p.label" class="grid grid-cols-[40px_1fr_auto] items-center gap-4 bg-surface px-3 py-2 not-first:border-t-theme sm:grid-cols-[48px_1fr_auto_84px]">
        <span class="heading grid h-9 place-items-center rounded-sm font-semibold ring-1 ring-border ring-inset" :style="{ background: p.bg, color: p.fg }">Aa</span>
        <span class="text-sm">{{ p.label }}</span>
        <code class="hidden font-mono text-xs sm:block">{{ p.ratio.toFixed(2) }}:1</code>
        <UiBadge class="justify-self-start" :color="p.ratio >= 4.5 ? 'success' : p.ratio >= 3 ? 'warning' : 'danger'">{{ wcagLevel(p.ratio) }}</UiBadge>
      </div>
    </div>
  </GuideSpec>
</template>
