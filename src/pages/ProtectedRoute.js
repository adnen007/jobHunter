import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingPage from "./LoadingPage";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      toast.warn("PLEASE LGOIN FIRST");
    }
  }, [isAuthenticated]);

  if (isAuthenticated === "loading") {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="login" />;
};

export default ProtectedRoute;
