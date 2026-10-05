<script setup lang="ts" generic="T extends string | number">
defineProps<{ label: string, options: { label: string, value: T }[] }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <label class="grid gap-1.5">
    <span class="text-ui-sm font-semibold">{{ label }}</span>
    <select v-model="model" class="h-[34px] w-full rounded-ui border border-ui-border bg-ui-bg px-2.5 text-ui text-ui-fg">
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
  </label>
</template>
