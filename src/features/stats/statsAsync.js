import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchStats = createAsyncThunk("fetch/stats", async (_, ThunkAPI) => {
  try {
    const res = await axios("/jobs/stats");
    return res.data;
  } catch (err) {
    return ThunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export default fetchStats;
