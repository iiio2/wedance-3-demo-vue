<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import useEvent from '@/composables/useEvent'

const { fetchEvent, event } = useEvent()

const route = useRoute()
const { id } = route.params

const getFormattedData = (data: string[]) => {
  return new Intl.ListFormat('en', {
    style: 'long',
    type: 'unit'
  }).format(data)
}

watchEffect(() => {
  fetchEvent(id as string)
})
</script>

<template>
  <DefaultLayout>
    <RouterLink class="underline decoration-1" :to="'/user/' + event.username">
      {{ event.username }}
    </RouterLink>
    <RouterLink :to="'/user/' + event.username" class="italic underline underline-offset-2">
    </RouterLink>
    <h3 className="text-3xl">{{ event.organizer }}</h3>
    <h3 className="text-2xl">{{ event.eventName }}</h3>
    <p className="text-xl">{{ event.where }}</p>
    <p className="text-xl">{{ event.price }}</p>
    <p className="text-xl">{{ event.startDate }}</p>
    <p className="text-xl">{{ event.endDate }}</p>
    <p className="text-xl">{{ event.eventType }}</p>
    <p class="text-xl" v-if="event && event.allDanceStyles">
      {{ getFormattedData(event.allDanceStyles) }}
    </p>
    <p class="text-xl" v-if="event && event.allArtists">
      {{ getFormattedData(event.allArtists) }}
    </p>
  </DefaultLayout>
</template>
