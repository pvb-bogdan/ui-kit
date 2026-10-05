<script setup lang="ts">
const { settings } = useTheme()

const groups = [
  { title: 'Events & celebrations', icons: ['heart', 'calendar-heart', 'champagne', 'cake', 'confetti', 'gift', 'diamond', 'sparkle', 'crown', 'baby', 'briefcase', 'presentation', 'flower-lotus', 'camera', 'hand-heart', 'seal-check'] },
  { title: 'Venue & services', icons: ['fork-knife', 'wine', 'martini', 'music-notes', 'microphone-stage', 'speaker-hifi', 'disco-ball', 'piano-keys', 'projector-screen', 'chair', 'lamp', 'buildings'] },
  { title: 'Info & logistics', icons: ['map-pin', 'map-trifold', 'users', 'car', 'wheelchair', 'clock', 'door-open', 'calendar-check', 'calendar-dots'] },
  { title: 'Contact & social', icons: ['envelope-simple', 'phone', 'whatsapp-logo', 'instagram-logo', 'facebook-logo', 'pinterest-logo', 'chat-circle', 'quotes'] },
  { title: 'Interface', icons: ['arrow-right', 'arrow-left', 'caret-down', 'plus', 'minus', 'x', 'check', 'list', 'info', 'warning', 'check-circle', 'star'] }
]
const weights = ['thin', 'light', 'regular', 'bold', 'fill'] as const
</script>

<template>
  <GuideSpec title="Icon set" :note="`Phosphor Icons via Iconify — 1,500+ icons in 6 weights, MIT licensed. The weight follows the theme (currently “${settings.effects.iconWeight}”) through <UiIcon name=&quot;heart&quot; />.`">
    <div class="grid gap-6">
      <div v-for="g in groups" :key="g.title">
        <GuideTag>{{ g.title }}</GuideTag>
        <div class="mt-2 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
          <div v-for="i in g.icons" :key="i" class="grid justify-items-center gap-2 rounded-md px-2 py-4 text-center transition hover:bg-primary-soft hover:text-primary" :title="i">
            <UiIcon :name="i" size="26" />
            <span class="text-[0.68rem] text-muted [overflow-wrap:anywhere]">{{ i }}</span>
          </div>
        </div>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Weights" note="Match icon weight to the heading font: thin/light for delicate serifs, regular/bold for sturdier type.">
    <div class="flex flex-wrap gap-4">
      <div v-for="w in weights" :key="w" class="grid justify-items-center gap-2 rounded-md border-theme bg-surface px-6 py-4 text-primary">
        <UiIcon name="flower-lotus" :weight="w" size="40" />
        <span class="text-sm text-muted">{{ w }}</span>
      </div>
    </div>
  </GuideSpec>

  <GuideSpec title="Sizes & treatments">
    <div class="flex flex-wrap items-center gap-6 text-primary">
      <UiIcon v-for="s in [16, 20, 24, 32, 48]" :key="s" name="heart" :size="s" />
      <span class="grid size-14 place-items-center rounded-md bg-primary-soft text-primary"><UiIcon name="champagne" size="26" /></span>
      <span class="grid size-14 place-items-center rounded-full bg-accent-soft text-accent"><UiIcon name="cake" size="26" /></span>
      <span class="grid size-14 place-items-center rounded-md bg-primary text-on-primary"><UiIcon name="calendar-heart" size="26" /></span>
    </div>
  </GuideSpec>
</template>
