<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format } from 'date-fns'

const timesStore = useTimesStore()
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <template v-for="(timestamp, index) in timesStore.timestampsOfSelectedDay" :key="index">
      <div class="flex items-center leading-none border border-gray-300 rounded-md p-px">
        <div class="flex-grow px-2 text-lg font-mono text-center">
          {{ format(timestamp, 'HH:mm') }}
        </div>
        <div
          class="p-0.5 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white cursor-default rounded select-none aspect-square h-full text-center text-lg"
          @click="timesStore.removeDate(timestamp)"
        >
          &times;
        </div>
      </div>
    </template>
    <div
      class="group flex items-center leading-none border border-dashed border-gray-200 hover:border-gray-400 rounded-md p-px"
      v-if="timesStore.selectedDayIsToday"
      @click="timesStore.addCurrentTime()"
    >
      <div
        class="flex-grow text-lg font-mono text-center text-gray-400 group-hover:text-gray-600 select-none"
      >
        + {{ format(timesStore.currentTime, 'HH:mm') }}
      </div>
    </div>
  </div>
</template>
