import { Box } from "@mui/material";
import LoginForm from "../containers/Auth/LoginForm";
import { ReactComponent as Image } from "../assets/loginimage.svg";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const { user } = useAuth();

  if (user && user.role === "admin") return <Navigate to="/admin/staff" />;
  if (user && user.role === "staff") return <Navigate to="/cashier" />;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box flex={1} display="flex" alignItems="center" height="100%">
        <LoginForm />
      </Box>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        backgroundColor="primary.light"
      >
        <Image />
      </Box>
    </Box>
  );
};

export default AuthPage;
