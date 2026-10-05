<script setup lang="ts">
const model = defineModel<string>()
const fieldAttrs = useFormFieldAttrs()
</script>

<template>
  <textarea v-model="model" v-bind="fieldAttrs" :class="inputClasses" class="min-h-28 resize-y" />
</template>
