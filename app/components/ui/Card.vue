<script setup lang="ts">
/** Surface container. Add padding where you use it (`<UiCard class="p-6">`). */
withDefaults(defineProps<{ as?: string, interactive?: boolean }>(), { as: 'div' })
</script>

<template>
  <component
    :is="as"
    class="overflow-hidden rounded-lg border-theme bg-surface shadow-md transition"
    :class="interactive && 'hover:-translate-y-0.5 hover:shadow-lg'"
  >
    <slot />
  </component>
</template>
