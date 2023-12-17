<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { ref } from 'vue'
import TextInput from './TextInput.vue'
import ToolbarButton from './ToolbarButton.vue'
import { debug } from 'console';

const value = ref('')
const error = ref(false)

const timesStore = useTimesStore()

function handleAddClick() {
  const regex = /^((\d\d\d\d)-(\d\d)-(\d\d) )?(\d\d?):(\d\d)$/
  const match = value.value.match(regex)

  if (match === null) {
    error.value = true
    return
  }

  const [, , matchedYear, matchedMonth, matchedDay, matchedHours, matchedMinutes] = match

  const {selectedDay} = timesStore

  const year = matchedYear !== undefined ? Number.parseInt(matchedYear) : selectedDay.getFullYear()
  const month = matchedMonth !== undefined ? Number.parseInt(matchedMonth) - 1 : selectedDay.getMonth()
  const day = matchedDay !== undefined ? Number.parseInt(matchedDay) : selectedDay.getDate()
  const hours = Number.parseInt(matchedHours)
  const minutes = Number.parseInt(matchedMinutes)

  console.log('selected', `${selectedDay} => ${year}-${month}-${day}`)

  const time = new Date(year, month, day, hours, minutes)

  timesStore.addTime(time)

  value.value = ''
}

function handleErrorClose() {
  error.value = false
}

function handleInput() {
  error.value = false
}
</script>

<template>
  <form class="flex items-center gap-2" @submit.prevent="handleAddClick">
    <label for="add-timestamp-input" class="font-bold">Zeit hinzufügen:</label>
    <TextInput
      id="add-timestamp-input"
      placeholder="(yyyy-mm-dd) hh:mm"
      @input="handleInput"
      v-model="value"
    ></TextInput>
    <ToolbarButton type="submit">Hinzufügen</ToolbarButton>

    <template v-if="error">
      <div
        class="flex items-center font-semibold text-sm text-red-800 bg-red-50 border border-red-300 p-0.5 rounded"
      >
        <div class="px-2">
          Eingegebene Zeit ist ungültig. Zeit muss der Form "yyyy-mm-dd hh:mm" entsprechen.
        </div>
        <div
          @click="handleErrorClose"
          class="hover:bg-red-800 hover:text-white active:bg-red-700 active:text-white rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </div>
      </div>
    </template>
  </form>
</template>
