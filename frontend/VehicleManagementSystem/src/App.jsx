import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/Home/HomePage";
import Header from "./Components/Navbar/Header";
import UserLoginForm from "./Pages/Login/UserLoginForm";
import UserRegister from "./Pages/Register/UserRegister";

import AdminRegisterForm from "./Pages/Admin/AdminRegisterForm";
import AddCompanyForm from "./Pages/Admin/AddCompanyForm";
import AddVariantForm from "./Pages/Admin/AddVariantForm";
import AddVehicleForm from "./Pages/Admin/VehicleComponent/AddVehicleForm";
import ViewAllVehicles from "./Pages/Admin/VehicleComponent/ViewAllVehicles";
import CustomerDashboard from './Pages/Customer/CustomerDashboard';



function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegister />} />

        <Route path="/admin/register" element={<AdminRegisterForm />} />
        <Route path="/admin/add-company" element={<AddCompanyForm />} />
        <Route path="/admin/add-variant" element={<AddVariantForm />} />
        <Route path="/admin/add-vehicle" element={<AddVehicleForm />} />
        <Route path="/admin/vehicles" element={<ViewAllVehicles />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        

      </Routes>
    </div>
  );
}

export default App;
