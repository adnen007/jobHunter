import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", { ...payload });

      toast.success(`welcom ${res.data.user.name}`);

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.user.token}`;
      localStorage.user_data = JSON.stringify(res.data.user);

      return res.data.user;
    } catch (err) {
      toast.error("something went wrong");

      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk("user/login", async (payload, thunkAPI) => {
  try {
    const res = await axios.post("/auth/login", { ...payload, go: "go" });

    toast.success(`welcom ${res.data.user.name}`);

    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.user.token}`;
    localStorage.user_data = JSON.stringify(res.data.user);

    return res.data.user;
  } catch (err) {
    toast.error(err.response.data.msg);

    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const updateUser = createAsyncThunk("user/user", async (payload, thunkAPI) => {
  try {
    const res = await axios.patch("/auth/updateUser", { ...payload });
    toast.success("your profile got updated");
    return res.data.user;
  } catch (err) {
    toast.error(err.response.data.msg);

    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});
