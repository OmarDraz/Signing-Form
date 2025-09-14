import axios, { AxiosResponse } from 'axios';
import { SignupData, SigninData, User, AuthResponse } from '../types/auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, remove it
      localStorage.removeItem('token');
      // Optionally redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Sign up a new user
  signup: (userData: SignupData): Promise<AxiosResponse<AuthResponse>> => {
    return api.post('/auth/signup', userData);
  },

  // Sign in existing user
  signin: (credentials: SigninData): Promise<AxiosResponse<AuthResponse>> => {
    return api.post('/auth/signin', credentials);
  },

  // Logout user
  logout: (): Promise<AxiosResponse<{ message: string }>> => {
    return api.post('/auth/logout');
  },

  // Get user profile (protected endpoint)
  getProfile: (): Promise<AxiosResponse<User>> => {
    return api.get('/users/profile');
  },

  // Get all users (public endpoint)
  getUsers: (): Promise<AxiosResponse<User[]>> => {
    return api.get('/users');
  }
};
