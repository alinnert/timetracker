<script setup lang="ts">
import { formatDuration } from 'date-fns'
import DaysList from './components/DaysList.vue'
import TimestampList from './components/TimestampList.vue'
import ToolbarButton from './components/ToolbarButton.vue'
import { useTimesStore } from './stores/times'

const timesStore = useTimesStore()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-[1fr,600px,1fr] my-4">
    <div class="grid grid-cols-1 sm:grid-cols-[160px,1fr] gap-2 sm:col-start-2">
      <div>
        <DaysList :items="timesStore.allDays"></DaysList>
      </div>

      <div>
        <div class="p-2">
          <ToolbarButton @click="timesStore.addCurrentTime()">Zeit hinzufügen</ToolbarButton>
        </div>

        <TimestampList></TimestampList>

        <div class="grid grid-cols-2 gap-2 p-2">
          <div>Heute gearbeitet:</div>
          <div class="font-bold">
            {{ formatDuration(timesStore.workTimeOfSelectedDay, { format: ['hours', 'minutes'] }) }}
          </div>
          <div>
            <template v-if="timesStore.workTimeOfSelectedDay.hours ?? 0 < 8">
              8 Stunden erreicht in:
            </template>
            <template v-else>Überstunden:</template>
          </div>
          <div class="font-bold">
            {{
              formatDuration(timesStore.remainingWorkTimeOfSelectedDay, {
                format: ['hours', 'minutes']
              })
            }}
          </div>
          <div>Pausenzeit:</div>
          <div class="font-bold">
            {{
              formatDuration(timesStore.breakTimeOfSelectedDay, { format: ['hours', 'minutes'] })
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
