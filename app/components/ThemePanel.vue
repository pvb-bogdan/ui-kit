<script setup lang="ts">
import type { IconWeight, Mode, ResolvedMode, ShadowLevel } from '~/theme/types'
import { PRESETS } from '~/theme/presets'
import { FONTS } from '~/theme/fonts'
import { contrastRatio, onColor } from '~/theme/color'

/**
 * Theme Studio — internal designer tool (style guide only, never shipped to the client).
 * Edits every token. The client-facing panel is <ThemeSwitcher>.
 */
defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { settings, mode, resolvedMode, isModified, applyPreset, reset } = useTheme()

// Which palette the color pickers edit. Follows what's on screen unless changed.
const editMode = ref<ResolvedMode>(resolvedMode.value)
watch(resolvedMode, v => { editMode.value = v })
const pal = computed(() => settings.value.colors[editMode.value])

const contrastWarn = computed(() => {
  const p = pal.value
  const checks = [
    { label: 'Text on primary', r: contrastRatio(p.primary, onColor(p.primary)) },
    { label: 'Body text', r: contrastRatio(p.text, p.bg) },
    { label: 'Muted text', r: contrastRatio(p.muted, p.bg) }
  ]
  return checks.filter(c => c.r < 4.5)
})

const modeOptions: { label: string, value: Mode, icon: string }[] = [
  { label: 'Light', value: 'light', icon: 'sun' },
  { label: 'Dark', value: 'dark', icon: 'moon' },
  { label: 'Auto', value: 'system', icon: 'circle-half' }
]
const headingFonts = FONTS.filter(f => f.role !== 'body').map(f => ({ label: f.label, value: f.id }))
const bodyFonts = FONTS.filter(f => f.role !== 'heading').map(f => ({ label: f.label, value: f.id }))
const scales = [
  { label: 'Minor third · 1.2 (subtle)', value: 1.2 },
  { label: 'Major third · 1.25', value: 1.25 },
  { label: 'Perfect fourth · 1.333', value: 1.333 },
  { label: 'Augmented fourth · 1.414 (dramatic)', value: 1.414 }
]
const weights = [300, 400, 500, 600, 700].map(w => ({ label: String(w), value: w }))
const shadows: { label: string, value: ShadowLevel }[] = [
  { label: 'Flat', value: 'none' }, { label: 'Soft', value: 'soft' }, { label: 'Lifted', value: 'lifted' }
]
const iconWeights: { label: string, value: IconWeight }[] = [
  { label: 'Thin', value: 'thin' }, { label: 'Light', value: 'light' }, { label: 'Regular', value: 'regular' }, { label: 'Bold', value: 'bold' }
]

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <!-- [--spacing:0.25rem] pins Tailwind spacing so the panel never scales with the theme density -->
  <aside
    class="fixed inset-y-0 right-0 z-60 flex w-[min(360px,100vw)] flex-col border-l border-ui-border bg-ui-bg font-ui text-ui leading-[1.45] tracking-normal normal-case text-ui-fg transition-[transform,box-shadow] duration-[260ms] ease-theme [--spacing:0.25rem] [&_:focus-visible]:outline-ui-focus"
    :class="open ? 'translate-x-0 shadow-[-24px_0_48px_-24px_rgb(0_0_0/0.25)]' : 'translate-x-full'"
    aria-label="Theme Studio"
    :inert="!open || undefined"
  >
    <header class="flex items-center justify-between border-b border-ui-border px-4 pt-4 pb-3">
      <div>
        <strong class="text-ui-lg">Theme Studio
          <span class="ml-1.5 inline-block rounded-full bg-ui-subtle px-1.5 py-px align-[2px] text-[10.5px] font-semibold uppercase tracking-wide text-ui-muted">Designer</span>
        </strong>
        <small class="block text-ui-xs text-ui-muted">{{ isModified ? 'Customised' : 'Preset' }} · {{ PRESETS.find(p => p.id === settings.presetId)?.name }}</small>
      </div>
      <button class="grid size-8 cursor-pointer place-items-center rounded-ui border border-ui-border pointer-coarse:size-11 text-[16px] hover:bg-ui-subtle" type="button" aria-label="Close panel" @click="emit('close')">
        <Icon name="ph:x" />
      </button>
    </header>

    <div class="flex-1 overflow-y-auto overscroll-contain pb-4">
      <!-- Presets -->
      <section class="grid gap-2 border-b border-ui-border p-4">
        <span class="text-ui-sm font-semibold">Theme</span>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="p in PRESETS"
            :key="p.id"
            type="button"
            class="grid cursor-pointer gap-2 rounded-[10px] border border-ui-border p-2.5 text-left hover:border-ui-muted aria-pressed:border-ui-active aria-pressed:shadow-[inset_0_0_0_1px_var(--color-ui-active)]"
            :aria-pressed="p.id === settings.presetId"
            @click="applyPreset(p.id)"
          >
            <span class="flex -space-x-1.5">
              <i
                v-for="c in [p.settings.colors.light.bg, p.settings.colors.light.primary, p.settings.colors.light.accent, p.settings.colors.dark.bg]"
                :key="c"
                class="size-5 rounded-full shadow-[0_0_0_2px_var(--color-ui-bg),inset_0_0_0_1px_rgb(0_0_0/0.1)]"
                :style="{ background: c }"
              />
            </span>
            <span class="text-ui-sm font-semibold">{{ p.name }}</span>
          </button>
        </div>
      </section>

      <section class="border-b border-ui-border p-4">
        <PanelSegmented v-model="mode" label="Appearance" :options="modeOptions" />
      </section>

      <PanelGroup title="Colors" icon="palette" open>
        <PanelSegmented
          v-model="editMode"
          label="Editing palette"
          :options="[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]"
        />
        <PanelColor v-model="pal.primary" label="Primary" hint="Buttons, links, highlights" />
        <PanelColor v-model="pal.accent" label="Accent" hint="Ornaments, eyebrows, details" />
        <PanelColor v-model="pal.bg" label="Background" />
        <PanelColor v-model="pal.surface" label="Surface" hint="Cards, inputs" />
        <PanelColor v-model="pal.text" label="Text" />
        <PanelColor v-model="pal.muted" label="Muted text" />
        <PanelColor v-model="pal.border" label="Border" />
        <div v-if="contrastWarn.length" class="flex gap-2 rounded-ui bg-[#fef3c7] p-2.5 text-ui-sm text-[#78350f]" role="status">
          <Icon name="ph:warning" class="shrink-0 text-[16px]" />
          <span>Low contrast: {{ contrastWarn.map(c => `${c.label} (${c.r.toFixed(1)}:1)`).join(', ') }}. Aim for 4.5:1.</span>
        </div>
      </PanelGroup>

      <PanelGroup title="Typography" icon="text-aa" open>
        <PanelSelect v-model="settings.fonts.heading" label="Heading font" :options="headingFonts" />
        <PanelSelect v-model="settings.fonts.body" label="Body font" :options="bodyFonts" />
        <PanelSlider v-model="settings.type.baseSize" label="Base size" :min="14" :max="20" unit="px" />
        <PanelSelect v-model="settings.type.scale" label="Type scale" :options="scales" />
        <PanelSelect v-model="settings.type.headingWeight" label="Heading weight" :options="weights" />
        <PanelSlider v-model="settings.type.headingTracking" label="Heading letter-spacing" :min="-0.03" :max="0.15" :step="0.01" unit="em" />
        <PanelSlider v-model="settings.type.lineHeight" label="Body line-height" :min="1.4" :max="1.9" :step="0.05" />
        <PanelToggle v-model="settings.type.headingUppercase" label="Uppercase headings" />
      </PanelGroup>

      <PanelGroup title="Shape" icon="square-half" open>
        <PanelSlider v-model="settings.shape.radius" label="Corner radius" :min="0" :max="28" unit="px" />
        <PanelToggle v-model="settings.shape.buttonPill" label="Pill buttons" hint="Fully rounded ends" />
        <PanelSlider v-model="settings.shape.buttonRadius" label="Button radius" :min="0" :max="24" unit="px" :disabled="settings.shape.buttonPill" />
        <PanelSegmented v-model="settings.shape.borderWidth" label="Border width" :options="[{ label: '1px', value: 1 }, { label: '2px', value: 2 }]" />
      </PanelGroup>

      <PanelGroup title="Spacing" icon="arrows-out-line-horizontal">
        <PanelSlider v-model="settings.spacing.density" label="Density multiplier" :min="0.75" :max="1.35" :step="0.05" unit="×" />
      </PanelGroup>

      <PanelGroup title="Buttons" icon="cursor-click">
        <PanelToggle v-model="settings.buttons.uppercase" label="Uppercase labels" />
        <PanelSelect v-model="settings.buttons.weight" label="Label weight" :options="weights.filter(w => w.value >= 400)" />
      </PanelGroup>

      <PanelGroup title="Effects" icon="sparkle">
        <PanelSegmented v-model="settings.effects.shadow" label="Shadows" :options="shadows" />
        <PanelSegmented v-model="settings.effects.iconWeight" label="Icon weight" :options="iconWeights" />
        <PanelSlider v-model="settings.effects.motion" label="Animation speed" :min="0" :max="2" :step="0.1" unit="×" />
      </PanelGroup>
    </div>

    <footer class="flex gap-2 border-t border-ui-border px-4 py-3">
      <button type="button" class="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-ui border border-ui-border font-medium hover:bg-ui-subtle disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent" :disabled="!isModified" @click="reset">
        <Icon name="ph:arrow-counter-clockwise" /> Reset
      </button>
      <a href="#tokens" class="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-ui border border-ui-active bg-ui-active font-medium text-ui-on-active no-underline hover:opacity-90" @click="emit('close')">
        <Icon name="ph:code" /> Export tokens
      </a>
    </footer>
  </aside>
</template>
