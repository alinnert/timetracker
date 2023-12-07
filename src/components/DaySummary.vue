<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { formatDuration } from 'date-fns'
import { computed } from 'vue'
import { getRatio } from '../lib/date-fns/getRatio'

const timesStore = useTimesStore()

const atLeast8Hours = computed(() => (timesStore.workTimeOfSelectedDay.hours ?? 0) < 8)

const remainingLabel = computed(() =>
  atLeast8Hours.value ? '8 Stunden erreicht in:' : 'Überstunden:'
)
</script>

<template>
  <div class="grid grid-cols-2 gap-2 px-2">
    <div>Heute gearbeitet:</div>
    <div class="font-bold">
      {{ formatDuration(timesStore.workTimeOfSelectedDay, { format: ['hours', 'minutes'] }) }}
    </div>

    <div>{{ remainingLabel }}</div>
    <div class="font-bold">
      {{
        formatDuration(timesStore.remainingWorkTimeOfSelectedDay, {
          format: ['hours', 'minutes']
        })
      }}
    </div>

    <div class="col-span-2">
      <progress
        class="w-full appearance-none [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:h-3 [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-bar]:border-solid [&::-webkit-progress-bar]:border-2 [&::-webkit-progress-bar]:border-teal-600 [&::-webkit-progress-value]:bg-teal-600"
        :value="getRatio(timesStore.workTimeOfSelectedDay, { hours: 8 })"
        max="1"
      ></progress>
    </div>

    <div>Pausenzeit:</div>
    <div class="font-bold">
      {{
        formatDuration(timesStore.breakTimeOfSelectedDay, { format: ['hours', 'minutes'] }) || '-'
      }}
    </div>
  </div>
</template>
