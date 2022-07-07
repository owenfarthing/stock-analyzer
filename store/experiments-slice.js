import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../components/home/experiments/dummy-data";

const initialState = {
  items: dummyData,
  selectedItems: {},
  selectAll: false,
  currentItem: null,
  sortDesc: true,
  synopsisShowing: false,
  deleteModalShowing: false,
};

const experimentsSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    toggleSelectAll(state) {
      state.items.forEach(
        (e) => (state.selectedItems[e.id] = !state.selectAll)
      );
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
