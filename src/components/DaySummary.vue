<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format, formatDuration } from 'date-fns'
import { de } from 'date-fns/locale'
import { computed } from 'vue'
import { getRatio } from '../lib/date-fns/getRatio'
import HoursProgress from './HoursProgress.vue'

const timesStore = useTimesStore()

const lessThan8Hours = computed(() => (timesStore.workTimeOfSelectedDay.hours ?? 0) < 8)

const remainingLabel = computed(() =>
  lessThan8Hours.value ? '8 Stunden erreicht in' : 'Überstunden',
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
            locale: de,
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
            locale: de,
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

    <div class="col-span-2">
      <HoursProgress :value="timesStore.workTimeOfSelectedDay"></HoursProgress>
    </div>

    <div>
      <div class="text-gray-500">Pausenzeit</div>
      <div class="font-bold">
        {{
          formatDuration(timesStore.breakTimeOfSelectedDay, {
            format: ['hours', 'minutes'],
            locale: de,
          }) || '-'
        }}
      </div>
    </div>
  </div>
</template>
