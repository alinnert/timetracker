<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, formatDuration } from 'date-fns'
import { de } from 'date-fns/locale'
import { computed } from 'vue'
import { getRatio } from '../lib/date-fns/getRatio'

const timesStore = useTimesStore()

const lessThan8Hours = computed(() => (timesStore.workTimeOfSelectedDay.hours ?? 0) < 8)

const remainingLabel = computed(() =>
  lessThan8Hours.value ? '8 Stunden erreicht in' : 'Überstunden'
)
</script>

<template>
  <div class="grid grid-cols-[1fr,auto] gap-2">
    <div>
      <div class="text-gray-500">Arbeitszeit</div>
      <div class="font-bold">
        {{
          formatDuration(timesStore.workTimeOfSelectedDay, {
            format: ['hours', 'minutes'],
            locale: de
          }) || '-'
        }}
      </div>
    </div>

    <div class="text-right">
      <div class="text-gray-500">{{ remainingLabel }}</div>
      <div class="font-bold">
        {{
          formatDuration(timesStore.remainingWorkTimeOfSelectedDay, {
            format: ['hours', 'minutes'],
            locale: de
          })
        }}
      </div>

      <template v-if="lessThan8Hours && timesStore.selectedDayIsToday">
        <div>
          um
          <strong>
            {{
              format(timesStore.timeAfterRemainingWorkTimeOfSelectedDay, 'HH:mm', { locale: de })
            }}
          </strong>
        </div>
      </template>
    </div>

    <div class="flex flex-col col-span-2">
      <div class="flex justify-between items-end">
        <div class="w-0.5 h-3 bg-black"></div>
        <template v-for="i in 8" :key="i">
          <div class="w-px h-1 bg-gray-400"></div>
          <div class="w-px h-2 bg-gray-500"></div>
          <div class="w-px h-1 bg-gray-400"></div>
          <div class="w-0.5 h-3 bg-black"></div>
        </template>
      </div>

      <progress
        class="w-full appearance-none [&::-webkit-progress-bar]:h-4 [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-bar]:border-solid [&::-webkit-progress-bar]:border-2 [&::-webkit-progress-bar]:border-black [&::-webkit-progress-value]:bg-emerald-600"
        :value="getRatio(timesStore.workTimeOfSelectedDay, { hours: 8 })"
        max="1"
      ></progress>
    </div>

    <div>
      <div class="text-gray-500">Pausenzeit</div>
      <div class="font-bold">
        {{
          formatDuration(timesStore.breakTimeOfSelectedDay, {
            format: ['hours', 'minutes'],
            locale: de
          }) || '-'
        }}
      </div>
    </div>
  </div>
</template>
