import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

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
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<StatsPage />} />
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
