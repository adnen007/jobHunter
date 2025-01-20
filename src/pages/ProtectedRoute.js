import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoginPage from "./LoginPage";
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => {
    return state.user.user_data.token;
  });

  if (token) {
    return children;
  } else {
    toast.warn("PLEASE LOGIN FIRST");
    return <LoginPage />;
  }
};

export default ProtectedRoute;
