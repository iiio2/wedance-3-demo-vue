<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'
import useEvent from '@/composables/useEvent'

const { bookmarkEvent, eventsOfOwner, getEventsByUsername, deleteEventOfOwner, events } = useEvent()

const route = useRoute()
const router = useRouter()

const { id } = route.params

watchEffect(() => {
  if (!id) return
  getEventsByUsername(id as string)
})

const allEvents = id ? events : eventsOfOwner
</script>

<template>
  <div
    v-for="event in allEvents"
    :key="event.id"
    className="flex justify-between items-center bg-sky-100 my-2"
  >
    <div
      @click="router.push({ name: 'event', params: { id: event.id } })"
      :key="event.id"
      className="border-l-4 border-sky-500 px-2 cursor-pointer grow bg-sky-100"
    >
      <div className="event-short-info">
        <h3>Organizer: {{ event.organizer }}</h3>
        <p>Event: {{ event.eventName }}</p>
        <p>Price: {{ event.price }}</p>
      </div>
    </div>
    <div className="border-sky-500 my-2 px-2 bg-sky-100 flex justify-between">
      <div className="btn-group" v-if="!id">
        <div className="edit-btn">
          <button
            @click="()=>{
            bookmarkEvent(event.id!); 
          }"
            className="btn btn-warning"
          >
            {{ !event.bookmark ? 'Bookmark' : 'Unbookmark' }}
          </button>
        </div>
        <div className="edit-btn">
          <RouterLink :to="event.id!" className="btn btn-accent mx-1"> Edit </RouterLink>
        </div>
        <div className="delete-btn">
          <button @click="deleteEventOfOwner(event)" className="btn btn-error">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
