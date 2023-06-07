import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { userRole } = useSelector((state) => state.users);

  return userRole?.includes("ADMIN") ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
