<script setup lang="ts">
import { ref, computed } from 'vue'
import useEvent from '@/composables/useEvent'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SearchBox from '@/components/SearchBox.vue'

const searchQuery = ref('')
const { events } = useEvent()

const allEvents = computed(() => {
  if (searchQuery.value) {
    return events.value.filter(
      (event) =>
        event.eventName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.where.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.allDanceStyles.some((style) =>
          style.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    )
  } else {
    return events.value
  }
})
</script>

<template>
  <DefaultLayout>
    <SearchBox v-model="searchQuery" />
    <RouterLink v-for="event in allEvents" :to="`/event/${event?.id}`" :key="event.id">
      <div class="border-l-4 border-sky-500 my-2 px-2 bg-sky-100">
        <h3>Organizer: {{ event.organizer }}</h3>
        <p>Event: {{ event.eventName }}</p>
        <p>Price: {{ event.price }}</p>
      </div>
    </RouterLink>
  </DefaultLayout>
</template>
