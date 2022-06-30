import { createSlice } from "@reduxjs/toolkit";

const initialState = { tabSelected: true };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export default profileSlice;

export const profileActions = profileSlice.actions;
