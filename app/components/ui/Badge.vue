<script setup lang="ts">
type Color = 'primary' | 'accent' | 'success' | 'warning' | 'danger'
const props = withDefaults(defineProps<{ variant?: 'soft' | 'solid' | 'outline', color?: Color, icon?: string }>(), { variant: 'soft', color: 'primary' })

const styles: Record<'soft' | 'solid' | 'outline', Record<Color, string>> = {
  soft: {
    primary: 'bg-primary-soft text-primary',
    accent: 'bg-accent-soft text-accent',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    danger: 'bg-danger-soft text-danger'
  },
  solid: {
    primary: 'bg-primary text-on-primary',
    accent: 'bg-accent text-on-accent',
    success: 'bg-success text-background',
    warning: 'bg-warning text-background',
    danger: 'bg-danger text-background'
  },
  outline: {
    primary: 'text-primary ring-1 ring-inset ring-current',
    accent: 'text-accent ring-1 ring-inset ring-current',
    success: 'text-success ring-1 ring-inset ring-current',
    warning: 'text-warning ring-1 ring-inset ring-current',
    danger: 'text-danger ring-1 ring-inset ring-current'
  }
}
const classes = computed(() => styles[props.variant][props.color])
</script>

<template>
  <span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide" :class="classes">
    <UiIcon v-if="icon" :name="icon" size="1.1em" />
    <slot />
  </span>
</template>
