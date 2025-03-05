import { createSlice } from "@reduxjs/toolkit";
import fetchStats from "./statsAsync";

const initialState = {
  isLoading: true,
  error: null,
  status: {},
  history: [],
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.history = payload.history;
      })
      .addCase(fetchStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default statsSlice.reducer;
