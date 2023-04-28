<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    type="text"
    name="query"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    placeholder="Search by Organizer, Name, Dance Styles, Location..."
    class="input input-bordered w-full"
  />
</template>
