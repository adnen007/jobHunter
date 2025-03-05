import { createSlice } from "@reduxjs/toolkit";
import { fetchAllJobs, deleteJob, addJob, editJob } from "./jobsAsync";

const initialState = {
  isLoading: false,
  jobList: [],
  totalJobs: "",
  totalPages: "",
  err: null,
};
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobList = payload.jobList;
        state.totalJobs = payload.totalJobs;
        state.totalPages = payload.totalPages;
      })
      .addCase(fetchAllJobs.rejected, (state, { payload }) => {
        state.err = payload;
        state.isLoading = false;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.err = payload;
        state.isLoading = false;
      })
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJob.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.err = payload;
        state.isLoading = false;
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.err = payload;
        state.isLoading = false;
      });
  },
});

export default jobsSlice.reducer;
export const jobsActions = jobsSlice.actions;
