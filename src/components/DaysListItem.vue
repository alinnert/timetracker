<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, isSameDay } from 'date-fns'
import { de } from 'date-fns/locale'
import { computed } from 'vue'
import { formatDuration } from '../lib/date-fns/formatDuration'
import HoursProgress from './HoursProgress.vue'
import UiStack from './UiStack.vue'

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
    class="flex sm:flex-col px-3 py-2 cursor-default rounded-lg select-none"
    :class="{
      'hover:bg-gray-100 active:bg-gray-200': !isSameDay(timesStore.selectedDay, day),
      'bg-sky-100': isSameDay(timesStore.selectedDay, day),
    }"
    @click="timesStore.setSelectedDay(day)"
  >
    <UiStack :gap="2">
      <div
        class="flex-grow flex justify-between"
        :class="{ 'opacity-50 italic': dayInfo.timestampsCount === 0 }"
      >
        <span class="font-mono font-bold">{{ format(day, 'dd.MM.yyyy', { locale: de }) }}</span>
        <span>{{ format(day, 'EEEEEEE', { locale: de }) }}</span>
      </div>

      <template v-if="dayInfo.timestampsCount > 0">
        <HoursProgress :value="dayInfo.worktime"></HoursProgress>

        <div class="text-xs flex justify-between">
          <div>
            <span class="font-mono">{{ workTime }}</span>
          </div>
          <div>
            Pause: <span class="font-mono">{{ breakTime }}</span>
          </div>
        </div>
      </template>
    </UiStack>
  </div>
</template>
