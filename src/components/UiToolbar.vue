<template>
  <div class="flex items-center gap-8 px-4 py-2 bg-gray-50 border-b border-gray-300">
    <slot></slot>

    <div class="ml-auto flex items-center gap-2">
      <slot name="right"></slot>
    </div>
  </div>
</template>
