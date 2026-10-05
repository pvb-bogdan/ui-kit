<script setup lang="ts">
const form = reactive({ name: '', email: '', date: '', guests: '40', type: 'Wedding', message: '', setup: 'banquet', flexible: false, brochure: true })

const submitted = ref(false)
const sending = ref(false)
const sent = ref(false)
const summary = ref<HTMLElement>()

// Errors appear after the first submit, then update live as fields are corrected.
const errors = computed(() => {
  if (!submitted.value) return {} as Record<string, string>
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Enter your full name.'
  if (!form.email.trim()) e.email = 'Enter your email so we can reply.'
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter an email like name@example.com.'
  if (!form.date) e.date = 'Choose a date — an approximate one is fine.'
  if (Number(form.guests) < 50) e.guests = 'Events start at 50 guests. Enter 50 or more.'
  return e
})
const errorList = computed(() => Object.entries(errors.value))

const focusField = (key: string) =>
  document.querySelector<HTMLElement>(`[data-field="${key}"] input, [data-field="${key}"] select`)?.focus()

const submit = async () => {
  submitted.value = true
  sent.value = false
  if (errorList.value.length) {
    await nextTick()
    summary.value?.focus() // move focus to the summary after a failed submit
    return
  }
  sending.value = true
  await new Promise(r => setTimeout(r, 1200))
  sending.value = false
  sent.value = true
  submitted.value = false
}
</script>

<template>
  <GuideSpec title="Event inquiry form" note="Try it: press “Send inquiry” with empty fields. Errors appear under each field (linked with aria-describedby, icon + text, not color alone) and focus moves to a summary that links to each problem. Labels are always visible and required fields are marked.">
    <UiCard as="form" class="grid max-w-3xl gap-6 p-6 sm:p-8" novalidate @submit.prevent="submit">
      <div
        v-if="errorList.length"
        ref="summary"
        tabindex="-1"
        role="alert"
        aria-labelledby="form-errors-title"
        class="rounded-md border-theme border-danger/40 bg-danger-soft p-4 text-sm focus-ring"
      >
        <p id="form-errors-title" class="flex items-center gap-2 font-semibold text-danger">
          <UiIcon name="warning-circle" weight="bold" /> Please fix {{ errorList.length }} {{ errorList.length === 1 ? 'field' : 'fields' }}
        </p>
        <ul class="mt-2 grid list-disc gap-1 pl-6">
          <li v-for="[key, msg] in errorList" :key="key">
            <a href="#" class="link" @click.prevent="focusField(key)">{{ msg }}</a>
          </li>
        </ul>
      </div>

      <UiAlert v-if="sent" tone="success" title="Inquiry sent">Thank you! We'll reply within 24 hours with availability.</UiAlert>

      <p class="text-xs text-muted"><span class="text-danger" aria-hidden="true">*</span> Required field</p>

      <div class="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <UiField label="Full name" required :error="errors.name" data-field="name">
          <UiInput v-model="form.name" placeholder="Maria Popescu" autocomplete="name" />
        </UiField>
        <UiField label="Email" required :error="errors.email" data-field="email">
          <UiInput v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" />
        </UiField>
        <UiField label="Event date" required :error="errors.date" data-field="date">
          <UiInput v-model="form.date" type="date" />
        </UiField>
        <UiField label="Guests" required :error="errors.guests" hint="From 50 to 400 guests." data-field="guests">
          <UiInput v-model="form.guests" type="number" min="50" max="400" inputmode="numeric" />
        </UiField>
        <UiField label="Event type">
          <UiSelect v-model="form.type">
            <option>Wedding</option>
            <option>Christening</option>
            <option>Anniversary</option>
            <option>Corporate event / gala</option>
            <option>Conference</option>
            <option>Private party</option>
          </UiSelect>
        </UiField>
        <UiField label="Budget (optional)" hint="Disabled state">
          <UiInput placeholder="€" disabled />
        </UiField>
      </div>

      <fieldset class="grid gap-3">
        <legend class="mb-3 text-sm font-medium">Room setup</legend>
        <div class="flex flex-wrap gap-x-8 gap-y-1">
          <UiRadio v-model="form.setup" name="setup" value="banquet">Banquet tables</UiRadio>
          <UiRadio v-model="form.setup" name="setup" value="theatre">Theatre</UiRadio>
          <UiRadio v-model="form.setup" name="setup" value="cocktail">Cocktail / standing</UiRadio>
        </div>
      </fieldset>

      <UiField label="Tell us about your event" hint="Optional, but it helps us prepare your visit.">
        <UiTextarea v-model="form.message" placeholder="Anything we should know — style, menu preferences, entertainment…" />
      </UiField>

      <div class="flex flex-wrap gap-x-8 gap-y-1">
        <UiSwitch v-model="form.flexible">Our date is flexible</UiSwitch>
        <UiCheckbox v-model="form.brochure">Send me the menu brochure</UiCheckbox>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <UiButton size="lg" type="submit" :loading="sending" trailing-icon="paper-plane-tilt" class="max-sm:w-full">
          {{ sending ? 'Sending…' : 'Send inquiry' }}
        </UiButton>
        <span class="text-sm text-muted">We reply within 24 hours.</span>
      </div>
    </UiCard>
  </GuideSpec>
</template>
