<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import ToolbarButton from './ToolbarButton.vue'
</script>

<template>
  <Menu as="div" class="relative">
    <div>
      <MenuButton :as="ToolbarButton">
        <slot name="button"></slot>
      </MenuButton>
    </div>

    <MenuItems
      class="absolute mt-1 left-0 backdrop-blur-md bg-gray-200/50 shadow-xl z-40 w-max p-2 rounded-lg"
    >
      <div>
        <slot></slot>
      </div>
    </MenuItems>
  </Menu>
</template>
