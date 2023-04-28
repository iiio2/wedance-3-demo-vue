<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import useEvent from '@/composables/useEvent'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import WithSpinner from '@/components/WithSpinner.vue'

const data = ref({
  organizer: '',
  eventName: '',
  tickets: '',
  facebookEvent: '',
  startDate: '',
  endDate: '',
  where: '',
  price: '',
  eventType: '',
  danceStyle: '',
  artist: '',
  allDanceStyles: [] as string[],
  allArtists: [] as string[]
})

const { addEvent, fetchEvent, event, updateEvent } = useEvent()

const route = useRoute()

const { id } = route.params

const eventTypes = ['Party', 'Workshop', 'Course', 'Festival', 'Other']
const allDanceStyles = ['Allemande', 'Balboa', 'Ballet', 'Casino', 'Salsa']

const saveallArtists = (event: KeyboardEvent) => {
  event.preventDefault()
  if (data.value.artist) {
    data.value.allArtists.push(data.value.artist)
    data.value.artist = ''
  }
}

watchEffect(() => {
  if (data.value.danceStyle) {
    data.value.allDanceStyles.push(data.value.danceStyle)
  }
})

watchEffect(() => {
  if (id === 'new') return
  fetchEvent(id as string)
})

watchEffect(() => {
  data.value.organizer = event.value.organizer
  data.value.eventName = event.value.eventName
  data.value.tickets = event.value.tickets
  data.value.facebookEvent = event.value.facebookEvent
  data.value.startDate = event.value.startDate
  data.value.endDate = event.value.endDate
  data.value.where = event.value.where
  data.value.price = event.value.price
  data.value.eventType = event.value.eventType
  data.value.allDanceStyles = event.value.allDanceStyles
  data.value.allArtists = event.value.allArtists
})

const handleSubmit = () => {
  const { artist, danceStyle, ...rest } = data.value
  if (id === 'new') {
    addEvent(rest)
    toast.success('Event Added')
    return
  }
  updateEvent(rest, id as string)
  toast.success('Event Updated')
}
</script>

<template>
  <WithSpinner>
    <DefaultLayout>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="label">
            <span className="label-text">Organizer</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.organizer"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Event Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.eventName"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Tickets</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.tickets"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Facebook Event</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.facebookEvent"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.startDate"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.endDate"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Where</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.where"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.price"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Event Type</span>
          </label>
          <select v-model="data.eventType" class="select select-bordered w-full max-w-xs">
            <option disabled value="">Please select one</option>
            <option v-for="eventType of eventTypes">{{ eventType }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="label">
            <span className="label-text">Dance Styles</span>
          </label>
          <div v-for="(danceStyle, index) in data.allDanceStyles">
            {{ danceStyle }} |
            <button class="btn" @click="data.allDanceStyles.splice(index, 1)">X</button>
          </div>
          <select v-model="data.danceStyle" class="select select-bordered w-full max-w-xs">
            <option disabled value="">Choose Dance Style</option>
            <option v-for="danceStyle of allDanceStyles">{{ danceStyle }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="label">
            <span className="label-text">Artists (use `space` to add artist)</span>
          </label>
          <div v-for="(artist, index) in data.allArtists">
            {{ artist }} |
            <button
              class="btn"
              @click="
                (event) => {
                  event.preventDefault()
                  data.allArtists.splice(index, 1)
                }
              "
            >
              X
            </button>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.artist"
            @keyup.space="saveallArtists"
          />
        </div>

        <button type="submit" class="btn my-2">Submit</button>
      </form>
    </DefaultLayout>
  </WithSpinner>
</template>
