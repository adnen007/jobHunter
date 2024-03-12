import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const registerUser = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", { ...payload });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk("user/login", async (payload, thunkAPI) => {
  try {
    const res = await axios.post("/auth/login", { ...payload });
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const updateUser = createAsyncThunk("user/user", async (payload, thunkAPI) => {
  try {
    const res = await axios.patch("/auth/updateUser", { ...payload });
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});
