<script setup lang="ts">
/**
 * Testimonial carousel. Manual only — no auto-rotation, so nothing moves on its own
 * and no pause control is needed. Prev/next buttons, dots, ← → keys, and the
 * slide position is announced to screen readers.
 */
export interface Testimonial { quote: string, name: string, meta: string, initials: string }
const props = defineProps<{ items: Testimonial[], label?: string }>()

const index = ref(0)
const current = computed(() => props.items[index.value]!)
const go = (i: number) => { index.value = (i + props.items.length) % props.items.length }
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); go(index.value + 1) }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(index.value - 1) }
}
</script>

<template>
  <section
    class="overflow-hidden rounded-lg border-theme bg-surface shadow-md"
    :aria-label="label ?? 'Testimonials'"
    aria-roledescription="carousel"
    @keydown="onKey"
  >
    <div class="grid min-h-80 content-start gap-6 p-6 sm:p-8">
      <UiIcon name="quotes" size="40" weight="fill" class="text-accent" />
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-theme"
        leave-active-class="transition duration-200 ease-theme"
        enter-from-class="opacity-0 translate-y-1"
        leave-to-class="opacity-0"
      >
        <figure :key="index" class="m-0 grid gap-6" aria-roledescription="slide" :aria-label="`${index + 1} of ${items.length}`">
          <blockquote class="font-heading text-h4 italic leading-snug">“{{ current.quote }}”</blockquote>
          <figcaption class="flex flex-wrap items-center gap-4">
            <span class="heading grid size-12 place-items-center rounded-full bg-accent-soft font-semibold text-accent" aria-hidden="true">{{ current.initials }}</span>
            <span><strong>{{ current.name }}</strong><br><span class="text-sm text-muted">{{ current.meta }}</span></span>
            <span class="ml-auto flex gap-0.5 text-accent" role="img" aria-label="5 out of 5 stars">
              <UiIcon v-for="n in 5" :key="n" name="star" weight="fill" size="16" />
            </span>
          </figcaption>
        </figure>
      </Transition>
    </div>

    <div class="flex items-center justify-between gap-4 border-t-theme px-4 py-3 sm:px-6">
      <div class="flex items-center gap-1">
        <button
          v-for="(t, i) in items"
          :key="t.name"
          type="button"
          class="grid size-6 cursor-pointer place-items-center rounded-full focus-ring pointer-coarse:size-11"
          :aria-label="`Show testimonial ${i + 1}: ${t.name}`"
          :aria-current="i === index || undefined"
          @click="go(i)"
        >
          <span class="block h-2 rounded-full transition-all" :class="i === index ? 'w-6 bg-primary' : 'w-2 bg-border-strong'" />
        </button>
      </div>
      <p class="sr-only" aria-live="polite" aria-atomic="true">Testimonial {{ index + 1 }} of {{ items.length }}: {{ current.name }}</p>
      <div class="flex gap-2">
        <UiButton variant="outline" color="neutral" size="sm" icon="arrow-left" aria-label="Previous testimonial" @click="go(index - 1)" />
        <UiButton variant="outline" color="neutral" size="sm" icon="arrow-right" aria-label="Next testimonial" @click="go(index + 1)" />
      </div>
    </div>
  </section>
</template>
