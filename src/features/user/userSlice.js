import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, updateUser } from "./userAsync";

import { getUserFromLocalStorage } from "../../utils/functions";

let initialState = {
  user_data: getUserFromLocalStorage(),
  is_loading: false,
  err: null,
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
        err: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.user_data = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.err = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.user_data = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.err = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.is_loading = false;
        state.user_data = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.is_loading = false;
        state.err = payload;
      });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
