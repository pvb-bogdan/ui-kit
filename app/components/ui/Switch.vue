<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
  <label class="inline-flex min-h-6 cursor-pointer items-center gap-3 text-sm pointer-coarse:min-h-[44px]">
    <input v-model="model" type="checkbox" role="switch" class="peer sr-only">
    <span
      aria-hidden="true"
      class="relative h-[1.5em] w-[2.6em] shrink-0 rounded-full bg-border-strong transition peer-checked:bg-primary peer-focus-visible:ring-3 peer-focus-visible:ring-primary/35
             after:absolute after:left-[0.2em] after:top-[0.2em] after:size-[1.1em] after:rounded-full after:bg-surface after:shadow-sm after:transition after:content-['']
             peer-checked:after:translate-x-[1.1em]"
    />
    <slot />
  </label>
</template>
