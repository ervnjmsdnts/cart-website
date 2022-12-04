import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!user) return navigate("/");
      if (user && user.role === "admin") return navigate("/admin/staff");
      if (user && user.role === "staff") return navigate("/cashier");
    })();
  }, [user]);

  return <Sidebar>{children ? children : <Outlet />}</Sidebar>;
};

export default AdminLayout;
