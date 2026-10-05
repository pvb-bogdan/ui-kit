<script setup lang="ts">
const spaces = [
  { name: 'The Grand Ballroom', guests: 'Up to 400', tag: 'Ballroom', text: 'Crystal chandeliers, a sprung dance floor and a stage for live bands.' },
  { name: 'Crystal Hall', guests: 'Up to 180', tag: 'Hall', text: 'An elegant hall for christenings, anniversaries and smaller weddings.' },
  { name: 'Garden Terrace', guests: 'Up to 120', tag: 'Outdoor', text: 'Welcome drinks, summer cocktails and photos at golden hour.' }
]
const packages = [
  { name: 'Silver', price: '€65', note: 'per guest · min. 100 guests', items: ['Venue & standard décor', 'Three-course menu', 'Soft drinks package'], featured: false },
  { name: 'Gold', price: '€89', note: 'per guest · min. 100 guests', items: ['Everything in Silver', 'Open bar, 6 hours', 'DJ, sound & lighting', 'Dedicated event coordinator'], featured: true },
  { name: 'Platinum', price: '€120', note: 'per guest · min. 150 guests', items: ['Everything in Gold', 'Champagne reception', 'Live band', 'Custom cake & candy bar'], featured: false }
]
const testimonials = [
  { quote: 'From the first walk-through to the last dance, the team took care of everything. Our guests still talk about the night under the chandeliers.', name: 'Maria & Alex', meta: 'Wedding · 320 guests · September 2025', initials: 'M&A' },
  { quote: 'We hosted our annual gala for 250 people. Sound, lighting and catering were flawless, and the coordinator handled every last-minute change.', name: 'Daniel Ionescu', meta: 'Corporate gala · 250 guests · December 2025', initials: 'DI' },
  { quote: 'The Crystal Hall was perfect for our daughter’s christening — elegant, calm, and the kids’ menu was a hit.', name: 'Elena Marin', meta: 'Christening · 90 guests · May 2026', initials: 'EM' }
]
const faqs = [
  { title: 'What kind of events do you host?', content: 'Weddings, christenings, anniversaries, corporate galas, conferences and private parties — from 50 to 400 guests.' },
  { title: 'Can we bring our own catering?', content: 'Catering is provided by our in-house kitchen. We happily adapt menus for dietary needs and traditional dishes.' },
  { title: 'Is there parking on site?', content: 'Yes — free parking for 150 cars, plus valet service for events with more than 200 guests.' },
  { title: 'How far ahead should we book?', content: 'Most couples book 12–18 months ahead for Saturdays. Weekdays and Sundays often have availability within a few months.' }
]
</script>

<template>
  <GuideSpec title="Space cards">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] items-start gap-6">
      <UiCard v-for="s in spaces" :key="s.name" as="article" interactive>
        <UiMedia class="aspect-4/3" />
        <div class="grid gap-3 p-6">
          <div class="flex flex-wrap gap-2">
            <UiBadge>{{ s.tag }}</UiBadge>
            <UiBadge color="accent" icon="users">{{ s.guests }}</UiBadge>
          </div>
          <h3 class="text-h4">{{ s.name }}</h3>
          <p class="text-sm text-muted">{{ s.text }}</p>
          <UiButton variant="text" trailing-icon="arrow-right" class="-ml-2 justify-self-start">View space</UiButton>
        </div>
      </UiCard>
    </div>
  </GuideSpec>

  <GuideSpec title="Package cards" note="Highlight one recommended option. The featured card uses a primary ring, not a different color scheme.">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] items-start gap-6">
      <UiCard v-for="p in packages" :key="p.name" as="article" :class="p.featured && 'ring-2 ring-primary'">
        <div class="grid gap-4 px-6 py-8">
          <div class="flex items-center justify-between gap-2">
            <span class="eyebrow">{{ p.name }}</span>
            <UiBadge v-if="p.featured" variant="solid">Most loved</UiBadge>
          </div>
          <p class="heading text-h2">{{ p.price }}</p>
          <p class="-mt-2 text-sm text-muted">{{ p.note }}</p>
          <ul class="mb-2 grid gap-2 text-sm">
            <li v-for="i in p.items" :key="i" class="flex items-center gap-2"><UiIcon name="check" class="shrink-0 text-primary" /> {{ i }}</li>
          </ul>
          <UiButton :variant="p.featured ? 'solid' : 'outline'" block>Request details</UiButton>
        </div>
      </UiCard>
    </div>
  </GuideSpec>

  <GuideSpec title="Testimonials" note="Manual carousel — no auto-rotation, so nothing moves unless the visitor asks. Prev/next, dots and ← → keys; the position is announced to screen readers.">
    <UiTestimonials :items="testimonials" class="max-w-3xl" />
  </GuideSpec>

  <GuideSpec title="FAQ accordion">
    <UiAccordion :items="faqs" :default-open="0" class="max-w-3xl" />
  </GuideSpec>

  <GuideSpec title="Dividers">
    <div class="grid max-w-3xl gap-8">
      <UiOrnament><UiIcon name="sparkle" /></UiOrnament>
      <UiOrnament><UiIcon name="diamond" size="16" /></UiOrnament>
      <UiOrnament><span class="eyebrow">Since 1998</span></UiOrnament>
      <hr class="border-t-theme">
    </div>
  </GuideSpec>
</template>
