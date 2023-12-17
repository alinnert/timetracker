<script setup lang="ts">
import { getWeek } from 'date-fns'
import { de } from 'date-fns/locale'
import DaysListItem from './DaysListItem.vue'
import WeekHeadline from './WeekHeadline.vue'

defineProps<{ items: Date[] }>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <template v-for="(day, index) in items" :key="index">
      <template
        v-if="
          index === 0 || getWeek(day, { locale: de }) !== getWeek(items[index - 1], { locale: de })
        "
      >
        <WeekHeadline>{{ getWeek(day, { locale: de }) }}</WeekHeadline>
      </template>
      <DaysListItem :day="day"></DaysListItem>
    </template>
  </div>
</template>
