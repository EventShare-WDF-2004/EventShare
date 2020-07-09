import axios from '../axios-lists'

const GET_NOTIFICATION = 'GET_NOTIFICATION'

export const getNotification = () => dispatch => {
  axios
    .get(`/api/notification`)
    .then(res =>
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}

export const checkNotification = () => dispatch => {
  axios.put(`/api/notification/check`).catch(err => console.log(err))
}

export const removeNotification = id => dispatch => {
  axios
    .delete(`/api/notification/${id}`)
    .then(res => dispatch(getNotification()))
    .catch(err => console.log(err))
}
