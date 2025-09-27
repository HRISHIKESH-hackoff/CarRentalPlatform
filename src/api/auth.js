import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authAPI.interceptors.request.use(
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

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await authAPI.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// User Login
export const loginUser = async (credentials) => {
  try {
    const response = await authAPI.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await authAPI.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

// Update User Profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await authAPI.put('/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  return Promise.resolve({ message: 'Logged out successfully' });
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

// Get current auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export default authAPI;
