import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  
    const logoutHandler = () => {
      localStorage.removeItem('admin'); 
      localStorage.removeItem('token');
      localStorage.removeItem('role'); 
      navigate('/');
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RentARide</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}

            {token && role === 'customer' && (
              <>
              
                <li className="nav-item">
                  <Link className="nav-link" to="/customer/bookings">Bookings</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/customer/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logoutHandler}>Logout</button>
                </li>
              </>
            )}

            {token && role === 'admin' && (
              <>
                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/register">Register Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-company">Add Company</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-variant">Add Variant</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-vehicle">Add Vehicle</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/vehicles">Vehicles</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/viewAllvariants">Variants</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/ViewAllCustomerBooking">Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/viewAllcustomers">Customers</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
