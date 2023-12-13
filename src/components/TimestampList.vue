<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import TimestampListItem from './TimestampListItem.vue'

const timesStore = useTimesStore()
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <template v-for="(timestamp, index) in timesStore.timestampsOfSelectedDay" :key="index">
      <TimestampListItem type="instance" :timestamp="timestamp"></TimestampListItem>
    </template>
    <template v-if="timesStore.selectedDayIsToday">
      <TimestampListItem type="add" :timestamp="timesStore.currentTime"></TimestampListItem>
    </template>
  </div>
</template>
