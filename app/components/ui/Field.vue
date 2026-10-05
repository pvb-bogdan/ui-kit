<script setup lang="ts">
/**
 * Label + control + hint/error. Put any Ui form control in the default slot —
 * it is wired automatically (id, aria-describedby, aria-invalid, required).
 */
const props = defineProps<{ label: string, hint?: string, error?: string, required?: boolean }>()

const id = useId()
const messageId = `${id}-message`
provide(FORM_FIELD, {
  id,
  describedBy: computed(() => (props.error || props.hint ? messageId : undefined)),
  invalid: computed(() => !!props.error),
  required: computed(() => !!props.required)
})
</script>

<template>
  <div class="grid content-start gap-2">
    <label :for="id" class="text-sm font-medium">
      {{ label }}<span v-if="required" class="text-danger" aria-hidden="true"> *</span>
    </label>
    <slot />
    <!-- Icon + text, so the error never relies on color alone -->
    <p v-if="error" :id="messageId" class="flex items-start gap-1.5 text-xs text-danger">
      <UiIcon name="warning-circle" weight="bold" size="1.2em" class="shrink-0" />
      {{ error }}
    </p>
    <p v-else-if="hint" :id="messageId" class="text-xs text-muted">{{ hint }}</p>
  </div>
</template>
