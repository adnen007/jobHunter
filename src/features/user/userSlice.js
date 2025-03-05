import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, updateUser, logout, getUserInfo } from "./userAsync";

let initialState = {
  userInfo: { name: "", lastName: "", email: "", userId: "", location: "" },
  isLoading: false,
  err: null,
  isAuthenticated: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthentication: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo.userId = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.err = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo.userId = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.err = payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo = payload;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.err = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.err = payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = {};
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.err = payload;
      });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
