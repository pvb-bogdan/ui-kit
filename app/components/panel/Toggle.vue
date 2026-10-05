<script setup lang="ts">
defineProps<{ label: string, hint?: string }>()
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="relative flex cursor-pointer items-center justify-between gap-3">
    <span>
      <span class="block text-ui-sm font-semibold">{{ label }}</span>
      <small v-if="hint" class="block text-ui-xs text-ui-muted">{{ hint }}</small>
    </span>
    <input v-model="model" type="checkbox" role="switch" class="peer sr-only">
    <span
      aria-hidden="true"
      class="relative h-5 w-[34px] shrink-0 rounded-full bg-ui-border transition-colors peer-checked:bg-ui-active peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ui-focus
             after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-[0_1px_2px_rgb(0_0_0/0.3)] after:transition-transform after:content-['']
             peer-checked:after:translate-x-3.5 peer-checked:after:bg-ui-on-active"
    />
  </label>
</template>
