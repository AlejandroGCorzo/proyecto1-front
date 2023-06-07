import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { userRole } = useSelector((state) => state.users);

  return userRole[0] === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
