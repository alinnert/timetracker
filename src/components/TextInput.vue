<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  if (!(event.target instanceof HTMLInputElement)) return
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input
    type="text"
    class="px-3 py-1 border border-gray-300 rounded"
    :value="modelValue"
    @input="handleInput"
  />
</template>
