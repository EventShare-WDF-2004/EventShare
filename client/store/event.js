import axios from 'axios'
import history from '../history'

const GET_EVENTS = 'GET_EVENTS'
const GET_ONE_EVENT = 'GET_EVENT'
const ADD_EVENT = 'ADD_EVENT'
const ADD_INVITEES = 'ADD_INVITEES'
const UPDATE_USER_EVENT = 'UPDATE_USER_EVENT'

const updatedUserEvent = events => ({
  type: UPDATE_USER_EVENT,
  events
})

const getEvents = events => ({
  type: GET_EVENTS,
  events
})

const getEvent = event => ({
  type: GET_ONE_EVENT,
  event
})

const addInvitees = invitees => ({
  type: ADD_INVITEES,
  invitees
})

export const updateUserEvents = (eventId, dec) => async dispatch => {
  try {
    const decision = {
      decision: dec
    }
    const {data} = await axios.put(`/api/users/me/${eventId}`, decision)
    dispatch(updatedUserEvent(data))
  } catch (err) {
    console.error(err)
  }
}

export const createInvitees = invitees => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/events/invite`, invitees)
      dispatch(addInvitees(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const sendEmail = email => {
  const obj = {
    email: email
  }
  return dispatch => {
    try {
      return axios.put(`/api/events/sent/invate`, obj)
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchEvent = id => {
  return async dispatch => {
    try {
      const {data} = await axios(`/api/events/${id}`)
      dispatch(getEvent(data))
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
  currEvent: {},
  invitees: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_EVENT: {
      return {...state, currEvent: action.event}
    }
    case ADD_EVENT: {
      return {...state, currEvent: action.event}
    }
    case ADD_INVITEES: {
      return {...state, invitees: action.invitees}
    }

    default:
      return state
  }
}
