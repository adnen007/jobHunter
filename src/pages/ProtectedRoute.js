import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => {
    return state.user.user_data.token;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/landing");
    }
  }, [navigate, token]);
  if (token) {
    return children;
  } else {
    return <LoadingPage />;
  }
};

export default ProtectedRoute;
