import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice.js";
import jobReducer from "./slice/jobSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
  },
});
