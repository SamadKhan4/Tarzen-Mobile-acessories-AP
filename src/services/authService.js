import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    console.log('Login API response:', response.data);
    
    if (response.data.success && response.data.token && response.data.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.data));
      console.log('Token and admin data saved to localStorage');
    } else if (response.data.data && response.data.data.token) {
      // Fallback for different response structure
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.data));
      console.log('Token saved from response.data.data');
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  },

  getCurrentAdmin: () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
