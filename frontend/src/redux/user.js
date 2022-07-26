import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  current: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.current = action.payload;
    },
    logout: (state) => (state = initialState),
  },
});
export const {loginSuccess, logout} = userSlice.actions;
export default userSlice.reducer;