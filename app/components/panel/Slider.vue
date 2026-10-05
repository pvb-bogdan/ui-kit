<script setup lang="ts">
const props = withDefaults(defineProps<{ label: string, min: number, max: number, step?: number, unit?: string, disabled?: boolean }>(), { step: 1, unit: '' })
const model = defineModel<number>({ required: true })
const display = computed(() => `${+model.value.toFixed(3)}${props.unit}`)
// Explicit for/id: a <label> wrapping an <output> would label the output, not the slider
const id = useId()
</script>

<template>
  <div class="grid gap-1.5" :class="disabled && 'opacity-40'">
    <span class="flex justify-between gap-2 text-ui-sm font-semibold">
      <label :for="id">{{ label }}</label>
      <output :for="id" class="font-medium tabular-nums text-ui-muted">{{ display }}</output>
    </span>
    <input :id="id" v-model.number="model" class="m-0 w-full cursor-pointer accent-ui-active disabled:cursor-not-allowed" type="range" :min="min" :max="max" :step="step" :disabled="disabled" :aria-valuetext="display">
  </div>
</template>
