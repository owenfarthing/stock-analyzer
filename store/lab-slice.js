import { createSlice } from "@reduxjs/toolkit";

const stages = ["name", "data", "network", "loading", "results"];

const prototype = {
  id: "",
  uid: "",
  name: "",
  date: "",
  dataset: {
    fileId: "",
    filename: "",
    recordCount: 0,
    span: 0,
    offset: 0,
    dataColumn: null,
    timeColumn: null,
  },
  params: {
    split: 0,
    iterations: 0,
    patience: 0,
  },
  results: {
    duration: "",
    rmse: 0,
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
    setDatasetParams(state, action) {
      const {
        fileId,
        filename,
        recordCount,
        span,
        offset,
        dataColumn,
        timeColumn,
      } = action.payload;
      state.currentData.dataset.fileId = fileId;
      state.currentData.dataset.filename = filename;
      state.currentData.dataset.recordCount = recordCount;
      state.currentData.dataset.span = span;
      state.currentData.dataset.offset = offset || 0;
      state.currentData.dataset.dataColumn = dataColumn;
      state.currentData.dataset.timeColumn = timeColumn;
    },
  },
});

export default labSlice;

export const labActions = labSlice.actions;
