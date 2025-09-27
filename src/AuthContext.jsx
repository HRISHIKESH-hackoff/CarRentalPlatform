import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  isAuthenticated,
  getAuthToken
} from './api/auth.js';

// Create Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial State
const initialState = {
  user: null,
  token: getAuthToken(),
  isAuthenticated: isAuthenticated(),
  loading: false,
  error: null
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.LOAD_USER_SUCCESS:
    case AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.LOAD_USER_FAILURE:
    case AUTH_ACTIONS.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on component mount if authenticated
  useEffect(() => {
    if (state.isAuthenticated && state.token && !state.user) {
      loadUser();
    }
  }, [state.isAuthenticated, state.token, state.user]);

  // Set loading state
  const setLoading = (loading) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: loading });
  };

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await loginUser(credentials);
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: data.user,
          token: data.token
        }
      });
      return { success: true, data };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Login failed'
      });
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await registerUser(userData);
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: {
          user: data.user,
          token: data.token
        }
      });
      return { success: true, data };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message || 'Registration failed'
      });
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  // Load user profile
  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await getUserProfile();
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER_SUCCESS,
        payload: userData.user || userData
      });
      return { success: true, user: userData.user || userData };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER_FAILURE,
        payload: error.message || 'Failed to load user'
      });
      return { success: false, error: error.message || 'Failed to load user' };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const userData = await updateUserProfile(profileData);
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS,
        payload: userData.user || userData
      });
      return { success: true, data: userData };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PROFILE_FAILURE,
        payload: error.message || 'Profile update failed'
      });
      return { success: false, error: error.message || 'Profile update failed' };
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Context value
  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    
    // Actions
    login,
    register,
    logout,
    loadUser,
    updateProfile,
    clearError,
    setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export AuthContext for advanced use cases
export { AuthContext };

// Default export
export default AuthProvider;
