<script setup lang="ts">
export type UiButtonType = 'primary' | 'default'

withDefaults(defineProps<{ buttonType?: UiButtonType }>(), { buttonType: 'default' })
</script>

<template>
  <button
    class="flex items-center gap-2 px-3 py-1 text-sm rounded border cursor-default select-none"
    :class="{
      'bg-sky-500 border-t-sky-400 border-x-sky-400 border-b-sky-600 text-white':
        buttonType === 'primary',
      'hover:bg-sky-600 hover:border-t-sky-500 hover:border-x-sky-500 hover:border-b-sky-700':
        buttonType === 'primary',
      'active:bg-sky-700 active:border-t-sky-800 active:border-x-sky-800 active:border-b-sky-800':
        buttonType === 'primary',
      'bg-gray-100 border-t-gray-300 border-x-gray-300 border-b-gray-400': buttonType === 'default',
      'hover:bg-gray-200 hover:border-t-gray-300 hover:border-x-gray-300 hover:border-b-gray-400':
        buttonType === 'default',
      'active:bg-gray-300 active:border-t-gray-400 active:border-x-gray-400 active:border-b-gray-400':
        buttonType === 'default',
    }"
  >
    <slot></slot>
  </button>
</template>
