<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import UiButton, { type UiButtonType } from './UiButton.vue'

export type ButtonDefinition = {
  label: string
  type?: UiButtonType
  onClick: () => void
}

defineProps<{
  title?: string
  isOpen: boolean
  buttons: ButtonDefinition[]
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Dialog
      :open="isOpen"
      @close="$emit('close')"
      class="grid items-center justify-center fixed inset-0 bg-black/20 p-8"
    >
      <DialogPanel class="bg-white shadow-2xl w-[600px] max-w-full rounded-xl p-4">
        <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

        <slot></slot>

        <div class="flex justify-end gap-2 mt-4">
          <template v-for="(button, index) in buttons" :key="index">
            <UiButton @click="button.onClick()" :button-type="button.type">{{ button.label }}</UiButton>
          </template>
        </div>
      </DialogPanel>
    </Dialog>
  </Teleport>
</template>
