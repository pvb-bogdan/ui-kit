<script setup lang="ts">
/**
 * Photo gallery with category filter and lightbox.
 * The lightbox is a native <dialog>: focus is trapped and Esc closes it — no extra
 * library needed. Focus goes back to the photo that opened it.
 */
export interface GalleryItem { src?: string, alt: string, caption: string, category: string }
const props = defineProps<{ items: GalleryItem[] }>()

const categories = computed(() => ['All', ...new Set(props.items.map(i => i.category))])
const filter = ref('All')
const visible = computed(() => (filter.value === 'All' ? props.items : props.items.filter(i => i.category === filter.value)))

const dialog = ref<HTMLDialogElement>()
const index = ref(0)
const current = computed(() => visible.value[index.value])
let opener: HTMLElement | null = null
const open = (i: number, e: MouseEvent) => {
  opener = e.currentTarget as HTMLElement
  index.value = i
  dialog.value?.showModal()
}
// Every way of closing goes through here, so focus always returns to the photo
// that opened the lightbox (Safari doesn't focus buttons on click).
const close = () => {
  dialog.value?.close()
  opener?.focus()
}
const step = (d: number) => { index.value = (index.value + d + visible.value.length) % visible.value.length }
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
  if (e.key === 'Escape') { e.preventDefault(); close() }
}
// Click on the backdrop (outside the content) closes the dialog
const onBackdrop = (e: MouseEvent) => { if (e.target === dialog.value) close() }
</script>

<template>
  <div class="grid gap-6">
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
      <button
        v-for="c in categories"
        :key="c"
        type="button"
        :aria-pressed="filter === c"
        class="min-h-9 cursor-pointer rounded-full border-theme border-border-strong px-4 text-sm transition focus-ring hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary pointer-coarse:min-h-[44px]"
        @click="filter = c"
      >
        {{ c }}
      </button>
    </div>

    <p class="sr-only" aria-live="polite">{{ visible.length }} photos shown</p>

    <ul class="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4">
      <li
        v-for="(item, i) in visible"
        :key="item.caption"
        :class="i === 0 && 'col-span-2 row-span-2'"
      >
        <button
          type="button"
          class="group relative block size-full cursor-zoom-in overflow-hidden rounded-md focus-ring"
          :aria-label="`Open photo: ${item.alt}`"
          @click="open(i, $event)"
        >
          <UiMedia :src="item.src" :alt="item.alt" class="size-full transition duration-500 group-hover:scale-105" />
          <span class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 text-left text-sm text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
            {{ item.caption }}
          </span>
        </button>
      </li>
    </ul>

    <dialog
      ref="dialog"
      class="m-auto w-[min(960px,92vw)] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      aria-label="Photo viewer"
      @keydown="onKey"
      @click="onBackdrop"
    >
      <figure v-if="current" class="m-0 grid gap-3">
        <UiMedia :src="current.src" :alt="current.alt" loading="eager" class="aspect-3/2 w-full rounded-md" />
        <figcaption class="flex items-center justify-between gap-4 text-sm">
          <span>{{ current.caption }} <span class="opacity-60">· {{ index + 1 }} / {{ visible.length }}</span></span>
          <span class="flex gap-2">
            <button type="button" class="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-ring pointer-coarse:size-11" aria-label="Previous photo" @click="step(-1)"><UiIcon name="arrow-left" /></button>
            <button type="button" class="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-ring pointer-coarse:size-11" aria-label="Next photo" @click="step(1)"><UiIcon name="arrow-right" /></button>
            <button type="button" class="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-ring pointer-coarse:size-11" aria-label="Close" autofocus @click="close"><UiIcon name="x" /></button>
          </span>
        </figcaption>
      </figure>
    </dialog>
  </div>
</template>
