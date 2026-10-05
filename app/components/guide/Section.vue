<script setup lang="ts">
defineProps<{ id: string, index: string, title: string, intro?: string }>()
</script>

<template>
  <section :id="id" class="grid gap-12 border-t-theme py-12">
    <header class="grid max-w-2xl gap-2">
      <span class="eyebrow">{{ index }}</span>
      <h2 class="text-h3">{{ title }}</h2>
      <p v-if="intro" class="text-muted">{{ intro }}</p>
    </header>
    <slot />
  </section>
</template>
