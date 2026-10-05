import type { ComputedRef, InjectionKey } from 'vue'

/**
 * <UiField> provides this so the control inside it gets the right id,
 * aria-describedby (hint/error), aria-invalid and required — no manual wiring.
 */
export interface FormFieldContext {
  id: string
  describedBy: ComputedRef<string | undefined>
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
}

export const FORM_FIELD: InjectionKey<FormFieldContext> = Symbol('form-field')

export const useFormField = () => inject(FORM_FIELD, null)

/** Attributes a control should bind: `v-bind="fieldAttrs"` */
export const useFormFieldAttrs = () => {
  const field = useFormField()
  return computed(() => field
    ? {
        'id': field.id,
        'aria-describedby': field.describedBy.value,
        'aria-invalid': field.invalid.value || undefined,
        'required': field.required.value || undefined
      }
    : {})
}
