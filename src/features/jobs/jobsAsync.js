import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
  limit,
  doc,
  startAfter,
  endBefore,
  startAt,
  updateDoc,
  setDoc,
  getCountFromServer,
  limitToLast,
  deleteDoc,
  deleteField,
} from "firebase/firestore";

let last = null;
let first = null;

const buildFilters = (payload) => {
  const filters = [];

  if (payload.status !== "all") filters.push(where("status", "==", payload.status));
  if (payload.jobType !== "all") filters.push(where("jobType", "==", payload.jobType));
  if (payload.search) {
    filters.push(where("position", ">=", payload.search.toLocaleLowerCase()));
    filters.push(where("position", "<=", payload.search.toLocaleLowerCase() + "\uf8ff"));
  }

  return filters;
};

const buildSortOption = (sort) => {
  const sortOptions = {
    latest: ["createAt", "desc"],
    oldest: ["createAt", "asc"],
    "a-z": ["position", "asc"],
    "z-a": ["position", "desc"],
  };

  return sort in sortOptions ? orderBy(...sortOptions[sort]) : null;
};

const buildPagination = (pageMovement, pageSize, last, first) => {
  const pagination = [];

  if (pageMovement === "next") {
    pagination.push(limit(pageSize));
    pagination.push(startAfter(last));
  } else if (pageMovement === "prev") {
    pagination.push(limitToLast(pageSize));
    pagination.push(endBefore(first));
  } else if (pageMovement === "deletion") {
    pagination.push(limit(pageSize));
    pagination.push(startAt(first));
  } else {
    pagination.push(limit(pageSize));
  }

  return pagination;
};

export const fetchAllJobs = createAsyncThunk("fetch/jobs", async (payload, thunkAPI) => {
  try {
    const jobsRef = collection(db, "users", auth.currentUser.uid, "jobList");

    const filters = buildFilters(payload);
    const sortOption = buildSortOption(payload.sort);
    if (sortOption) filters.push(sortOption);

    const pageSize = 9;
    const pagination = buildPagination(payload.pageMovement, pageSize, last, first);

    const q = query(jobsRef, ...filters, ...pagination);

    const jobList = [];
    const res = await getDocs(q);
    res.docs.forEach((document) => {
      jobList.push({
        ...document.data(),
        createAt: { ...document.data().createAt },
      });
    });

    const countSnapShot = await getCountFromServer(query(jobsRef, ...filters));
    const totalJobs = countSnapShot.data().count;

    const totalPages = totalJobs === 0 ? 1 : Math.ceil(totalJobs / pageSize);

    if (res.docs.length) {
      last = res.docs[res.docs.length - 1];
      first = res.docs[0];
    }

    return { totalJobs, jobList, totalPages };
  } catch (err) {
    toast.error(err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const deleteJob = createAsyncThunk("delete/job", async ({ id, params }, thunkAPI) => {
  try {
    const jobRef = doc(db, "users", auth.currentUser.uid, "jobList", id);
    await deleteDoc(jobRef);
    const historyRef = doc(db, "users", auth.currentUser.uid, "jobStats", "jobHistory");
    await updateDoc(historyRef, { [jobRef.id]: deleteField() });

    thunkAPI.dispatch(fetchAllJobs({ ...params, pageMovement: "deletion" }));

    toast.success("Job Deleted");
    return null;
  } catch (err) {
    toast.error(err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const addJob = createAsyncThunk("add/job", async (payload, thunkAPI) => {
  try {
    const jobRef = doc(collection(db, "users", auth.currentUser.uid, "jobList"));
    await setDoc(jobRef, {
      ...payload,
      position: payload.position.toLowerCase(),
      createAt: serverTimestamp(),
      id: jobRef.id,
    });

    /*  All Jobs In One Document
      Instead of storing each job as a separate document in a collection,  
      consider storing them as an array of objects within a single document.  
      This approach reduces Firestore read operations, improving performance.  
      A single Firestore document can store up to 1MB of data, allowing approximately 2000 job objects.
    */

    const historyRef = doc(db, "users", auth.currentUser.uid, "jobStats", "jobHistory");
    await setDoc(historyRef, { [jobRef.id]: serverTimestamp() }, { merge: true });

    toast.success("Job added");

    return null;
  } catch (err) {
    toast.error(err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const editJob = createAsyncThunk("edit/job", async (params, thunkAPI) => {
  try {
    const jobRef = doc(db, "users", auth.currentUser.uid, "jobList", params.id);
    const { position, company, jobType, jobLocation, status } = params;

    await updateDoc(jobRef, { position, company, jobType, jobLocation, status });

    toast.success("edited successfully");
  } catch (err) {
    toast.error(err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});
