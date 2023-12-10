<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, isSameDay } from 'date-fns'

defineProps<{ day: Date }>()

const timesStore = useTimesStore()
</script>

<template>
  <div
    class="px-3 py-2 cursor-default text-center rounded select-none"
    :class="{
      'hover:bg-gray-200': !isSameDay(timesStore.selectedDay, day),
      'bg-gray-300': isSameDay(timesStore.selectedDay, day),
    }"
    @click="timesStore.setSelectedDay(day)"
  >
    {{ format(day, 'dd.MM.yyyy') }}
  </div>
</template>
