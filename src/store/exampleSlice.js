import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
  },
})

export const { setMessage } = exampleSlice.actions
export default exampleSlice.reducer
