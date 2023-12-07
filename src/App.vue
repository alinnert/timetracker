<script setup lang="ts">
import DaySummary from './components/DaySummary.vue'
import DaysList from './components/DaysList.vue'
import TimestampList from './components/TimestampList.vue'
import ToolbarButton from './components/ToolbarButton.vue'
import UiStack from './components/UiStack.vue'
import UiToolbar from './components/UiToolbar.vue'
import { useTimesStore } from './stores/times'

const timesStore = useTimesStore()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-[1fr,600px,1fr] sm:my-4">
    <div
      class="grid grid-cols-1 sm:grid-cols-[160px,1fr] gap-2 sm:col-start-2 sm:bg-white p-4 sm:rounded-lg sm:shadow-lg"
    >
      <div class="row-start-2 sm:row-start-auto">
        <DaysList :items="timesStore.allDays"></DaysList>
      </div>

      <div>
        <UiToolbar>
          <ToolbarButton @click="timesStore.addCurrentTime()">Zeit hinzufügen</ToolbarButton>
        </UiToolbar>

        <UiStack>
          <TimestampList></TimestampList>
          <DaySummary></DaySummary>
        </UiStack>
      </div>
    </div>
  </div>
</template>
