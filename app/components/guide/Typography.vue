<script setup lang="ts">
import { getFont } from '~/theme/fonts'

const { settings } = useTheme()
const heading = computed(() => getFont(settings.value.fonts.heading))
const body = computed(() => getFont(settings.value.fonts.body))

const scale = computed(() => {
  const { baseSize: b, scale: r } = settings.value.type
  const px = (n: number) => Math.round(b * r ** n)
  return [
    { cls: 'text-display', size: `${px(6)}px`, text: 'Aurora Ballroom' },
    { cls: 'text-h1', size: `${px(5)}px`, text: 'Celebrations, beautifully hosted' },
    { cls: 'text-h2', size: `${px(4)}px`, text: 'Our event spaces' },
    { cls: 'text-h3', size: `${px(3)}px`, text: 'The Grand Ballroom' },
    { cls: 'text-h4', size: `${px(2)}px`, text: 'Dinner & dancing' },
    { cls: 'text-h5', size: `${px(1)}px`, text: 'Up to 400 guests' },
    { cls: 'text-h6', size: `${px(0.5)}px`, text: 'Open all year round' }
  ]
})

const styles = [
  { cls: 'eyebrow', text: 'Weddings · Galas · Private events' },
  { cls: 'text-h6 text-muted', text: 'A grand ballroom with in-house catering, lighting and a dedicated event team.' },
  { cls: 'text-sm text-muted', text: 'Prices include VAT. Minimum 100 guests on Saturdays.' },
  { cls: 'font-heading text-h4 italic leading-snug', text: '“Our guests still talk about the night under the chandeliers.”' }
]
</script>

<template>
  <GuideSpec title="Font pair" note="One display font for headings, one workhorse for everything else. Fonts load on demand — only the pair in use is downloaded.">
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="grid gap-2 rounded-lg border-theme bg-surface p-6">
        <span class="eyebrow">Headings · font-heading</span>
        <span class="my-2 font-heading text-[5rem] leading-none text-primary">Aa</span>
        <strong class="heading text-h4">{{ heading.label }}</strong>
        <span class="text-sm text-muted">Weight {{ settings.type.headingWeight }}{{ settings.type.headingUppercase ? ' · Uppercase' : '' }} · Tracking {{ settings.type.headingTracking }}em</span>
      </div>
      <div class="grid gap-2 rounded-lg border-theme bg-surface p-6">
        <span class="eyebrow">Body · font-body</span>
        <span class="my-2 font-body text-[5rem] leading-none text-primary">Aa</span>
        <strong class="text-h5 font-medium">{{ body.label }}</strong>
        <span class="text-sm text-muted">{{ settings.type.baseSize }}px · Line-height {{ settings.type.lineHeight }}</span>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Type scale" :note="`Modular scale with ratio ${settings.type.scale}. text-h1, text-h2 and text-display shrink fluidly on small screens. <h1>–<h6> get these sizes by default; use the classes to decouple size from semantics.`">
    <div class="grid">
      <div v-for="s in scale" :key="s.cls" class="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b-theme py-4">
        <div class="grid">
          <code class="font-mono text-xs font-semibold">{{ s.cls }}</code>
          <code class="font-mono text-xs text-muted">{{ s.size }}</code>
        </div>
        <p class="heading [overflow-wrap:anywhere]" :class="s.cls">{{ s.text }}</p>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Text styles">
    <div class="grid max-w-[68ch] gap-6">
      <div v-for="s in styles" :key="s.cls" class="grid gap-2">
        <GuideTag>{{ s.cls }}</GuideTag>
        <p :class="s.cls">{{ s.text }}</p>
      </div>
      <div class="grid gap-2">
        <GuideTag>body + link</GuideTag>
        <p>Our team handles every detail — from the first walk-through to the last dance. Explore <a class="link" href="#typography">our packages</a> or book a private tour of the ballroom with our event coordinator.</p>
      </div>
    </div>
  </GuideSpec>
</template>
