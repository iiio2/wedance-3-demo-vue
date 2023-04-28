import { ref, watchEffect } from 'vue'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  onSnapshot
} from 'firebase/firestore'

import { db } from '@/services/firebase'
import useAuth from './useAuth'
import useProfile from './useProfile'

export interface Event {
  id?: string
  username?: string
  organizer: string
  eventName: string
  tickets: string
  facebookEvent: string
  startDate: string
  endDate: string
  where: string
  price: string
  eventType: string
  allDanceStyles: string[]
  allArtists: string[]
  bookmark?: boolean
}

const useEvent = () => {
  const { user } = useAuth()
  const { person } = useProfile()
  const eventsOfOwner = ref<Event[]>([])
  const events = ref<Event[]>([])
  const event = ref<Event>({} as Event)
  const bookmarked = ref()

  const addEvent = (data: Event) => {
    if (user && user.value?.uid) {
      addDoc(collection(db, 'events'), {
        owner: user.value.uid,
        username: person.value.username,
        organizer: data.organizer,
        eventName: data.eventName,
        tickets: data.tickets,
        facebookEvent: data.facebookEvent,
        startDate: data.startDate,
        endDate: data.endDate,
        where: data.where,
        price: data.price,
        eventType: data.eventType,
        allDanceStyles: data.allDanceStyles,
        allArtists: data.allArtists,
        bookmark: false
      })
    }
  }

  const allEvents = () => {
    const querySnapshot = getDocs(collection(db, 'events'))
    let allEvents: Event[] = []
    querySnapshot.then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          allEvents.push({ id: doc.id, ...doc.data() } as Event)
        }
      })
      events.value = allEvents
    })
  }

  const getEventsByOwner = () => {
    if (user && user.value?.uid) {
      let events: Event[] = []
      const q = query(
        collection(db, 'events'),
        where('owner', '==', user.value.uid),
        orderBy('bookmark', 'desc')
      )

      onSnapshot(q, (querySnapshot) => {
        const events: any = []
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() })
        })
        eventsOfOwner.value = events
      })
    }
  }

  const deleteEvent = (event: Event) => {
    if (event.id) {
      deleteDoc(doc(db, 'events', event.id))
    }
  }

  const fetchEvent = (eventId: string) => {
    if (eventId) {
      const docRef = doc(db, 'events', eventId)
      getDoc(docRef).then((doc) => {
        event.value = doc.data() as Event
      })
    }
  }

  const updateEvent = (data: Event, eventId: string) => {
    if (user && user.value?.uid) {
      const docRef = doc(db, 'events', eventId)
      updateDoc(docRef, {
        organizer: data.organizer,
        eventName: data.eventName,
        tickets: data.tickets,
        facebookEvent: data.facebookEvent,
        startDate: data.startDate,
        endDate: data.endDate,
        where: data.where,
        price: data.price,
        eventType: data.eventType,
        allDanceStyles: data.allDanceStyles,
        allArtists: data.allArtists
      })
    }
  }

  const bookmarkEvent = (eventId: string) => {
    if (user && user.value?.uid) {
      const docRef = doc(db, 'events', eventId)

      const event = getDoc(docRef)
      event.then((doc) => {
        if (doc.exists()) {
          const status = doc.data().bookmark
          bookmarked.value = status
          updateDoc(docRef, {
            bookmark: !status
          })
        }
      })
    }
  }

  const getEventsByUsername = (username: string) => {
    const q = query(collection(db, 'events'), where('username', '==', username))
    const allEvents: Event[] = []
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allEvents.push({ id: doc.id, ...doc.data() } as Event)
      })
      events.value = allEvents
    })
  }

  watchEffect(() => {
    allEvents()
    getEventsByOwner()
  })

  const deleteEventOfOwner = (event: Event) => {
    const index = eventsOfOwner.value.findIndex((i) => i.id === event.id)
    eventsOfOwner.value.splice(index, 1)
    deleteEvent(event)
  }

  return {
    addEvent,
    events,
    eventsOfOwner,
    deleteEvent,
    fetchEvent,
    event,
    updateEvent,
    bookmarkEvent,
    getEventsByUsername,
    bookmarked,
    deleteEventOfOwner
  }
}

export default useEvent
