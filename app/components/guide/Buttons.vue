<script setup lang="ts">
const variants = ['solid', 'outline', 'text'] as const
const colors = ['primary', 'accent', 'neutral'] as const
const loading = ref(false)
const fakeSubmit = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 1600)
}
</script>

<template>
  <GuideSpec title="Variants × colors" note="Three styles: solid (main action), outline (secondary), text (tertiary). Shape is a separate theme setting (rounded-btn), so every variant follows the radius / pill controls.">
    <div class="overflow-x-auto">
      <div class="grid min-w-[560px] grid-cols-[72px_repeat(3,minmax(0,1fr))] items-center gap-4">
        <div />
        <GuideTag v-for="v in variants" :key="v">{{ v }}</GuideTag>
        <template v-for="c in colors" :key="c">
          <GuideTag>{{ c }}</GuideTag>
          <div v-for="v in variants" :key="v" class="grid place-items-center rounded-md border-theme border-dashed bg-surface p-4">
            <UiButton :variant="v" :color="c">Book a visit</UiButton>
          </div>
        </template>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Sizes">
    <div class="flex flex-wrap items-center gap-3">
      <UiButton size="sm">Small</UiButton>
      <UiButton size="md">Medium</UiButton>
      <UiButton size="lg">Large</UiButton>
    </div>
  </GuideSpec>

  <GuideSpec title="With icons">
    <div class="flex flex-wrap items-center gap-3">
      <UiButton icon="calendar-heart">Check dates</UiButton>
      <UiButton variant="outline" icon="download-simple">Brochure (PDF)</UiButton>
      <UiButton variant="text" trailing-icon="arrow-right">See all spaces</UiButton>
      <UiButton variant="outline" icon="heart" aria-label="Save to favourites" />
      <UiButton variant="text" color="neutral" icon="share-network" aria-label="Share" />
    </div>
  </GuideSpec>

  <GuideSpec title="States" note="Hover, focus (keyboard Tab), disabled and loading. Loading blocks double submits.">
    <div class="flex flex-wrap items-center gap-3">
      <UiButton>Default</UiButton>
      <UiButton disabled>Disabled</UiButton>
      <UiButton variant="outline" disabled>Disabled</UiButton>
      <UiButton :loading="loading" @click="fakeSubmit">{{ loading ? 'Sending…' : 'Click to load' }}</UiButton>
    </div>
  </GuideSpec>

  <GuideSpec title="Usage">
    <GuideDoDont
      :dos="['One solid primary button per section — the action we want most.', 'Pair solid + outline for primary / secondary choices.', 'Use verbs: “Check availability”, “Download brochure”.', 'Use full-width buttons (block) on mobile forms.']"
      :donts="['Two solid buttons side by side competing for attention.', 'Accent-colored solid buttons for main CTAs — accent is for details.', 'Vague labels like “Click here” or “Submit”.', 'Icon-only buttons without an aria-label.']"
    />
  </GuideSpec>
</template>
