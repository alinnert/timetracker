<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { format } from 'date-fns'

defineProps<{ type: 'instance' | 'add'; timestamp: Date }>()

const timesStore = useTimesStore()
</script>

<template>
  <div
    class="flex items-center leading-none rounded-full border p-1 cursor-default"
    :class="{
      'bg-gray-200': type === 'instance',
      'border-dashed hover:border-solid hover:bg-gray-50 active:bg-gray-100': type === 'add',
    }"
    @click="
      () => {
        if (type !== 'add') return
        timesStore.addCurrentTime()
      }
    "
  >
    <div class="flex-grow px-2 text-lg font-mono text-center">
      {{ format(timestamp, 'HH:mm') }}
    </div>
    <div
      class="grid justify-center items-center p-0.5 cursor-default rounded-full select-none aspect-square h-full text-center text-lg"
      :class="{
        'bg-red-700 hover:bg-red-600 active:bg-red-800 text-white': type === 'instance',
        'text-sky-700': type === 'add',
      }"
      @click="
        () => {
          if (type !== 'instance') return
          timesStore.removeDate(timestamp)
        }
      "
    >
      <template v-if="type === 'instance'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
      <template v-else-if="type === 'add'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
          />
        </svg>
      </template>
    </div>
  </div>
</template>
