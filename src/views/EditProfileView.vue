<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { uploadBytes, getDownloadURL, ref as firebaseRef } from 'firebase/storage'
import { toast } from 'vue3-toastify'
import { storage } from '@/services/firebase'
import useProfile from '@/composables/useProfile'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import WithSpinner from '@/components/WithSpinner.vue'

const { person, updateUser } = useProfile()

const data = ref({
  displayName: '',
  email: '',
  username: '',
  phoneNumber: 0,
  livingIn: '',
  image: null,
  photoURL: ''
})

watchEffect(() => {
  data.value.displayName = person.value.displayName
  data.value.email = person.value.email
  data.value.username = person.value.username
  data.value.phoneNumber = person.value.phoneNumber
  data.value.livingIn = person.value.livingIn
  data.value.photoURL = person.value.photoURL!
})

const handleSubmit = () => {
  if (data.value.image?.name) {
    const imageRef = firebaseRef(storage, `images/${data.value.image?.name}`)
    uploadBytes(imageRef, data.value?.image).then((snapshot) => {
      getDownloadURL(firebaseRef(storage, `images/${data.value.image?.name}`)).then((url) => {
        data.value.photoURL = url
        updateUser(data.value)
        toast.success('Profile Updated')
      })
    })
    return
  }
  updateUser(data.value)
  toast.success('Profile Updated')
}
</script>

<template>
  <WithSpinner>
    <DefaultLayout>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="label">
            <span className="label-text">Display Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.displayName"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.email"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.username"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.phoneNumber"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span className="label-text">Living In</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="data.livingIn"
          />
        </div>

        <div className="form-group">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <div className="avatar flex justify-between items-center">
            <div className="rounded-full">
              <img :src="data.photoURL" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="label">
            <span className="label-text">Change Photo</span>
          </label>
          <input
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
            @change="data.image = $event.target?.files[0]"
          />
        </div>

        <button type="submit" class="btn my-2">Submit</button>
      </form>
    </DefaultLayout>
  </WithSpinner>
</template>
