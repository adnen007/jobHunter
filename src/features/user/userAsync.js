import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const registerUser = createAsyncThunk("REGISTER", async (payload, thunkAPI) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

    const userRef = doc(db, "users", res.user.uid);
    const userInfo = {
      name: payload.name,
      email: payload.email,
      userId: res.user.uid,
    };
    await setDoc(userRef, userInfo);
    return res.user.uid;
  } catch (err) {
    toast.error(err.message);

    return thunkAPI.rejectWithValue(err.message);
  }
});

export const loginUser = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  try {
    await signInWithEmailAndPassword(auth, payload.email, payload.password);
    return auth.currentUser.uid;
  } catch (err) {
    toast.error(err.message);

    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getUserInfo = createAsyncThunk("GET_USER_INFO", async (_, thunkAPI) => {
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);

    const userInfo = await getDoc(userRef);
    toast.success(`welcome ${userInfo.data().name} `);

    return userInfo.data();
  } catch (err) {
    toast.error(err.message);

    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateUser = createAsyncThunk("UPDATE_USER", async (payload, thunkAPI) => {
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { ...payload });
    toast.success("your profile got updated");

    return { ...payload };
  } catch (err) {
    toast.error(err.message);

    return thunkAPI.rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk("SIGN_OUT", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.message);

    return thunkAPI.rejectWithValue(err.message);
  }
});
