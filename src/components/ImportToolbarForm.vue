<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import ToolbarButton from './ToolbarButton.vue'

const timesStore = useTimesStore()
</script>

<template>
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
