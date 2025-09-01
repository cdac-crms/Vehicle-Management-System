import axios from "axios";
import store from "../redux/store"; // <-- added

const API_BASE_URL = "http://localhost:8080/variant";

// Get token from Redux first (fallback to localStorage)
const getAuthToken = () => {
  const state = store.getState();
  return state.auth?.token || localStorage.getItem("token");
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Add a new variant
export const addVariant = async (variantData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addVariant`,
      variantData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding variant:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Get all variants
export const getAllVariants = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAllVariants`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching variants:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Get a variant by ID
export const getVariantById = async (variantId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getVariant/${variantId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching variant by ID:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
