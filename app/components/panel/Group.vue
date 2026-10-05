<script setup lang="ts">
defineProps<{ title: string, icon: string, open?: boolean }>()
</script>

<template>
  <details class="group border-b border-ui-border" :open="open">
    <summary class="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3.5 text-ui font-semibold [&::-webkit-details-marker]:hidden">
      <Icon :name="`ph:${icon}`" class="text-[16px] text-ui-muted" />
      <span>{{ title }}</span>
      <Icon name="ph:caret-down" class="ml-auto text-ui-muted transition-transform duration-200 group-open:rotate-180" />
    </summary>
    <div class="grid gap-3.5 px-4 pb-4">
      <slot />
    </div>
  </details>
</template>
