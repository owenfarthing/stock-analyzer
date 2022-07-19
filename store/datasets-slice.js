import { createSlice } from "@reduxjs/toolkit";
import { dummyDatasets } from "../components/home/datasets/dummy-datasets";

const initialState = {
  items: dummyDatasets,
  displayedItems: [],
  selectedItems: {},
  selectAll: false,
  currentItem: null,
  sortDesc: true,
  uploadModalShowing: false,
  synopsisShowing: false,
  deleteModalShowing: false,
};

const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    deleteItems(state, action) {
      let search = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.items = state.items.filter((e) => !search.includes(e.fileId));

      state.selectedItems = {};
    },
    setDisplayedItems(state, action) {
      state.displayedItems = action.payload;
    },
    setSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    toggleSelectAll(state) {
      state.items.forEach(
        (e) => (state.selectedItems[e.fileId] = !state.selectAll)
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
    sortItemsAsc(state) {
      state.items.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    sortItemsDesc(state) {
      state.items.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    toggleUploadModal(state) {
      state.uploadModalShowing = !state.uploadModalShowing;
    },
    toggleSynopsis(state) {
      state.synopsisShowing = !state.synopsisShowing;
    },
    toggleDeleteModal(state) {
      state.deleteModalShowing = !state.deleteModalShowing;
    },
  },
});

export default datasetsSlice;

export const datasetsActions = datasetsSlice.actions;
