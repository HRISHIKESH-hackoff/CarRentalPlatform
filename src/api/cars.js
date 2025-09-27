import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const carsAPI = axios.create({
  baseURL: `${API_BASE_URL}/cars`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
carsAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all cars with optional filters
export const getAllCars = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Add filters to query params
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await carsAPI.get(`?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch cars' };
  }
};

// Get car by ID
export const getCarById = async (carId) => {
  try {
    const response = await carsAPI.get(`/${carId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch car details' };
  }
};

// Create new car (Admin/Owner only)
export const createCar = async (carData) => {
  try {
    const response = await carsAPI.post('/', carData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create car' };
  }
};

// Update car (Admin/Owner only)
export const updateCar = async (carId, carData) => {
  try {
    const response = await carsAPI.put(`/${carId}`, carData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update car' };
  }
};

// Delete car (Admin/Owner only)
export const deleteCar = async (carId) => {
  try {
    const response = await carsAPI.delete(`/${carId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete car' };
  }
};

// Search cars by location
export const searchCarsByLocation = async (location, dateRange = {}) => {
  try {
    const params = {
      location,
      ...dateRange
    };
    
    const response = await carsAPI.get('/search', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search cars' };
  }
};

// Get available cars for specific dates
export const getAvailableCars = async (startDate, endDate, location) => {
  try {
    const params = {
      startDate,
      endDate,
      location
    };
    
    const response = await carsAPI.get('/available', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch available cars' };
  }
};

// Get cars by category
export const getCarsByCategory = async (category) => {
  try {
    const response = await carsAPI.get(`/category/${category}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch cars by category' };
  }
};

// Upload car images (Admin/Owner only)
export const uploadCarImages = async (carId, imageFiles) => {
  try {
    const formData = new FormData();
    
    // Add files to form data
    imageFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    const response = await carsAPI.post(`/${carId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to upload car images' };
  }
};

// Get car reviews
export const getCarReviews = async (carId) => {
  try {
    const response = await carsAPI.get(`/${carId}/reviews`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch car reviews' };
  }
};

export default carsAPI;
