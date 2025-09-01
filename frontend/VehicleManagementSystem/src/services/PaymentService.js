import axios from "axios";
import store from "../redux/store"; // <-- added

const API_BASE_URL = "http://localhost:8080/payment";

// Get token from Redux first (fallback to localStorage)
const getAuthToken = () => {
  const state = store.getState();
  return state.auth?.token || localStorage.getItem("token");
};

// Get all payments
export const getAllPayments = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching payments:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
