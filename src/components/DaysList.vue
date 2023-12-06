<script setup lang="ts">
import DaysListItem from './DaysListItem.vue'

defineProps<{ items: Date[] }>()
</script>

<template>
  <div class="flex flex-col">
    <template v-for="(day, index) in items" :key="index">
      <DaysListItem :day="day"></DaysListItem>
    </template>
  </div>
</template>
