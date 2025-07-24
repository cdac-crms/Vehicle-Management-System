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
import CarDetailsPage from './Pages/Customer/CarDetailsPage';
import BookingDetailsPage from './Pages/Customer/BookingDetailsPage';
import MyBookingsPage from './Pages/Customer/MyBookingsPage';
import UpdateProfilePage from './Pages/Customer/UpdateProfilePage';
import ViewAllCustomers from "./Pages/Admin/CustomerComponent/ViewAllCustomers";
import ViewCustomerBooking from "./Pages/Admin/BookingComponent/ViewCustomerBooking";



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
        <Route path="/admin/view-customers" element={<ViewAllCustomers />} />
        <Route path="/admin/bookings" element={<ViewCustomerBooking/>} />

        <Route path="/customer/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/car-details/:id" element={<CarDetailsPage />} />
        <Route path="/customer/booking-details/:id" element={<BookingDetailsPage />} />
        <Route path="/customer/my-bookings" element={<MyBookingsPage />} />
        <Route path="/customer/my-profile" element={<UpdateProfilePage />} />

        


      </Routes>
      
    </div>
  );
}

export default App;
