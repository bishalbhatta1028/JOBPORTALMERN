// jobCardSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Audio } from "react-loader-spinner";
const initialState = {
  postedItems: [],
};

const postedjobSlice = createSlice({
  name: "postedjob",
  initialState,
  reducers: {
    setReduxPostedJob: (state, action) => {
      state.postedItems = action.payload;
    },
    postJob: (state, action) => {
      let job = action.payload;
      let oldItems = [...state.postedItems];

      oldItems.push(job);

      state.postedItems = oldItems;
    },
  },
});

export const { postJob, setReduxPostedJob } = postedjobSlice.actions;

export default postedjobSlice.reducer;
