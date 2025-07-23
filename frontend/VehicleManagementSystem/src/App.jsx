import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/Home/HomePage";
import Header from "./Components/Navbar/Header";
import UserLoginForm from "./Pages/Login/UserLoginForm";
import UserRegister from "./Pages/Register/UserRegister";
import AdminRegisterForm from "./Pages/Admin/AdminRegisterForm";
import AddCompanyForm from "./Pages/Admin/AddCompanyForm";
import AddVariantForm from "./Pages/Admin/AddVariantForm";
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

      </Routes>
    </div>
  );
}

export default App;
