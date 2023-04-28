<script setup lang="ts">
import { reactive } from 'vue'
const styleObject = reactive({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})
</script>

<template>
  <div :style="styleObject">
    <div class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
      <div
        class="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64"
      ></div>
    </div>
  </div>
</template>
