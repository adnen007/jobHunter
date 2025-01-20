import { createSlice } from "@reduxjs/toolkit";
import fetchStats from "./statsAsync";

const initialState = {
  is_loading: false,
  error: null,
  data: {
    "defaultStats": {
      "pending": 0,
      "interview": 0,
      "declined": 0,
    },
    "monthlyApplications": [],
  },
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.is_loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
