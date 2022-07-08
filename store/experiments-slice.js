import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../components/home/experiments/dummy-data";

const initialState = {
  items: dummyData,
  selectedItems: {},
  selectAll: false,
  currentItem: null,
  currentPage: 0,
  pages: 1,
  sortDesc: true,
  synopsisShowing: false,
  deleteModalShowing: false,
};

const experimentsSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    deleteItems(state, action) {
      let search = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.items = state.items.filter((e) => !search.includes(e.id));
    },
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPages(state, action) {
      state.pages = action.payload;
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
