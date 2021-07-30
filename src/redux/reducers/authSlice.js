import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: localStorage.getItem("jwt") !== null ? true : false,
  token: localStorage.getItem("jwt"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      console.log("payload", action.payload.data.user);
    },
    logout: (state) => {
      state.user = {};
      state.token = localStorage.clear("jwt");
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
