<script setup lang="ts">
import { prettyThemeCss } from '~/theme/tokens'

const { settings, exportSettings, importSettings } = useTheme()
const tabs = ['css', 'json', 'import'] as const
const tab = ref<typeof tabs[number]>('css')
const css = computed(() => prettyThemeCss(settings.value))
const json = computed(() => exportSettings())
const draft = ref('')
const status = ref<{ ok: boolean, msg: string } | null>(null)
const copied = ref(false)

const copy = async () => {
  await navigator.clipboard.writeText(tab.value === 'css' ? css.value : json.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
const doImport = () => {
  try {
    importSettings(draft.value)
    status.value = { ok: true, msg: 'Theme applied.' }
    draft.value = ''
  } catch {
    status.value = { ok: false, msg: 'That doesn’t look like valid theme JSON.' }
  }
}
</script>

<template>
  <GuideSpec title="Export & share" note="CSS = the runtime variables that override Tailwind's @theme defaults. JSON = the settings object; paste it into Import, or into presets.ts to turn a tweak into a preset.">
    <div class="overflow-hidden rounded-lg border-theme bg-surface">
      <div class="flex items-center justify-between border-b-theme px-3 py-2">
        <div class="flex gap-1" role="tablist">
          <button
            v-for="t in tabs"
            :key="t"
            role="tab"
            type="button"
            :aria-selected="tab === t"
            class="cursor-pointer rounded-sm px-3 py-2 text-xs font-semibold tracking-wider text-muted pointer-coarse:min-h-[44px] aria-selected:bg-primary-soft aria-selected:text-primary"
            @click="tab = t"
          >
            {{ t.toUpperCase() }}
          </button>
        </div>
        <UiButton v-if="tab !== 'import'" size="sm" variant="text" :icon="copied ? 'check' : 'copy'" @click="copy">
          {{ copied ? 'Copied' : 'Copy' }}
        </UiButton>
      </div>
      <pre v-if="tab !== 'import'" class="m-0 max-h-110 overflow-auto bg-surface-alt p-4 font-mono text-[0.78rem] leading-relaxed">{{ tab === 'css' ? css : json }}</pre>
      <div v-else class="grid gap-3 p-4">
        <textarea v-model="draft" class="min-h-50 w-full resize-y rounded-md border-theme border-border-strong bg-surface p-4 font-mono text-[0.78rem] focus-ring" placeholder="Paste theme JSON here…" spellcheck="false" />
        <div class="flex items-center gap-4">
          <UiButton size="sm" icon="upload-simple" :disabled="!draft.trim()" @click="doImport">Apply theme</UiButton>
          <span v-if="status" class="text-sm" :class="status.ok ? 'text-success' : 'text-danger'">{{ status.msg }}</span>
        </div>
      </div>
    </div>
  </GuideSpec>
</template>
