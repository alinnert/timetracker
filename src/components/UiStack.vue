<script setup lang="ts">
withDefaults(defineProps<{ gap?: 2 | 4 }>(), { gap: 4 })
</script>

<template>
  <div
    class="flex flex-col"
    :class="{
      'gap-2': gap === 2,
      'gap-4': gap === 4,
    }"
  >
    <slot></slot>
  </div>
</template>
