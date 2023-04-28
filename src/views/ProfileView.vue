<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import WithSpinner from '@/components/WithSpinner.vue'
import ProfileContent from '@/components/ProfileContent.vue'
import ProfileEvents from '@/components/ProfileEvents.vue'
</script>

<template>
  <WithSpinner>
    <DefaultLayout>
      <ProfileContent />
      <ProfileEvents />
    </DefaultLayout>
  </WithSpinner>
</template>
