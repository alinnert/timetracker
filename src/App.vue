<script setup lang="ts">
import { ClipboardDocumentIcon, DocumentDuplicateIcon } from '@heroicons/vue/20/solid'
import AddTimestampForm from './components/AddTimestampForm.vue'
import DaySummary from './components/DaySummary.vue'
import DaysList from './components/DaysList.vue'
import DetailHeader from './components/DetailHeader.vue'
import ImportToolbarForm from './components/ImportToolbarForm.vue'
import TimestampList from './components/TimestampList.vue'
import ToolbarMenu from './components/ToolbarMenu.vue'
import ToolbarMenuItem from './components/ToolbarMenuItem.vue'
import UiStack from './components/UiStack.vue'
import UiToolbar from './components/UiToolbar.vue'
import { useTimesStore } from './stores/times'

const timesStore = useTimesStore()
</script>

<template>
  <div class="fixed inset-0 app-grid app-mobile-grid sm:app-desktop-grid p-4">
    <UiToolbar class="[grid-area:header]">
      <ToolbarMenu>
        <template #button>Daten</template>

        <ToolbarMenuItem @click="timesStore.copyTimesToClipboard">
          <DocumentDuplicateIcon class="w-6 h-6 text-sky-700"></DocumentDuplicateIcon>
          <span>In Zwischenablage exportieren</span>
        </ToolbarMenuItem>

        <ToolbarMenuItem @click="timesStore.importTimesFromClipboard">
          <ClipboardDocumentIcon class="w-6 h-6 text-amber-700"></ClipboardDocumentIcon>
          <span>Aus Zwischenablage importieren</span>
        </ToolbarMenuItem>
      </ToolbarMenu>

      <AddTimestampForm></AddTimestampForm>

      <template #right>
        <ImportToolbarForm></ImportToolbarForm>
      </template>
    </UiToolbar>

    <div class="[grid-area:left] overflow-auto">
      <DaysList :items="timesStore.allDays"></DaysList>
    </div>

    <div class="[grid-area:main] overflow-auto flex flex-col items-center">
      <div class="w-[540px] max-w-full">
        <UiStack>
          <DetailHeader></DetailHeader>
          <DaySummary></DaySummary>
          <TimestampList></TimestampList>
        </UiStack>
      </div>
    </div>
  </div>
</template>
