
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import {
  BsCarFrontFill, BsPencilSquare, BsBoxArrowInRight, BsJournalCheck, BsPersonBadge, BsBoxArrowRight, BsPersonCircle, BsPersonPlus,
  BsBuilding, BsGearWideConnected, BsListUl, BsPeopleFill, BsQuestionCircle,
} from 'react-icons/bs';

import { FaRupeeSign } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";


const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('name');

  const logoutHandler = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate('/');
  };

  // Dark Blue color for header background
  const navbarStyle = { backgroundColor: '#102649' };

  const iconStyle = { marginRight: '5px', verticalAlign: 'middle', fontSize: '1.15em' };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm " style={navbarStyle}>
      <div className="container-fluid" >
        <Link
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center text-light"
          style={{ letterSpacing: '0.04em' }}
        >
          <BsCarFrontFill style={{ ...iconStyle, fontSize: '1.4em' }} />
          RentARide
        </Link>
        <button
          className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation"
          style={{ outlineOffset: '2px' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* When not logged in */}
            {!token && (
              <>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link d-flex align-items-center text-light"
                  >
                    <BsPencilSquare style={iconStyle} /> Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link d-flex align-items-center text-light"
                  >
                    <BsBoxArrowInRight style={iconStyle} /> Login
                  </Link>
                </li>
              </>
            )}

            {/* Customer links */}
            {token && role === 'CUSTOMER' && (
              <>
                <li className="nav-item">
                  <Link
                    to="/customer/customer-dashboard"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <MdDashboard />Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/customer/my-bookings"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsJournalCheck style={iconStyle} /> MyBookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/customer/my-profile"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsPersonBadge style={iconStyle} /> MyProfile
                  </Link>
                </li>
                {/* Help & Support */}
                <li className="nav-item">
                  <Link
                    to="/customer/help-support"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsQuestionCircle style={iconStyle} /> Help&Support
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logoutHandler}
                    className="btn d-flex align-items-center fw-semibold ms-2"
                    type="button"
                    style={{
                      letterSpacing: '-0.02em',
                      backgroundColor: '#b30527',  // red background
                      color: '#fff',               // white text
                      border: 'none',
                    }}
                  >
                    <BsBoxArrowRight style={iconStyle} /> Logout
                  </button>
                </li>

                {/* Username at right end */}
                {username && (
                  <li
                    className="nav-item ms-3 fw-semibold text-light"
                    style={{ userSelect: 'none', whiteSpace: 'nowrap' }}
                  >
                    <span>
                      <BsPersonCircle style={iconStyle} />
                      Hello, {username.charAt(0).toUpperCase() + username.slice(1)}
                    </span>
                  </li>
                )}
              </>
            )}

            {/* Admin links */}
          {token && role === 'ADMIN' && (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin/register"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsPersonPlus style={iconStyle} /> Register Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-company"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsBuilding style={iconStyle} /> Add Company
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-variant"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsGearWideConnected style={iconStyle} /> Add Variant
                  </Link>
                </li>

                 <li className="nav-item">
                  <Link
                    to="/admin/add-vehicle"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsCarFrontFill style={iconStyle} /> Add Vehicle
                  </Link>
                </li>


                <li className="nav-item">
                  <Link
                    to="/admin/vehicles"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsListUl style={iconStyle} /> Vehicles
                  </Link>
                </li>


                <li className="nav-item">
                  <Link
                    to="/admin/bookings"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsJournalCheck style={iconStyle} /> Bookings
                  </Link>
                </li>


                <li className="nav-item">
                  <Link
                    to="/admin/view-customers"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsPeopleFill style={iconStyle} /> Customers
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/admin/view-payments"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <FaRupeeSign style={iconStyle} /> Payments
                  </Link>
                </li>
                

                <li className="nav-item">
                  <Link
                    to="/admin/view-feedback"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <VscFeedback  style={iconStyle} /> Feedback
                  </Link>
                </li>


                {/* Help & Support */}
                {/* <li className="nav-item">
                  <Link
                    to="/help-support"
                    className="nav-link d-flex align-items-center text-light"
                    style={{ fontWeight: 500 }}
                  >
                    <BsQuestionCircle style={iconStyle} /> Help & Support
                  </Link>
                </li> */}


                <li className="nav-item">
                  <button
                    onClick={logoutHandler}
                    className="btn btn-danger d-flex align-items-center fw-semibold ms-2"
                    type="button"
                  >
                    <BsBoxArrowRight style={iconStyle} /> Logout
                  </button>
                </li>
                {/* Username at right end */}
                {username && (
                  <li
                    className="nav-item ms-3 fw-semibold text-light"
                    style={{ userSelect: 'none', whiteSpace: 'nowrap' }}
                  >
                    <span>
                      <BsPersonCircle style={iconStyle} />
                      Hello, {username.charAt(0).toUpperCase() + username.slice(1)}
                    </span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
