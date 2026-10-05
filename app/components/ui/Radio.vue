<script setup lang="ts">
defineProps<{ value: string, name?: string }>()
const model = defineModel<string>()
</script>

<template>
  <label class="inline-flex min-h-6 cursor-pointer items-center gap-3 text-sm pointer-coarse:min-h-[44px]">
    <input v-model="model" type="radio" :value="value" :name="name" class="size-[1.15em] cursor-pointer accent-primary focus-ring">
    <slot />
  </label>
</template>
