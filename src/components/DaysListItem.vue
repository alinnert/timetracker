<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, isSameDay } from 'date-fns'
import { de } from 'date-fns/locale'
import { computed } from 'vue'
import DayProgress from './DayProgress.vue'
import UiStack from './UiStack.vue'

const props = defineProps<{ day: Date }>()

const timesStore = useTimesStore()

const dayInfo = computed(() => {
  return timesStore.getDayInfo(props.day)
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
        :class="{ 'opacity-50': dayInfo.timestampsCount === 0 }"
      >
        <span class="font-bold">{{ format(day, 'dd.MM.yyyy', { locale: de }) }}</span>
        <span>{{ format(day, 'EEEEEEE', { locale: de }) }}</span>
      </div>

      <template v-if="dayInfo.timestampsCount > 0">
        <DayProgress :worktime="dayInfo.worktime" :breaktime="dayInfo.break" size="small"></DayProgress>
      </template>
    </UiStack>
  </div>
</template>
