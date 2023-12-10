// jobCardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobItems: JSON.parse(localStorage.getItem("jobItems")) || [],
};

const jobSlice = createSlice({
  name: "appliedjob",
  initialState,
  reducers: {
    setReduxJob: (state, action) => {
      state.jobItems = action.payload;
    },
    addJob: (state, action) => {
      let job = action.payload;
      let oldItems = [...state.jobItems];
      localStorage.setItem("jobItems", JSON.stringify(action.payload));
      oldItems.push(job);

      state.jobItems = oldItems;
    },
  },
});

export const { addJob, setReduxJob } = jobSlice.actions;

export default jobSlice.reducer;
