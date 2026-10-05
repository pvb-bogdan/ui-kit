<script setup lang="ts" generic="T extends string | number">
defineProps<{ label?: string, options: { label: string, value: T, icon?: string }[] }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="grid gap-1.5">
    <span v-if="label" class="text-ui-sm font-semibold">{{ label }}</span>
    <div class="flex gap-0.5 rounded-[9px] bg-ui-subtle p-[3px]" role="radiogroup" :aria-label="label">
      <button
        v-for="o in options"
        :key="o.value"
        type="button"
        role="radio"
        :aria-checked="model === o.value"
        class="inline-flex min-h-[30px] flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[7px] px-1.5 py-1 text-ui-sm font-medium text-ui-muted hover:text-ui-fg aria-checked:bg-ui-bg aria-checked:text-ui-fg aria-checked:shadow-ui"
        @click="model = o.value"
      >
        <Icon v-if="o.icon" :name="`ph:${o.icon}`" />
        <span>{{ o.label }}</span>
      </button>
    </div>
  </div>
</template>
