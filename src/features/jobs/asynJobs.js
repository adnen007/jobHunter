import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllJobs = createAsyncThunk("fetch/jobs", async (payload, thunkAPI) => {
  try {
    const res = await axios(`/jobs?${payload}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const deleteJob = createAsyncThunk("delete/job", async (id, thunkAPI) => {
  try {
    const res = await axios.delete(`/jobs/${id}`);
    return res.data.msg;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const addJob = createAsyncThunk("add/job", async (payload, thunkAPI) => {
  try {
    const res = await axios.post("/jobs", payload);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const editJob = createAsyncThunk("edit/job", async ({ id, payload }, thunkAPI) => {
  try {
    const res = await axios.patch(`/jobs/${id}`, payload);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});
