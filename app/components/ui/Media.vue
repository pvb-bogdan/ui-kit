<script setup lang="ts">
/**
 * Themed image placeholder. On the real site pass `src` and it renders the photo;
 * without it you get a gradient in the theme colors (useful while content is missing).
 * Set shape where you use it: `<UiMedia class="aspect-4/3 rounded-md" />` — the aspect
 * ratio reserves space, so images never shift the layout. Lazy by default; pass
 * loading="eager" for the hero image only.
 */
withDefaults(defineProps<{ src?: string, alt?: string, loading?: 'lazy' | 'eager' }>(), { loading: 'lazy' })
const placeholder = [
  'radial-gradient(120% 90% at 20% 10%, color-mix(in oklab, var(--color-accent) 45%, transparent), transparent 60%)',
  'radial-gradient(120% 90% at 90% 100%, color-mix(in oklab, var(--color-primary) 55%, transparent), transparent 60%)'
].join(',')
</script>

<template>
  <div class="relative grid place-items-center overflow-hidden bg-surface-alt text-foreground/35" :style="!src ? { backgroundImage: placeholder } : undefined">
    <img v-if="src" :src="src" :alt="alt ?? ''" :loading="loading" decoding="async" class="absolute inset-0 size-full object-cover">
    <UiIcon v-else name="image" size="40" />
    <slot />
  </div>
</template>
