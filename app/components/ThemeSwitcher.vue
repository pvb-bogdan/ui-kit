<script setup lang="ts">
import { PRESETS } from '~/theme/presets'

/**
 * Client theme switcher — the ONLY panel shipped on the sales/presentation site.
 * The client can browse the 5 themes and light/dark. Nothing else, nothing saved:
 * they tell us which theme they like and we build their site with it.
 *
 * Uses only the fixed `ui-*` colors from main.css and pins --spacing, so it looks
 * the same whatever theme is active. No dependency on ThemePanel.
 */
const open = defineModel<boolean>('open', { default: false })
const { settings, resolvedMode, mode, preset, applyPreset } = useTheme()

const setMode = (m: 'light' | 'dark') => { mode.value = m }

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open.value) open.value = false }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="font-ui text-[14px] leading-[1.45] tracking-normal normal-case [--spacing:0.25rem] [&_:focus-visible]:outline-ui-focus">
    <!-- Edge tab -->
    <button
      class="fixed top-1/2 right-0 z-50 flex cursor-pointer flex-col items-center gap-2 rounded-l-[10px] bg-ui-active px-[9px] py-3.5 text-ui-on-active shadow-[-4px_4px_20px_rgb(0_0_0/0.18)] transition-[transform,padding] duration-[240ms] ease-theme hover:pr-[13px] pointer-coarse:px-[13px]"
      :class="open ? 'translate-x-[110%] -translate-y-1/2' : '-translate-y-1/2'"
      type="button"
      aria-controls="theme-switcher"
      :aria-expanded="open"
      @click="open = true"
    >
      <Icon name="ph:palette" class="text-[18px]" />
      <span class="rotate-180 text-ui-sm font-semibold tracking-[0.08em] uppercase [writing-mode:vertical-rl]">Themes</span>
    </button>

    <div v-if="open" class="fixed inset-0 z-54 bg-black/30 min-[900px]:bg-transparent" aria-hidden="true" @click="open = false" />

    <aside
      id="theme-switcher"
      class="fixed inset-y-0 right-0 z-55 flex w-[min(340px,100vw)] flex-col border-l border-ui-border bg-ui-bg text-ui-fg transition-[transform,box-shadow] duration-[280ms] ease-theme"
      :class="open ? 'translate-x-0 shadow-[-24px_0_48px_-24px_rgb(0_0_0/0.3)]' : 'translate-x-full'"
      aria-label="Preview themes"
      :inert="!open || undefined"
    >
      <header class="flex items-start justify-between gap-3 border-b border-ui-border px-5 pt-5 pb-4">
        <div>
          <strong class="text-[16px]">Preview a style</strong>
          <p class="mt-1 text-ui text-ui-muted">See how your venue could look. Switch freely, nothing is saved.</p>
        </div>
        <button class="grid size-8 shrink-0 cursor-pointer place-items-center pointer-coarse:size-11 rounded-ui border border-ui-border text-[16px] hover:bg-ui-subtle" type="button" aria-label="Close" @click="open = false">
          <Icon name="ph:x" />
        </button>
      </header>

      <div class="grid flex-1 content-start gap-4 overflow-y-auto overscroll-contain px-5 py-4">
        <div class="grid grid-cols-2 gap-1 rounded-[10px] bg-ui-subtle p-1" role="radiogroup" aria-label="Appearance">
          <button
            v-for="m in (['light', 'dark'] as const)"
            :key="m"
            type="button"
            role="radio"
            :aria-checked="resolvedMode === m"
            class="inline-flex h-9 cursor-pointer items-center pointer-coarse:h-11 justify-center gap-1.5 rounded-[7px] font-medium text-ui-muted hover:text-ui-fg aria-checked:bg-ui-bg aria-checked:text-ui-fg aria-checked:shadow-ui"
            @click="setMode(m)"
          >
            <Icon :name="m === 'light' ? 'ph:sun' : 'ph:moon'" />
            {{ m === 'light' ? 'Light' : 'Dark' }}
          </button>
        </div>

        <div class="grid gap-2" role="radiogroup" aria-label="Theme">
          <button
            v-for="p in PRESETS"
            :key="p.id"
            type="button"
            role="radio"
            :aria-checked="p.id === settings.presetId"
            class="flex cursor-pointer items-center gap-3 rounded-[12px] border border-ui-border p-2.5 text-left transition-[border-color,box-shadow] hover:border-ui-muted aria-checked:border-ui-active aria-checked:shadow-[inset_0_0_0_1px_var(--color-ui-active)]"
            @click="applyPreset(p.id)"
          >
            <span
              class="relative flex h-12 w-16 shrink-0 items-end gap-1 p-2 shadow-[inset_0_0_0_1px_rgb(127_127_127/0.25)]"
              :style="{ background: p.settings.colors[resolvedMode].bg, borderRadius: `${Math.min(p.settings.shape.radius, 10)}px` }"
            >
              <i class="size-3.5 rounded-full" :style="{ background: p.settings.colors[resolvedMode].primary }" />
              <i class="size-3.5 rounded-full" :style="{ background: p.settings.colors[resolvedMode].accent }" />
              <b class="absolute top-[9px] left-2 h-[3px] w-7.5 rounded-[2px] opacity-80" :style="{ background: p.settings.colors[resolvedMode].text }" />
            </span>
            <span class="grid min-w-0 flex-1 gap-0.5">
              <span class="font-semibold">{{ p.name }}</span>
              <span class="text-ui-sm text-ui-muted">{{ p.mood }}</span>
            </span>
            <Icon v-if="p.id === settings.presetId" name="ph:check-circle-fill" class="shrink-0 text-[20px] text-ui-active" />
          </button>
        </div>
      </div>

      <footer class="grid gap-0.5 border-t border-ui-border px-5 pt-4 pb-5">
        <span class="text-ui-sm text-ui-muted">You're viewing</span>
        <strong class="text-ui-lg">{{ preset.name }} · {{ resolvedMode === 'dark' ? 'Dark' : 'Light' }}</strong>
        <p class="mt-1.5 text-[12.5px] text-ui-muted">Like it? Tell us the name and we'll build your site in this style.</p>
      </footer>
    </aside>
  </div>
</template>
