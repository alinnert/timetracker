<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
</script>

<template>
  <MenuItem v-slot="{ active }" class="block w-full cursor-default">
    <button class="flex items-center gap-2 rounded pl-2 pr-8 py-1 text-sm" :class="{ 'bg-black/10': active }">
      <slot></slot>
    </button>
  </MenuItem>
</template>
