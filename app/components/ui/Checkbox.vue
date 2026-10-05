<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
  <label class="inline-flex min-h-6 cursor-pointer items-center gap-3 text-sm pointer-coarse:min-h-[44px]">
    <input v-model="model" type="checkbox" class="size-[1.15em] cursor-pointer accent-primary focus-ring">
    <slot />
  </label>
</template>
