<script setup lang="ts">
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/16/solid'
import AddTimestampForm from './components/AddTimestampForm.vue'
import DaySummary from './components/DaySummary.vue'
import DaysList from './components/DaysList.vue'
import DetailHeader from './components/DetailHeader.vue'
import ImportToolbarForm from './components/ImportToolbarForm.vue'
import TimestampList from './components/TimestampList.vue'
import ToolbarMenu from './components/ToolbarMenu.vue'
import ToolbarMenuItem from './components/ToolbarMenuItem.vue'
import ToolbarTitle from './components/ToolbarTitle.vue'
import UiStack from './components/UiStack.vue'
import UiToolbar from './components/UiToolbar.vue'
import { useTimesStore } from './stores/times'
import ToolbarMenuTitle from './components/ToolbarMenuTitle.vue'

const timesStore = useTimesStore()
</script>

<template>
  <div class="fixed inset-0 app-grid app-mobile-grid sm:app-desktop-grid">
    <UiToolbar class="[grid-area:header]">
      <ToolbarTitle>Timetracker</ToolbarTitle>

      <ToolbarMenu>
        <template #button>Daten</template>

        <ToolbarMenuTitle>Zwischenablage</ToolbarMenuTitle>

        <ToolbarMenuItem @click="timesStore.importTimesFromClipboard">
          <ArrowRightEndOnRectangleIcon
            class="w-4 h-4 text-gray-600"
          ></ArrowRightEndOnRectangleIcon>
          <span>Importieren</span>
        </ToolbarMenuItem>

        <ToolbarMenuItem @click="timesStore.copyTimesToClipboard">
          <ArrowRightStartOnRectangleIcon
            class="w-4 h-4 text-gray-600"
          ></ArrowRightStartOnRectangleIcon>
          <span>Exportieren</span>
        </ToolbarMenuItem>
      </ToolbarMenu>

      <AddTimestampForm></AddTimestampForm>

      <template #right>
        <ImportToolbarForm></ImportToolbarForm>
      </template>
    </UiToolbar>

    <div class="[grid-area:left] overflow-auto">
      <div class="p-4">
        <DaysList :items="timesStore.allDays"></DaysList>
      </div>
    </div>

    <div class="[grid-area:main] overflow-auto flex flex-col items-center">
      <div class="w-[540px] max-w-full py-8">
        <UiStack>
          <DetailHeader></DetailHeader>
          <DaySummary></DaySummary>
          <TimestampList></TimestampList>
        </UiStack>
      </div>
    </div>
  </div>
</template>
