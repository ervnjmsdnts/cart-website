import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAppbar from "../components/CustomAppbar";
import CheckoutProcess from "../containers/Cashier/CheckoutProcess";
import { useAuth } from "../contexts/AuthContext";

const CashierPage = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!user) return navigate("/");
      if (user && user.role === "admin") return navigate("/admin/staff");
      if (user && user.role === "staff") return navigate("/cashier");
    })();
  }, [user, navigate]);
  return (
    <>
      <CustomAppbar />
      <Container maxWidth="xl">
        <CheckoutProcess />
      </Container>
    </>
  );
};

export default CashierPage;
