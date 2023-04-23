<script setup lang="ts">
import useAuth from '../composables/useAuth'
import home from '../assets/home.jpg'

const { loginWithGoogle } = useAuth()
</script>

<template>
  <div class="hero min-h-screen" :style="{ backgroundImage: 'url(' + home + ')' }">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello, WeDance</h1>
        <p class="mb-5">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button @click="loginWithGoogle" class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</template>
