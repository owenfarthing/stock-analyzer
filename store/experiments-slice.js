import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  synopsisShowing: false,
  deleteModalShowing: false,
  currentItem: null,
  selectedItems: {},
  sortDesc: true,
  selectAll: false,
};

const experimentsSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    toggleSelectAll(state) {
      for (let e in state.selectedItems) {
        state.selectedItems[e] = !state.selectAll;
      }
      state.selectAll = !state.selectAll;
    },
    addSelectedItem(state, action) {
      state.selectedItems[action.payload] = true;
    },
    removeSelectedItem(state, action) {
      state.selectedItems[action.payload] = false;
    },
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
    toggleSortOrder(state) {
      state.sortDesc = !state.sortDesc;
    },
    toggleSynopsis(state) {
      state.synopsisShowing = !state.synopsisShowing;
    },
    toggleDeleteModal(state) {
      state.deleteModalShowing = !state.deleteModalShowing;
    },
  },
});

export default experimentsSlice;

export const experimentsActions = experimentsSlice.actions;
