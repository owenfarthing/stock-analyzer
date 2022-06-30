import { createSlice } from "@reduxjs/toolkit";

const initialState = { tabSelected: true };

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
});

export default homeSlice;

export const homeActions = homeSlice.actions;
