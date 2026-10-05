<script setup lang="ts">
import { isHex } from '~/theme/color'

defineProps<{ label: string, hint?: string }>()
const model = defineModel<string>({ required: true })
const draft = ref(model.value)
watch(model, v => { draft.value = v })
const commit = () => {
  const v = draft.value.startsWith('#') ? draft.value : `#${draft.value}`
  if (isHex(v)) model.value = v.toUpperCase()
  else draft.value = model.value
}
</script>

<template>
  <div class="flex items-center gap-2.5">
    <label class="relative size-[34px] shrink-0 cursor-pointer overflow-hidden rounded-ui shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-ui-focus" :style="{ background: model }">
      <input v-model="model" type="color" :aria-label="label" class="absolute -inset-2 size-[50px] cursor-pointer opacity-0">
    </label>
    <div class="min-w-0 flex-1">
      <span class="block text-ui-sm font-semibold">{{ label }}</span>
      <small v-if="hint" class="block text-ui-xs text-ui-muted">{{ hint }}</small>
    </div>
    <input
      v-model="draft"
      class="h-[30px] w-[82px] rounded-[7px] border border-ui-border bg-ui-bg px-2 font-mono text-ui-sm uppercase text-ui-fg"
      maxlength="7"
      spellcheck="false"
      :aria-label="`${label} hex`"
      @change="commit"
      @keydown.enter="commit"
    >
  </div>
</template>
