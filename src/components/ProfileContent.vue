<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'
import useProfile from '@/composables/useProfile'

const { person, profile, getProfileByUsername } = useProfile()

const route = useRoute()
const router = useRouter()

const { id } = route.params

watchEffect(() => {
  if (!id) return
  getProfileByUsername(id as string)
})
</script>

<template>
  <div className="avatar flex justify-between items-center h-48">
    <div class="profile-content">
      <h3 class="text-3xl">{{ person.displayName || profile.displayName }}</h3>
      <p>{{ person.email || profile.email }}</p>
      <RouterLink
        class="underline decoration-1"
        :to="'/user/' + person.username || profile.username"
      >
        {{ person.username || profile.username }}
      </RouterLink>
      <p>{{ person.phoneNumber || profile.phoneNumber }}</p>
      <p>{{ person.livingIn || profile.livingIn }}</p>
    </div>

    <div className="rounded-full">
      <img :src="person.photoURL || profile.photoURL" />
    </div>

    <div class="btn-group pt-24" v-if="!id">
      <button @click="router.push(`/edit-profile`)" className="btn btn-info">+ Edit Profile</button>
      <button @click="router.push(`/new`)" className="btn btn-primary ml-4">+ Add Event</button>
    </div>
  </div>
</template>
