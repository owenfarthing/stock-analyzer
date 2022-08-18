import { createSlice } from "@reduxjs/toolkit";

const stages = ["name", "data", "network", "summary", "loading", "results"];

const prototype = {
  id: "",
  uid: "",
  name: "",
  date: "",
  dataset_id: "",
  params: {
    split: "",
    iterations: "",
    patience: "",
  },
  results: {
    id: "",
    duration: "",
    rmse: "",
  },
};

const initialState = {
  cancelModalShowing: false,
  currentStage: 0,
  currentData: prototype,
};

const labSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {
    toggleCancelModal(state) {
      state.cancelModalShowing = !state.cancelModalShowing;
    },
    moveCurrentStage(state, action) {
      state.currentStage += 1 * action.payload;
    },
    setCurrentStage(state, action) {
      if (stages.includes(action.payload))
        state.currentStage = stages.indexOf(action.payload);
    },
    setMetadata(state, action) {
      const { uid, name } = action.payload;
      state.currentData.id = Math.trunc(Math.random() * 10 ** 8).toString();
      state.currentData.uid = uid;
      state.currentData.name = name;
      state.currentData.date = new Date().toLocaleDateString();
    },
    setDataset(state, action) {
      state.currentData.dataset_id = action.payload;
    },
    setParams(state, action) {
      state.currentData.params = action.payload;
    },
  },
});

export default labSlice;

export const labActions = labSlice.actions;
