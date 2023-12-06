<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format } from 'date-fns'

const timesStore = useTimesStore()
</script>

<template>
  <div class="grid grid-cols-2 gap-2 p-2">
    <template v-for="(timestamp, index) in timesStore.timestampsOfSelectedDay" :key="index">
      <div class="grid grid-cols-[1fr,auto] items-center leading-none bg-gray-100">
        <div class="px-2">{{ format(timestamp, 'HH:mm') }}</div>
        <div
          class="p-2 bg-red-700 text-white cursor-default"
          @click="timesStore.removeDate(timestamp)"
        >
          &times;
        </div>
      </div>
    </template>
  </div>
</template>
