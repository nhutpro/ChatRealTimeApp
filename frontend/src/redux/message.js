import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  current: [],
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    renew: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const { renew } = messageSlice.actions;
export default messageSlice.reducer;
