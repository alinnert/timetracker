<script setup lang="ts">
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/16/solid'
import AddTimestampForm from './components/AddTimestampForm.vue'
import DaySummary from './components/DaySummary.vue'
import DaysList from './components/DaysList.vue'
import DetailHeader from './components/DetailHeader.vue'
import TimestampList from './components/TimestampList.vue'
import ToolbarMenu from './components/ToolbarMenu.vue'
import ToolbarMenuItem from './components/ToolbarMenuItem.vue'
import ToolbarMenuTitle from './components/ToolbarMenuTitle.vue'
import ToolbarTitle from './components/ToolbarTitle.vue'
import UiDialog from './components/UiDialog.vue'
import UiStack from './components/UiStack.vue'
import UiToolbar from './components/UiToolbar.vue'
import { useTimesStore } from './stores/times'

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

      <UiDialog
        :is-open="timesStore.importData.length > 0"
        title="Daten importieren"
        :buttons="[
          {
            label: 'Ersetzen',
            type: 'primary',
            onClick() {
              timesStore.applyImport(true)
            },
          },
          {
            label: 'Zusammenführen',
            onClick() {
              timesStore.applyImport()
            },
          },
          {
            label: 'Abbrechen',
            onClick() {
              timesStore.abortImport()
            },
          },
        ]"
      >
        Es wurden {{ timesStore.importData.length }} {{ timesStore.importData.length === 1 ? 'Eintrag' : 'Einträge' }} gefunden. Sollen die aktuellen Einträge ersetzt oder alle zusammengeführt werden?
      </UiDialog>

      <AddTimestampForm></AddTimestampForm>
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
