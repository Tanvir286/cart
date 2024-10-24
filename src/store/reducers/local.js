import { createSlice } from '@reduxjs/toolkit'

export const localSlice = createSlice({
  name: 'user',
  initialState: {
    value:null,
  },
  reducers: {
    activeValue: (state,action) => {
         state.value = action.payload;
         console.log("ami active",state.value);
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeValue } = localSlice.actions

export default localSlice.reducer