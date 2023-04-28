<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import Spinner from './Spinner.vue'
import NotFound from './NotFound.vue'

const { user, loading } = useAuth()
</script>

<template>
  <div v-if="loading">
    <Spinner />
  </div>
  <div v-else-if="!user && !user?.uid">
    <NotFound />
  </div>
  <div v-else>
    <slot />
  </div>
</template>
