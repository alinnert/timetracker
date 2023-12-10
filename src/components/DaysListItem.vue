<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, isSameDay } from 'date-fns'
import { de } from 'date-fns/locale'
import { computed } from 'vue'
import { formatDuration } from '../lib/date-fns/formatDuration'

const props = defineProps<{ day: Date }>()

const timesStore = useTimesStore()

const dayInfo = computed(() => {
  return timesStore.getDayInfo(props.day)
})

const workTime = computed(() => {
  return formatDuration(dayInfo.value.worktime)
})

const breakTime = computed(() => {
  return formatDuration(dayInfo.value.break)
})
</script>

<template>
  <div
    class="flex sm:flex-col px-3 py-2 cursor-default rounded select-none"
    :class="{
      'hover:bg-sky-100': !isSameDay(timesStore.selectedDay, day),
      'bg-sky-200': isSameDay(timesStore.selectedDay, day),
    }"
    @click="timesStore.setSelectedDay(day)"
  >
    <div
      class="font-mono font-bold flex-grow"
      :class="{ 'opacity-50 italic': dayInfo.timestampsCount === 0 }"
    >
      {{ format(day, 'dd.MM.yyyy EEEEEE', { locale: de }) }}
    </div>

    <template v-if="dayInfo.timestampsCount > 0">
      <div class="text-sm">
        <div>
          Arbeit: <span class="font-mono">{{ workTime }}</span>
        </div>
        <div>
          Pause: <span class="font-mono">{{ breakTime }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
