import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import statsReducer from "../features/stats/statsSlice";
import jobsReducer from "../features/jobs/jobsSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    stats: statsReducer,
    jobs: jobsReducer,
  },
});

export default store;
