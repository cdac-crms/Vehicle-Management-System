import axios from 'axios';
import store from '../redux/store'; // <-- added

const API_BASE_URL = 'http://localhost:8080/vehicle';

// Get token from Redux first (fallback to localStorage)
const getAuthToken = () => {
  const state = store.getState();
  return state.auth?.token || localStorage.getItem("token");
};

// Helper to get token headers
const getAuthHeaders = (isMultipart = false) => {
  const token = getAuthToken();
  if (!token) {
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isMultipart && { "Content-Type": "multipart/form-data" }),
    },
  };
};

// Add Vehicle
export const addVehicle = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addVehicle`,
      formData,
      getAuthHeaders(true)
    );
    return response.data;
  } catch (error) {
    console.error("Error adding vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get all vehicles (no auth needed)
export const getAllVehicles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllVehicles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get Vehicle by ID
export const getVehicleById = async (vehicleId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getVehicleById/${vehicleId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Update Vehicle
export const updateVehicle = async (vehicleId, formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${vehicleId}`,
      formData,
      getAuthHeaders(true)
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete Vehicle
export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/delete/${vehicleId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};
