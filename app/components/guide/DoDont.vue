<script setup lang="ts">
defineProps<{ dos: string[], donts: string[] }>()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="rounded-md border-t-3 border-success bg-success-soft p-6">
      <p class="flex items-center gap-2 font-semibold text-success"><UiIcon name="check-circle" /> Do</p>
      <ul class="mt-3 grid list-disc gap-2 pl-4 text-sm"><li v-for="d in dos" :key="d">{{ d }}</li></ul>
    </div>
    <div class="rounded-md border-t-3 border-danger bg-danger-soft p-6">
      <p class="flex items-center gap-2 font-semibold text-danger"><UiIcon name="x-circle" /> Don't</p>
      <ul class="mt-3 grid list-disc gap-2 pl-4 text-sm"><li v-for="d in donts" :key="d">{{ d }}</li></ul>
    </div>
  </div>
</template>
