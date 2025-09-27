import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const bookingsAPI = axios.create({
  baseURL: `${API_BASE_URL}/bookings`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
bookingsAPI.interceptors.request.use(
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

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await bookingsAPI.post('/', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create booking' };
  }
};

// Get all user bookings
export const getUserBookings = async (userId) => {
  try {
    const response = await bookingsAPI.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user bookings' };
  }
};

// Get current user's bookings
export const getMyBookings = async () => {
  try {
    const response = await bookingsAPI.get('/my-bookings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch your bookings' };
  }
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await bookingsAPI.get(`/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch booking details' };
  }
};

// Update booking
export const updateBooking = async (bookingId, updateData) => {
  try {
    const response = await bookingsAPI.put(`/${bookingId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update booking' };
  }
};

// Cancel booking
export const cancelBooking = async (bookingId, cancellationReason) => {
  try {
    const response = await bookingsAPI.patch(`/${bookingId}/cancel`, {
      cancellationReason
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to cancel booking' };
  }
};

// Confirm booking (Admin/Owner)
export const confirmBooking = async (bookingId) => {
  try {
    const response = await bookingsAPI.patch(`/${bookingId}/confirm`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to confirm booking' };
  }
};

// Complete booking
export const completeBooking = async (bookingId, completionData) => {
  try {
    const response = await bookingsAPI.patch(`/${bookingId}/complete`, completionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to complete booking' };
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Add filters to query params
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await bookingsAPI.get(`/admin/all?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch all bookings' };
  }
};

// Delete booking (Admin only)
export const deleteBooking = async (bookingId) => {
  try {
    const response = await bookingsAPI.delete(`/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete booking' };
  }
};

// Get booking statistics (Admin/Owner)
export const getBookingStats = async (period = '30d') => {
  try {
    const response = await bookingsAPI.get(`/stats?period=${period}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch booking statistics' };
  }
};

// Check car availability for booking
export const checkCarAvailability = async (carId, startDate, endDate) => {
  try {
    const response = await bookingsAPI.get(`/check-availability`, {
      params: {
        carId,
        startDate,
        endDate
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to check car availability' };
  }
};

// Calculate booking price
export const calculateBookingPrice = async (carId, startDate, endDate, extras = []) => {
  try {
    const response = await bookingsAPI.post('/calculate-price', {
      carId,
      startDate,
      endDate,
      extras
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to calculate booking price' };
  }
};

// Process payment for booking
export const processBookingPayment = async (bookingId, paymentData) => {
  try {
    const response = await bookingsAPI.post(`/${bookingId}/payment`, paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment processing failed' };
  }
};

// Add review to completed booking
export const addBookingReview = async (bookingId, reviewData) => {
  try {
    const response = await bookingsAPI.post(`/${bookingId}/review`, reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add review' };
  }
};

export default bookingsAPI;
