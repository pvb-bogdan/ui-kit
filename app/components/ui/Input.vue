<script setup lang="ts">
const model = defineModel<string | number>()
const fieldAttrs = useFormFieldAttrs()
</script>

<template>
  <input v-model="model" v-bind="fieldAttrs" :class="inputClasses">
</template>
