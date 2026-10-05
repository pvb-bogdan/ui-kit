<script setup lang="ts">
defineProps<{ items: { title: string, content: string }[], defaultOpen?: number }>()
</script>

<template>
  <div class="border-t-theme">
    <details v-for="(item, i) in items" :key="item.title" class="group border-b-theme" :open="i === defaultOpen">
      <summary class="heading flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-h5 focus-ring [&::-webkit-details-marker]:hidden">
        {{ item.title }}
        <UiIcon name="plus" class="shrink-0 text-accent transition group-open:rotate-45" />
      </summary>
      <p class="pb-4 text-muted">{{ item.content }}</p>
    </details>
  </div>
</template>
