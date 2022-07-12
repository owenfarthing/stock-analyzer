import homeSlice from "./home-slice";
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile-slice";
import manageSlice from "./manage-slice";
import roleSlice from "./role-slice";
import experimentsSlice from "./experiments-slice";
import labSlice from "./lab-slice";
import datasetsSlice from "./datasets-slice";

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    profile: profileSlice.reducer,
    manage: manageSlice.reducer,
    role: roleSlice.reducer,
    experiments: experimentsSlice.reducer,
    lab: labSlice.reducer,
    datasets: datasetsSlice.reducer,
  },
});

export default store;
