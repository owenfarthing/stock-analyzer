import { createSlice } from "@reduxjs/toolkit";

const initialState = { tabSelected: true };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});

export default settingsSlice;

export const settingsActions = settingsSlice.actions;
