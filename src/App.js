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

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
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
          <Route path="add-job" element={<AddJobPage />} />
          <Route path="all-jobs" element={<AllJobsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
