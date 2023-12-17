<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, getWeek } from 'date-fns'
import { de } from 'date-fns/locale'

const timesStore = useTimesStore()
</script>

<template>
  <div>
    <div class="text-2xl font-bold">
      {{ format(timesStore.selectedDay, 'dd. MMMM yyyy', { locale: de }) }}
    </div>
    <div class="text-sm font-bold text-gray-400">
      {{ format(timesStore.selectedDay, 'EEEEEEE', { locale: de }) }}, Woche
      {{ getWeek(timesStore.selectedDay, { locale: de }) }}
    </div>
  </div>
</template>
