import { createSlice } from "@reduxjs/toolkit";
import { fetchAllJobs, deleteJob, addJob, editJob } from "./asynJobs";

const initialState = {
  is_loading: false,
  jobs_list: [],
  total_jobs: "",
  num_of_pages: "",
  job_status: { err: null, success: null },
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clear_job_status: (state) => {
      state.job_status.success = null;
      state.job_status.err = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, { payload }) => {
        state.jobs_list = payload.jobs;
        state.total_jobs = payload.totalJobs;
        state.num_of_pages = payload.numOfPages;
        state.is_loading = false;
      })
      .addCase(fetchAllJobs.rejected, (state, { payload }) => {
        state.job_status.err = payload;
        state.is_loading = false;
      })
      .addCase(deleteJob.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.job_status.success = payload;
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.job_status.err = payload;
        state.is_loading = false;
      })
      .addCase(addJob.fulfilled, (state) => {
        state.job_status.success = "Job Added";
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.job_status.err = payload;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.job_status.success = "Job Edited";
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.job_status.err = payload;
      });
  },
});

export default jobsSlice.reducer;
export const jobsActions = jobsSlice.actions;
