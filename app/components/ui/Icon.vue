<script setup lang="ts">
/**
 * Theme-aware icon. Pass the base Phosphor name ("heart", "map-pin") and the
 * weight (thin / light / regular / bold) comes from the active theme.
 * Browse names: https://icones.js.org/collection/ph
 */
const props = defineProps<{ name: string, size?: string | number, weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' }>()
const { settings } = useTheme()

const fullName = computed(() => {
  const w = props.weight ?? settings.value.effects.iconWeight
  return `ph:${props.name}${w === 'regular' ? '' : `-${w}`}`
})
const size = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1.25em'))
</script>

<template>
  <Icon :name="fullName" :size="size" />
</template>
