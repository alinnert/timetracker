<script setup lang="ts">
import { useTimesStore } from '@/stores/times'
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'
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
        <MinusIcon class="w-5 h-5 text-white"></MinusIcon>
      </template>
      <template v-else-if="type === 'add'">
        <PlusIcon class="w-5 h-5 text-sky-600"></PlusIcon>
      </template>
    </div>
  </div>
</template>
