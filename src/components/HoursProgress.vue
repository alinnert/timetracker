<script setup lang="ts">
const props = defineProps<{ value: Duration }>()

function getSegmentWidth(index: number): string {
  if (index <= (props.value.hours ?? 0)) {
    return '100%'
  }

  if (index > (props.value.hours ?? 0) + 1) {
    return '0%'
  }

  return `${(100 / 60) * (props.value.minutes ?? 0)}%`
}
</script>

<template>
  <div class="flex gap-1">
    <template v-for="i in 11" :key="i">
      <div
        class="flex h-3 rounded-full flex-grow overflow-hidden"
        :class="{ 'bg-sky-200': i <= 8, 'bg-yellow-200': i > 8 && i <= 10, 'bg-rose-200': i > 10 }"
      >
        <div
          class="h-full"
          :class="{ 'bg-sky-800': i <= 8, 'bg-yellow-800': i > 8 && i <= 10, 'bg-rose-800': i > 10 }"
          :style="{ width: getSegmentWidth(i) }"
        ></div>
      </div>
    </template>
  </div>
</template>
