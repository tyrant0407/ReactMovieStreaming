import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:null,
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
    loadPerson: (state, action) => {
      state.info = action.payload
     }
    },
    removePerson: (state) => {
      state.info = null
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { loadPerson, removePerson } = personSlice.actions
  
  export default personSlice.reducer