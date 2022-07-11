import { createSlice } from "@reduxjs/toolkit";

const initialState = { tabSelected: true };

const manageSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {},
});

export default manageSlice;

export const manageActions = manageSlice.actions;
