<script setup lang="ts">
import type { ButtonVariant } from '~/theme/types'

/**
 * Variant (solid / outline / text) is the *style*; the shape comes from the
 * theme's --radius-btn (`rounded-btn`), so any variant can be square or pill.
 */
const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  color?: 'primary' | 'accent' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  trailingIcon?: string
  loading?: boolean
  disabled?: boolean
  block?: boolean
  href?: string
}>(), { variant: 'solid', color: 'primary', size: 'md' })

const slots = useSlots()
const iconOnly = computed(() => !!props.icon && !slots.default)

const base = 'group items-center justify-center gap-2 whitespace-nowrap rounded-btn border-theme font-body leading-tight btn-label no-underline cursor-pointer transition focus-ring active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45 aria-busy:cursor-progress aria-busy:opacity-80'

const sizes = {
  sm: { text: 'text-sm', x: 'px-4', y: 'py-2', icon: 'p-2' },
  md: { text: 'text-sm', x: 'px-6', y: 'py-3', icon: 'p-3' },
  lg: { text: 'text-base', x: 'px-8', y: 'py-4', icon: 'p-4' }
}

const variants: Record<ButtonVariant, Record<'primary' | 'accent' | 'neutral', string>> = {
  solid: {
    primary: 'bg-primary text-on-primary shadow-sm not-disabled:hover:bg-primary-hover',
    accent: 'bg-accent text-on-accent shadow-sm not-disabled:hover:bg-accent-hover',
    neutral: 'bg-foreground text-background shadow-sm not-disabled:hover:bg-foreground/85'
  },
  outline: {
    primary: 'border-primary text-primary not-disabled:hover:bg-primary-soft',
    accent: 'border-accent text-accent not-disabled:hover:bg-accent-soft',
    neutral: 'border-foreground text-foreground not-disabled:hover:bg-surface-alt'
  },
  text: {
    primary: 'text-primary',
    accent: 'text-accent',
    neutral: 'text-foreground'
  }
}

const classes = computed(() => {
  const s = sizes[props.size]
  const padding = iconOnly.value ? s.icon : [s.y, props.variant === 'text' ? 'px-2' : s.x]
  // Touch screens get a 44px minimum target (Apple HIG); mouse users keep the compact sizes (WCAG minimum is 24px).
  const touch = iconOnly.value ? 'pointer-coarse:min-h-[44px] pointer-coarse:min-w-[44px]' : 'pointer-coarse:min-h-[44px]'
  // Only outline buttons show a border color; the others keep an invisible border so all variants share the same size.
  return [base, s.text, padding, touch, variants[props.variant][props.color], props.variant !== 'outline' && 'border-transparent', props.block ? 'flex w-full' : 'inline-flex']
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : 'button'"
    :class="classes"
    :disabled="disabled || loading || undefined"
    :aria-busy="loading || undefined"
  >
    <UiIcon v-if="loading" name="circle-notch" weight="bold" class="animate-spin" />
    <UiIcon v-else-if="icon" :name="icon" />
    <span
      v-if="$slots.default"
      :class="variant === 'text' && 'underline decoration-transparent underline-offset-[0.3em] transition group-hover:decoration-current'"
    >
      <slot />
    </span>
    <UiIcon v-if="trailingIcon && !loading" :name="trailingIcon" class="transition group-hover:translate-x-0.5" />
  </component>
</template>
