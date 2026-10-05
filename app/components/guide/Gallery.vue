<script setup lang="ts">
const items = [
  { alt: 'Grand Ballroom set for a wedding dinner under crystal chandeliers', caption: 'Grand Ballroom · wedding dinner', category: 'Weddings' },
  { alt: 'First dance on the ballroom dance floor', caption: 'First dance', category: 'Weddings' },
  { alt: 'Gala stage with ambient blue lighting', caption: 'Annual gala · stage', category: 'Galas' },
  { alt: 'Champagne reception on the Garden Terrace', caption: 'Garden Terrace reception', category: 'Weddings' },
  { alt: 'Christening table decorated in white and silver', caption: 'Crystal Hall · christening', category: 'Christenings' },
  { alt: 'Conference set up in theatre style', caption: 'Conference · theatre setup', category: 'Corporate' },
  { alt: 'Live band performing at a corporate party', caption: 'Live band', category: 'Galas' }
]
</script>

<template>
  <GuideSpec title="Photo gallery" note="The most important section for a venue — people book what they can see. Filter by event type, open any photo in a lightbox (Esc or backdrop click closes it). Images lazy-load and their space is reserved, so nothing jumps while loading.">
    <UiGallery :items="items" />
  </GuideSpec>
</template>
