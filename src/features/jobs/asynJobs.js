import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

export const fetchAllJobs = createAsyncThunk("fetch/jobs", async (payload, thunkAPI) => {
  try {
    const res = await axios(`/jobs?${payload}`);
    return res.data;
  } catch (err) {
    toast.error("something went wrong");
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const deleteJob = createAsyncThunk(
  "delete/job",
  async ({ id, path }, thunkAPI) => {
    try {
      await axios.delete(`/jobs/${id}`);
      toast.success("Job Deleted");
      thunkAPI.dispatch(fetchAllJobs(path));
      return null;
    } catch (err) {
      toast.error(err.response.data.msg);
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const addJob = createAsyncThunk("add/job", async (payload, thunkAPI) => {
  try {
    await axios.post("/jobs", payload);
    toast.success("Job added");
    return null; //  Returning null to indicate no data is required from this action.
  } catch (err) {
    toast.error(err.response.data.msg);
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const editJob = createAsyncThunk("edit/job", async ({ id, payload }, thunkAPI) => {
  try {
    await axios.patch(`/jobs/${id}`, payload);
    toast.success("Job edited");
    return null;
  } catch (err) {
    toast.error(err.response.data.msg);
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});
