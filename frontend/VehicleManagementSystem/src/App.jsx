import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/Home/HomePage";
import Header from "./Components/Navbar/Header";
import UserLoginForm from "./Pages/Login/UserLoginForm";
import UserRegister from "./Pages/Register/UserRegister";
import AdminRegisterForm from "./Pages/Admin/AdminRegisterForm";
function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin/register" element={<AdminRegisterForm />} />

      </Routes>
    </div>
  );
}

export default App;
