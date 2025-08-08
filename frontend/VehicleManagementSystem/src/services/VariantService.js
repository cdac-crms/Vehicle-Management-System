import axios from "axios";

const API_BASE_URL = "http://localhost:8080/variant";

// Add a new variant
export const addVariant = async (variantData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addVariant`, variantData);
    return response.data;
  } catch (error) {
    console.error("Error adding variant:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get all variants
export const getAllVariants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllVariants`);
    console.log("Fetched variants:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching variants:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get a variant by ID
export const getVariantById = async (variantId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getVariant/${variantId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching variant by ID:", error.response?.data?.message || error.message);
    throw error;
  }
};
