import axios from 'axios'
import history from '../history'

const GET_ONE_EVENT = 'GET_EVENT'
const ADD_EVENT = 'ADD_EVENT'
const ADD_INVITES = 'ADD_INVITES'
const DELETE_EVENT = 'DELETE_EVENT'
const GET_USER_EVENTS = 'GET_USER_EVENTS '
const GET_USER_EVENTS_AS_HOST = 'GET_USER_EVENTS_AS_HOST'

const getEvent = data => ({
  type: GET_ONE_EVENT,
  event: data.event,
  count: data.count
})

const getUserEvents = events => ({
  type: GET_USER_EVENTS,
  events
})

const getUserEventsAsHost = events => ({
  type: GET_USER_EVENTS_AS_HOST,
  events
})

const addInvites = invitees => ({
  type: ADD_INVITES,
  members: invitees.members,
  nonMembers: invitees.nonMembers
})

export const updateUserAttendance = (eventId, dec) => async dispatch => {
  try {
    const decision = {
      decision: dec
    }
    const {data} = await axios.put(
      `/api/events/${eventId}/updateUser`,
      decision
    )
    dispatch(getEvent(data))
  } catch (err) {
    console.error(err)
  }
}

export const createInvites = (invitees, eventId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/events/invite`, invitees)
      dispatch(getEvent(data))
      history.push(`/events/${eventId}/guests`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchEvent = id => {
  return async dispatch => {
    try {
      const {data} = await axios(`/api/events/${id}`)
      console.log('DATA', data)
      dispatch(getEvent(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteEvent = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/events/${id}/delete`)
      dispatch(getUserEvents(data))
      dispatch(getUserEventsAsHost(data))
      history.push(`/`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateEvent = (event, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/events/${id}/edit`, event)
      dispatch(getEvent(data))
      alert('Your changes have been made') //to be changed for better alert
      history.push(`/events/${id}/details`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchUserEvents = upcomingOrPast => {
  return async dispatch => {
    try {
      const {data} = await axios(`/api/users/me/${upcomingOrPast}`)
      dispatch(getUserEvents(data))
      dispatch(getUserEventsAsHost(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createEvent = event => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/events/add', event)
      dispatch(getEvent(data))
      history.push(`/events/${data.id}`)
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

const initialState = {
  events: [],
  myEvents: [],
  currEvent: {},
  invitees: [],
  attendingCount: 0,
  organizer: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_EVENTS: {
      const eventGuest = []
      action.events.map(ev => {
        if (ev.isOrganizer !== true) {
          eventGuest.push({...ev})
        }
      })
      return {...state, events: eventGuest}
    }
    case GET_USER_EVENTS_AS_HOST: {
      const eventHost = []
      action.events.map(ev => {
        if (ev.isOrganizer === true) {
          eventHost.push({...ev})
        }
      })
      return {...state, myEvents: eventHost}
    }
    case GET_ONE_EVENT: {
      // let isHost = false
      // if(action.event.users_events[0].isOrganizer === true) {
      //   isHost = true
      // }
      return {...state, currEvent: action.event, attendingCount: action.count}
    }
    case ADD_EVENT: {
      return {...state, currEvent: action.event}
    }
    default:
      return state
  }
}
