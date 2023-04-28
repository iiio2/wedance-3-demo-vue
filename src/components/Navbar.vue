<script setup lang="ts">
import { RouterLink } from 'vue-router'
import useAuth from '@/composables/useAuth'

const { user, logout } = useAuth()
</script>

<template>
  <div class="navbar bg-primary text-primary-content flex justify-center">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary"
      >
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li v-if="user">
          <RouterLink to="/profile">Profile</RouterLink>
        </li>
        <li>
          <RouterLink to="/events">Events</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact">Contact</RouterLink>
        </li>
        <li v-if="user" @click="logout">
          <a>Logout</a>
        </li>
      </ul>
    </div>
    <RouterLink to="/" class="btn btn-ghost normal-case text-xl">WeDance</RouterLink>
  </div>
</template>
