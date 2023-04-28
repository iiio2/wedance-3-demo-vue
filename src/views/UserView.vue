<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import useEvent from '@/composables/useEvent'
import useProfile from '@/composables/useProfile'
import ProfileContent from '@/components/ProfileContent.vue'
import ProfileEvents from '@/components/ProfileEvents.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const { getProfileByUsername } = useProfile()
const { getEventsByUsername } = useEvent()

const route = useRoute()
const { id } = route.params

watchEffect(() => {
  getProfileByUsername(id as string)
  getEventsByUsername(id as string)
})
</script>

<template>
  <DefaultLayout>
    <ProfileContent />
    <ProfileEvents />
  </DefaultLayout>
</template>
