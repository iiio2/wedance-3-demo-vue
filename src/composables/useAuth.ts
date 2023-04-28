import { ref, onMounted } from 'vue'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import router from '@/router'
import { auth, db } from '../services/firebase'

interface User {
  uid: string
}

const useAuth = () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser
        loading.value = false
      } else {
        user.value = null
        loading.value = false
      }
    })
  })

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then((result) => {
      const { displayName, email, photoURL, phoneNumber, uid } = result.user

      const username = email?.split('@')[0]

      const q = query(collection(db, 'users'), where('email', '==', email))

      getDocs(q).then((querySnapshot) => {
        const user: string[] = []

        querySnapshot.forEach((doc) => {
          user.push(doc.id)
        })

        if (user.length > 0) {
          window.location.href = '/profile'
          return
        }
        addDoc(collection(db, 'users'), {
          displayName,
          email,
          username,
          photoURL,
          phoneNumber,
          createdAt: new Date(),
          livingIn: '',
          uid
        }).then((docRef) => {
          window.location.href = '/profile'
        })
      })
    })
  }

  const logout = () => {
    signOut(auth).then(() => {
      router.push('/')
      //toast.success("You are logged out");
    })
  }

  return { loginWithGoogle, user, logout, loading }
}

export default useAuth
