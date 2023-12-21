<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import UiButton from './UiButton.vue'
</script>

<template>
  <Menu as="div" class="relative">
    <div>
      <MenuButton :as="UiButton">
        <slot name="button"></slot>
        <ChevronDownIcon class="w-4 h-4"></ChevronDownIcon>
      </MenuButton>
    </div>

    <MenuItems
      class="absolute mt-1 left-0 backdrop-blur-md bg-gray-200/50 border border-gray-300/50 shadow-xl z-40 w-max p-1 rounded-lg"
    >
      <div>
        <slot></slot>
      </div>
    </MenuItems>
  </Menu>
</template>
