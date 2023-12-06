<script setup lang="ts">
import { format } from 'date-fns'

defineProps<{ day: Date }>()
</script>

<template>
  <div class="px-3 py-2 hover:bg-gray-200">
    {{ format(day, 'dd.MM.yyyy') }}
  </div>
</template>
