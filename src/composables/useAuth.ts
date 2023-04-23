import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../services/firebase'

const useAuth = () => {
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
  return { loginWithGoogle }
}

export default useAuth
