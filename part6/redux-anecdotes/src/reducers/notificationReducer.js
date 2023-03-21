import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification: (state, action) => action.payload,
      resetNotification: (state, action) => null
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const showNotification = (message) => dispatch => {
    dispatch(setNotification(message));
    setTimeout(() => {
        dispatch(resetNotification())
    }, 5000)
}

export default notificationSlice.reducer