import homeSlice from "./home-slice";
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile-slice";
import settingsSlice from "./settings-slice";
import roleSlice from "./role-slice";

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    profile: profileSlice.reducer,
    settings: settingsSlice.reducer,
    role: roleSlice.reducer,
  },
});

export default store;
