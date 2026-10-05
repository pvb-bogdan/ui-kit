<script setup lang="ts">
const features = [
  { icon: 'champagne', title: 'Grand ballroom', text: 'Six-metre ceilings, crystal chandeliers and a dance floor for up to 400 guests.' },
  { icon: 'fork-knife', title: 'In-house catering', text: 'Menus created by our chefs, from plated dinners to late-night buffets.' },
  { icon: 'speaker-hifi', title: 'Sound & lighting', text: 'Stage, DJ booth and ambient lighting included with every event.' }
]
const links = ['Venue', 'Events', 'Packages', 'Gallery', 'Contact']
</script>

<template>
  <UiCard>
    <nav class="flex items-center gap-6 border-b-theme px-6 py-4">
      <span class="heading mr-auto text-h5">Aurora Ballroom</span>
      <ul class="hidden gap-6 text-sm md:flex">
        <li v-for="l in links" :key="l"><a href="#preview" class="text-muted transition hover:text-foreground">{{ l }}</a></li>
      </ul>
      <UiButton size="sm">Book a visit</UiButton>
    </nav>

    <div class="grid items-center gap-8 px-6 py-8 md:grid-cols-[1.1fr_1fr] md:gap-12 md:px-8 md:pt-16 md:pb-12">
      <div class="grid justify-items-start gap-6">
        <span class="eyebrow">Weddings · Galas · Private events</span>
        <!-- On the real site this is the page <h1>; here it sits inside a guide section -->
        <h3 class="text-display">Celebrations, beautifully hosted</h3>
        <p class="text-h6 text-muted">A grand ballroom with in-house catering, lighting and a dedicated event team, so all you have to do is enjoy the night.</p>
        <div class="flex flex-wrap gap-3">
          <UiButton size="lg" trailing-icon="arrow-right">Check availability</UiButton>
          <UiButton size="lg" variant="outline" icon="play-circle">Virtual tour</UiButton>
        </div>
        <div class="flex flex-wrap gap-6 text-sm text-muted">
          <span class="inline-flex items-center gap-2"><UiIcon name="star" weight="fill" class="text-accent" /> 4.9 · 180 reviews</span>
          <span class="inline-flex items-center gap-2"><UiIcon name="users" /> 50 – 400 guests</span>
          <span class="inline-flex items-center gap-2"><UiIcon name="car" /> Free parking</span>
        </div>
      </div>
      <UiMedia class="aspect-16/10 rounded-lg md:aspect-4/5" />
    </div>

    <UiOrnament class="px-8"><UiIcon name="sparkle" /></UiOrnament>

    <div class="grid gap-8 px-6 py-8 md:grid-cols-3 md:px-8 md:pt-12 md:pb-16">
      <div v-for="f in features" :key="f.title" class="grid justify-items-start gap-3">
        <span class="grid size-13 place-items-center rounded-md bg-primary-soft text-primary"><UiIcon :name="f.icon" size="26" /></span>
        <h4 class="text-h5">{{ f.title }}</h4>
        <p class="text-sm text-muted">{{ f.text }}</p>
      </div>
    </div>
  </UiCard>
</template>
