import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { collection, query, where, getCountFromServer, getDoc, doc } from "firebase/firestore";

import { auth } from "../../firebase";
import { db } from "../../firebase";

function countJobsByMonth(jobs) {
  const now = new Date();
  const countsArray = [];

  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;

    countsArray.push({ date: monthKey, count: 0 });
  }
  if (jobs) {
    Object.values(jobs).forEach((timestamp) => {
      const jobDate = new Date(timestamp.seconds * 1000);
      const jobMonthKey = `${jobDate.getFullYear()}-${String(jobDate.getMonth() + 1).padStart(2, "0")}`;

      const monthObj = countsArray.find((item) => item.date === jobMonthKey);
      if (monthObj) {
        monthObj.count++;
      }
    });
  }

  return countsArray;
}

const fetchStats = createAsyncThunk("fetch/stats", async (_, ThunkAPI) => {
  try {
    const jobsRef = collection(db, "users", auth.currentUser.uid, "jobList");

    const pendingQuery = query(jobsRef, where("status", "==", "pending"));
    const interviewQuery = query(jobsRef, where("status", "==", "interview"));
    const declinedQuery = query(jobsRef, where("status", "==", "declined"));

    const pendingCount = await getCountFromServer(pendingQuery);
    const interviewCount = await getCountFromServer(interviewQuery);
    const declinedCount = await getCountFromServer(declinedQuery);

    const historyRef = doc(db, "users", auth.currentUser.uid, "jobStats", "jobHistory");
    const historySnapshot = await getDoc(historyRef);

    return {
      status: {
        pending: pendingCount.data().count,
        interview: interviewCount.data().count,
        declined: declinedCount.data().count,
      },
      history: countJobsByMonth(historySnapshot.data()),
    };
  } catch (err) {
    toast.error(err.message);
    return ThunkAPI.rejectWithValue(err.message);
  }
});

export default fetchStats;
