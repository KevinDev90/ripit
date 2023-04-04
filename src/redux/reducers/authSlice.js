import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return (state = {
        ...state,
        user: action.payload.user,
      });
    },
    login: (state, action) => {
      return (state = {
        user: action.payload,
        token: action.payload.accessToken,
      });
    },
    logout: (state, action) => {
      return (state = {
        user: null,
        token: null,
      });
    },
  },
});

export const { updateUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
