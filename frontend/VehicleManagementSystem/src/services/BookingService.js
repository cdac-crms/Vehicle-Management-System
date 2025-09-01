import axios from "axios";
import store from "../redux/store";  // <-- import Redux store

const API_BASE_URL = "http://localhost:8080/booking";

// Get token from Redux (fallback to localStorage)
const getAuthHeaders = () => {
  const state = store.getState();
  const token = state.auth?.token || localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all bookings
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllBookings`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBooking/${bookingId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updateBookingStatus/${bookingId}`,
      null,
      {
        headers: getAuthHeaders(),
        params: { status },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error.response?.data?.message || error.message);
    throw error;
  }
};
