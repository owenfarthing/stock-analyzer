import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privileges: { isAuthenticated: true, isUser: false, isAdmin: true },
  username: "",
  isAuthOpen: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setPrivileges(state, action) {
      state.privileges = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    toggleAuth(state) {
      state.isAuthOpen = !state.isAuthOpen;
    },
  },
});

export default roleSlice;

export const roleActions = roleSlice.actions;
