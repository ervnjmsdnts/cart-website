import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import StaffPage from "./pages/StaffPage";
import AuthPage from "./pages/AuthPage";
import CashierPage from "./pages/CashierPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/cashier" element={<CashierPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="staff" element={<StaffPage />} />
        <Route path="product" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
