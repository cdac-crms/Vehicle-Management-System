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
import ViewAllCustomers from "./Pages/Admin/CustomerComponent/ViewAllCustomers";
import ViewCustomerBooking from "./Pages/Admin/BookingComponent/ViewCustomerBooking";
import UpdateVehicleForm from "./Pages/Admin/VehicleComponent/UpdateVehicleForm";
import VehicleDetails from "./Pages/Admin/VehicleComponent/VehicleDetails";
import ViewBookingDetails from "./Pages/Admin/BookingComponent/ViewBookingDetails";
import ViewCustomerProfile from "./Pages/Admin/CustomerComponent/ViewCustomerProfile";
import PaymentSummary from "./Pages/Admin/BookingComponent/PaymentSummary";
import ViewReview from "./Pages/Admin/BookingComponent/ViewReview";

import CustomerDashboard from './Pages/Customer/CustomerDashboard';
import CarDetailsPage from './Pages/Customer/CarDetailsPage';
import BookingDetailsPage from './Pages/Customer/BookingDetailsPage';
import MyBookingsPage from './Pages/Customer/MyBookingsPage';
import UpdateProfilePage from './Pages/Customer/UpdateProfilePage';
import MyProfilePage from './Pages/Customer/MyProfilePage';
import PaymentPage from './Pages/Customer/PaymentPage';
import HelpSupport from "./Pages/Customer/HelpSupport";

import ProtectedRoute from "./Components/ProtectedRoute";

const adminRoutes = [
  { path: "/admin/register", element: <AdminRegisterForm /> },
  { path: "/admin/add-company", element: <AddCompanyForm /> },
  { path: "/admin/add-variant", element: <AddVariantForm /> },
  { path: "/admin/add-vehicle", element: <AddVehicleForm /> },
  { path: "/admin/vehicles", element: <ViewAllVehicles /> },
  { path: "/admin/view-customers", element: <ViewAllCustomers /> },
  { path: "/admin/bookings", element: <ViewCustomerBooking /> },
  { path: "/admin/view-booking/:id", element: <ViewBookingDetails /> },
  { path: "/admin/update-vehicle/:vehicleId", element: <UpdateVehicleForm /> },
  { path: "/admin/view-vehicle/:id", element: <VehicleDetails /> },
  { path: "/admin/customer/:id", element: <ViewCustomerProfile /> },
  { path: "/admin/view-payments", element: <PaymentSummary /> },
  { path: "/admin/view-reviews", element: <ViewReview /> },
];

const customerRoutes = [
  { path: "/customer/customer-dashboard", element: <CustomerDashboard /> },
  { path: "/customer/car-details/:id", element: <CarDetailsPage /> },
  { path: "/customer/booking-details/:id", element: <BookingDetailsPage /> },
  { path: "/customer/my-bookings", element: <MyBookingsPage /> },
  { path: "/customer/update-profile", element: <UpdateProfilePage /> },
  { path: "/customer/my-profile", element: <MyProfilePage /> },
  { path: "/customer/payment/:id", element: <PaymentPage /> },
  { path: "/customer/help-support", element: <HelpSupport /> },
];

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Admin Routes */}
        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRole="ADMIN">
                {element}
              </ProtectedRoute>
            }
          />
        ))}

        {/* Customer Routes */}
        {customerRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRole="CUSTOMER">
                {element}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
