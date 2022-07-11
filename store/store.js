import homeSlice from "./home-slice";
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile-slice";
import manageSlice from "./manage-slice";
import roleSlice from "./role-slice";
import experimentsSlice from "./experiments-slice";

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    profile: profileSlice.reducer,
    manage: manageSlice.reducer,
    role: roleSlice.reducer,
    experiments: experimentsSlice.reducer,
  },
});

export default store;
