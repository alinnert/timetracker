<script setup lang="ts">
withDefaults(defineProps<{ gap?: 2 | 6 }>(), { gap: 6 })
</script>

<template>
  <div
    class="flex flex-col"
    :class="{
      'gap-2': gap === 2,
      'gap-6': gap === 6,
    }"
  >
    <slot></slot>
  </div>
</template>
