import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { userActions } from "./features/user/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  LandingPage,
  LoginPage,
  StatsPage,
  AddJobPage,
  ProtectedRoute,
  ErrorPage,
  AllJobsPage,
  Dashboard,
  ProfilePage,
} from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for authentication state changes (user login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.userAuthentication(true));
      } else {
        dispatch(userActions.userAuthentication(false));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="Analytics" element={<StatsPage />} />
            <Route path="new-job" element={<AddJobPage />} />
            <Route path="job-list" element={<AllJobsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
