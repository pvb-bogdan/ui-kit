<script setup lang="ts">
type Tone = 'info' | 'success' | 'warning' | 'danger'
const props = withDefaults(defineProps<{ tone?: Tone, title?: string, icon?: string }>(), { tone: 'info' })

const tones: Record<Tone, { box: string, icon: string, defaultIcon: string }> = {
  info: { box: 'bg-info-soft border-info/30', icon: 'text-info', defaultIcon: 'info' },
  success: { box: 'bg-success-soft border-success/30', icon: 'text-success', defaultIcon: 'check-circle' },
  warning: { box: 'bg-warning-soft border-warning/30', icon: 'text-warning', defaultIcon: 'warning' },
  danger: { box: 'bg-danger-soft border-danger/30', icon: 'text-danger', defaultIcon: 'x-circle' }
}
const t = computed(() => tones[props.tone])
</script>

<template>
  <div class="flex gap-3 rounded-md border-theme p-4 text-sm text-foreground" :class="t.box" :role="tone === 'danger' ? 'alert' : 'status'">
    <UiIcon :name="icon ?? t.defaultIcon" size="1.35em" class="mt-px shrink-0" :class="t.icon" />
    <div>
      <p v-if="title" class="mb-0.5 font-semibold">{{ title }}</p>
      <slot />
    </div>
  </div>
</template>
