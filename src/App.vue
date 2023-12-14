<script setup lang="ts">
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import DaySummary from './components/DaySummary.vue'
import DaysList from './components/DaysList.vue'
import TimestampList from './components/TimestampList.vue'
import ToolbarButton from './components/ToolbarButton.vue'
import ToolbarMenu from './components/ToolbarMenu.vue'
import ToolbarMenuItem from './components/ToolbarMenuItem.vue'
import UiStack from './components/UiStack.vue'
import UiToolbar from './components/UiToolbar.vue'
import { useTimesStore } from './stores/times'
import AddTimestampForm from './components/AddTimestampForm.vue'

const timesStore = useTimesStore()
</script>

<template>
  <div class="fixed inset-0 app-grid app-mobile-grid sm:app-desktop-grid p-4">
    <UiToolbar class="[grid-area:header]">
      <ToolbarMenu>
        <template #button>Daten</template>

        <ToolbarMenuItem @click="timesStore.copyTimesToClipboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>

          Daten in Zwischenablage
        </ToolbarMenuItem>

        <ToolbarMenuItem @click="timesStore.importTimesFromClipboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
            />
          </svg>

          Aus Zwischenablage importieren
        </ToolbarMenuItem>
      </ToolbarMenu>

      <AddTimestampForm></AddTimestampForm>

      <template #right>
        <template v-if="timesStore.importData.length > 0">
          <div class="flex items-center gap-2">
            {{ timesStore.importData.length }}
            {{ timesStore.importData.length === 1 ? 'Eintrag' : 'Einträge' }} importieren?
            <ToolbarButton @click="timesStore.applyImport()"> Zusammenführen </ToolbarButton>
            <ToolbarButton @click="timesStore.applyImport(true)"> Ersetzen </ToolbarButton>
            <ToolbarButton @click="timesStore.abortImport()"> Abbrechen </ToolbarButton>
          </div>
        </template>
      </template>
    </UiToolbar>

    <div class="[grid-area:left] overflow-auto">
      <DaysList :items="timesStore.allDays"></DaysList>
    </div>

    <div class="[grid-area:main] overflow-auto flex flex-col items-center">
      <div class="w-[540px] max-w-full">
        <UiStack>
          <div class="text-2xl font-bold">
            {{ format(timesStore.selectedDay, 'EEEEEEE, dd. MMMM yyyy', { locale: de }) }}
          </div>
          <TimestampList></TimestampList>
          <DaySummary></DaySummary>
        </UiStack>
      </div>
    </div>
  </div>
</template>
