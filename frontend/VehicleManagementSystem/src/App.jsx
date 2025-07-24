

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
import MyProfilePage from './Pages/Customer/MyProfilePage';
import PaymentPage from './Pages/Customer/PaymentPage';
import HelpSupport from "./Pages/Customer/HelpSupport";
import ViewAllCustomers from "./Pages/Admin/CustomerComponent/ViewAllCustomers";
import ViewCustomerBooking from "./Pages/Admin/BookingComponent/ViewCustomerBooking";
import UpdateVehicleForm from "./Pages/Admin/VehicleComponent/UpdateVehicleForm";
import VehicleDetails from "./Pages/Admin/VehicleComponent/VehicleDetails";
import ViewBookingDetails from "./Pages/Admin/BookingComponent/ViewBookingDetails";



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
        <Route path="/admin/view-booking/:id" element={<ViewBookingDetails />} />
        <Route path="/admin/update-vehicle/:id" element={<UpdateVehicleForm />} />
        <Route path="/admin/view-vehicle/:id" element={<VehicleDetails />} />


        <Route path="/customer/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/car-details/:id" element={<CarDetailsPage />} />
        <Route path="/customer/booking-details/:id" element={<BookingDetailsPage />} />
        <Route path="/customer/my-bookings" element={<MyBookingsPage />} />
        <Route path="/customer/update-profile" element={<UpdateProfilePage />} />
        <Route path="/customer/my-profile" element={<MyProfilePage />} />
        <Route path="/customer/payment/:id" element={<PaymentPage />} />
         <Route path="/customer/help-support" element={<HelpSupport />} />
        


      </Routes>
      
    </div>
  );
}

export default App;
