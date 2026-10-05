<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const model = defineModel<string>()
const fieldAttrs = useFormFieldAttrs()
</script>

<template>
  <div class="relative">
    <select v-model="model" v-bind="{ ...fieldAttrs, ...$attrs }" :class="inputClasses" class="cursor-pointer appearance-none pr-12">
      <slot />
    </select>
    <UiIcon name="caret-down" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
  </div>
</template>
