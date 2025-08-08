// frontend/VehicleManagementSystem/src/services/ReviewService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/reviews";

// Get token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Create a new review
export const createReview = async (reviewData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get all reviews
export const getAllReviews = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error.response?.data?.message || error.message);
    throw error;
  }
};
