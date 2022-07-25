import { createSlice } from '@reduxjs/toolkit'

// reducers 內放 commit 直接修改資料
const notificationSlice = createSlice({
  name: 'notifiaction',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

// 可以直接 export commit function
export const { setNotification } = notificationSlice.actions

let timerId = null

// export dispatch function
export const createNotification = (notification, delay = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))

    if (timerId) clearTimeout(timerId)

    timerId = setTimeout(() => dispatch(setNotification(null)), delay * 1000)
  }
}

export default notificationSlice.reducer
