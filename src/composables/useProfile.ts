import { ref, watchEffect } from 'vue'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import useAuth from './useAuth'

interface Person {
  displayName: string
  email: string
  username: string
  photoURL?: string
  phoneNumber: number
  livingIn: string
  events?: object[]
  image?: any
}

const useProfile = () => {
  const { user } = useAuth()
  const person = ref<Person>({} as Person)
  const profile = ref<Person>({} as Person)
  const loading = ref(false)

  const fetchUser = () => {
    if (user && user.value?.uid) {
      const q = query(collection(db, 'users'), where('uid', '==', user.value.uid))
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          person.value = doc.data() as Person
        })
      })
    }
  }

  const updateUser = (data: Person) => {
    loading.value = true
    if (user && user.value?.uid) {
      const q = query(collection(db, 'users'), where('uid', '==', user.value.uid))
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((query) => {
          const docRef = doc(db, 'users', query.id)
          updateDoc(docRef, {
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            livingIn: data.livingIn,
            photoURL: data.photoURL
          })
          loading.value = false
        })
      })
    }
  }

  const getProfileByUsername = (username: string) => {
    const q = query(collection(db, 'users'), where('username', '==', username))
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        profile.value = doc.data() as Person
      })
    })
  }

  watchEffect(() => {
    fetchUser()
  })

  return { person, profile, updateUser, getProfileByUsername, loading }
}

export default useProfile
