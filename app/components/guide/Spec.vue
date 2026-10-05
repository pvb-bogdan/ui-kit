<script setup lang="ts">
/** Small labelled block used throughout the guide: title + optional note + demo area. */
defineProps<{ title: string, note?: string }>()
</script>

<template>
  <div class="grid gap-4">
    <div class="grid max-w-3xl gap-1">
      <h3 class="font-body text-base font-semibold normal-case tracking-normal">{{ title }}</h3>
      <p v-if="note" class="text-sm text-muted">{{ note }}</p>
    </div>
    <slot />
  </div>
</template>
