import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

const fetchStats = createAsyncThunk("fetch/stats", async (_, ThunkAPI) => {
  try {
    const res = await axios("/jobs/stats");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.msg);
    return ThunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export default fetchStats;
