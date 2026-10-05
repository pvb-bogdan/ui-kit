<script setup lang="ts">
// Style guide = our tool, so it remembers tweaks. The sales site uses { persist: false }.
useThemeProvider({ persist: true })
const { mode, resolvedMode, preset, isModified } = useTheme()

// Only one panel at a time: the designer Theme Studio or the client switcher.
const activePanel = useState<'studio' | 'client' | null>('panel:active', () => null)
const studioOpen = computed(() => activePanel.value === 'studio')
const clientOpen = computed({
  get: () => activePanel.value === 'client',
  set: v => { activePanel.value = v ? 'client' : null }
})
const toggleStudio = () => { activePanel.value = studioOpen.value ? null : 'studio' }

const sections = [
  { id: 'preview', title: 'Live preview', icon: 'browser', intro: 'A slice of the ballroom homepage. Use the “Themes” tab on the right edge (what the client sees) or the Theme Studio, and watch it change.' },
  { id: 'colors', title: 'Colors', icon: 'palette', intro: 'A small set of seed colors per mode; everything else is derived. These are the only colors available in Tailwind.' },
  { id: 'typography', title: 'Typography', icon: 'text-aa', intro: 'One font pair, one modular scale.' },
  { id: 'buttons', title: 'Buttons', icon: 'cursor-click', intro: 'Three variants, three sizes, theme-controlled shape.' },
  { id: 'icons', title: 'Icons', icon: 'shapes', intro: 'Phosphor icons through Iconify, weight controlled by the theme.' },
  { id: 'forms', title: 'Forms', icon: 'textbox', intro: 'Inputs and controls for event inquiries.' },
  { id: 'gallery', title: 'Gallery', icon: 'images', intro: 'Photos sell venues. Filterable grid with an accessible lightbox.' },
  { id: 'content', title: 'Content blocks', icon: 'squares-four', intro: 'Cards, packages, testimonials and FAQ — the building blocks of the venue pages.' },
  { id: 'feedback', title: 'Feedback', icon: 'bell-simple', intro: 'Badges and alerts.' },
  { id: 'layout', title: 'Shape & spacing', icon: 'ruler', intro: 'Radius, spacing scale and elevation.' },
  { id: 'tokens', title: 'Tokens & export', icon: 'code', intro: 'The runtime CSS variables and the settings JSON.' }
]

const active = ref('preview')
let io: IntersectionObserver | undefined
onMounted(() => {
  io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) active.value = e.target.id
  }, { rootMargin: '-30% 0px -60% 0px' })
  sections.forEach(s => { const el = document.getElementById(s.id); if (el) io!.observe(el) })
})
onBeforeUnmount(() => io?.disconnect())

const cycleMode = () => { mode.value = resolvedMode.value === 'dark' ? 'light' : 'dark' }
</script>

<template>
  <NuxtRouteAnnouncer />
  <a href="#main" class="sr-only z-100 rounded-md bg-primary px-4 py-3 font-medium text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Skip to main content</a>
  <div class="min-h-dvh">
    <header class="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b-theme bg-background/85 px-4 backdrop-blur-md sm:px-6">
      <div class="heading flex min-w-0 items-center gap-3 whitespace-nowrap text-h6">
        <UiIcon name="flower-lotus" size="22" class="shrink-0 text-accent" />
        <span class="truncate">Venue Style Guide</span>
        <!-- wrapper: `hidden` on the component itself would fight UiBadge's own inline-flex -->
        <span class="hidden sm:contents">
          <UiBadge variant="outline" class="font-body">{{ preset.name }}{{ isModified ? ' · edited' : '' }}</UiBadge>
        </span>
      </div>
      <div class="flex items-center gap-2">
        <ClientOnly>
          <UiButton variant="text" color="neutral" :icon="resolvedMode === 'dark' ? 'sun' : 'moon'" :aria-label="`Switch to ${resolvedMode === 'dark' ? 'light' : 'dark'} mode`" @click="cycleMode" />
          <template #fallback><span class="w-11" /></template>
        </ClientOnly>
        <UiButton size="sm" variant="outline" color="neutral" icon="sliders-horizontal" :aria-expanded="studioOpen" aria-label="Theme Studio" @click="toggleStudio">
          <span class="max-sm:hidden">Theme Studio</span>
        </UiButton>
      </div>
    </header>

    <div class="grid transition-[margin] duration-300 ease-theme lg:grid-cols-[220px_minmax(0,1fr)]" :class="studioOpen && 'xl:mr-[360px]'">
      <nav class="sticky top-16 hidden h-[calc(100vh-4rem)] content-start gap-0.5 self-start overflow-y-auto border-r-theme px-4 py-8 lg:grid" aria-label="Sections">
        <a
          v-for="(s, i) in sections"
          :key="s.id"
          :href="`#${s.id}`"
          class="flex items-baseline gap-3 rounded-sm px-3 py-2 text-sm transition"
          :class="active === s.id ? 'bg-primary-soft text-primary' : 'text-muted hover:text-foreground'"
        >
          <span class="text-xs tabular-nums">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ s.title }}
        </a>
      </nav>

      <main id="main" tabindex="-1" class="w-full outline-none max-w-[1180px] px-[clamp(16px,4vw,64px)] pt-16 pb-24">
        <div class="grid max-w-3xl gap-4 pb-16">
          <span class="eyebrow">UI Kit · v0.2 · Tailwind v4</span>
          <h1 class="text-h1">Design guidelines for the venue website</h1>
          <p class="text-h6 text-muted">Every color, font, radius and space on this page is a Tailwind theme variable, so the whole site can switch between five themes instantly.</p>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="grid grid-cols-[auto_1fr] content-start gap-x-3 gap-y-2 rounded-md border-theme bg-surface p-4">
              <UiIcon name="palette" size="22" class="mt-0.5 text-accent" />
              <div>
                <strong>Themes tab · client</strong>
                <p class="text-sm text-muted">The edge tab on the right. Ships on the sales site: 5 themes + light/dark only, nothing is saved.</p>
              </div>
              <UiButton size="sm" variant="text" trailing-icon="arrow-right" class="col-start-2 -ml-2 justify-self-start" @click="clientOpen = true">Open</UiButton>
            </div>
            <div class="grid grid-cols-[auto_1fr] content-start gap-x-3 gap-y-2 rounded-md border-theme bg-surface p-4">
              <UiIcon name="sliders-horizontal" size="22" class="mt-0.5 text-accent" />
              <div>
                <strong>Theme Studio · designer</strong>
                <p class="text-sm text-muted">Internal tool for us: every token (colors, fonts, radius, spacing…). Used to build and tune the 5 themes.</p>
              </div>
              <UiButton size="sm" variant="text" trailing-icon="arrow-right" class="col-start-2 -ml-2 justify-self-start" @click="activePanel = 'studio'">Open</UiButton>
            </div>
          </div>
        </div>

        <GuideSection v-for="(s, i) in sections" :id="s.id" :key="s.id" :index="String(i + 1).padStart(2, '0')" :title="s.title" :intro="s.intro">
          <GuidePreview v-if="s.id === 'preview'" />
          <GuideColors v-else-if="s.id === 'colors'" />
          <GuideTypography v-else-if="s.id === 'typography'" />
          <GuideButtons v-else-if="s.id === 'buttons'" />
          <GuideIcons v-else-if="s.id === 'icons'" />
          <GuideForms v-else-if="s.id === 'forms'" />
          <GuideGallery v-else-if="s.id === 'gallery'" />
          <GuideContent v-else-if="s.id === 'content'" />
          <GuideFeedback v-else-if="s.id === 'feedback'" />
          <GuideLayout v-else-if="s.id === 'layout'" />
          <GuideTokens v-else-if="s.id === 'tokens'" />
        </GuideSection>
      </main>
    </div>

    <div v-if="studioOpen" class="fixed inset-0 z-55 bg-black/35 xl:hidden" aria-hidden="true" @click="activePanel = null" />
    <ThemePanel :open="studioOpen" @close="activePanel = null" />
    <ThemeSwitcher v-model:open="clientOpen" />
  </div>
</template>
