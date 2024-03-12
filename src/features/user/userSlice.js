import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, updateUser } from "./userAsync";

import { getUserFromLocalStorage } from "../../utils/functions";

let initialState = {
  user_data: getUserFromLocalStorage(),
  is_loading: false,
  user_status: { err: null, success: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user_data");
      return {
        user_data: { name: "", lastName: "", email: "", location: "", token: "" },
        is_loading: false,
        user_status: { err: null, success: null },
      };
    },
    clear_status: (state) => {
      state.user_status.success = null;
      state.user_status.err = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.is_loading = true;
        state.user_status.err = null;
        state.user_status.success = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.user_data = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.user_status.err = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.is_loading = true;
        state.user_status.err = null;
        state.user_status.success = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.user_data = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.user_status.err = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.is_loading = true;
        state.user_status.err = null;
        state.user_status.success = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.user_data = payload;
        state.user_status.success = true;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.user_status.err = payload;
      });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
