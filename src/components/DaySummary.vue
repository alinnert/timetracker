<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import DayProgress from './DayProgress.vue'

const timesStore = useTimesStore()
</script>

<template>
  <DayProgress
    :worktime="timesStore.workTimeOfSelectedDay"
    :breaktime="timesStore.breakTimeOfSelectedDay"
    :remaining="timesStore.remainingWorkTimeOfSelectedDay"
    :is-today="timesStore.selectedDayIsToday"
    :work-time-is-less-than8-hours="timesStore.workTimeOfSelectedDayIsLessThan8Hours"
    :target-time="
      timesStore.workTimeOfSelectedDayIsLessThan8Hours && timesStore.selectedDayIsToday
        ? timesStore.timeAfterRemainingWorkTimeOfSelectedDay
        : undefined
    "
    size="big"
  ></DayProgress>
</template>
