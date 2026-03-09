import api from './api';

export const customerService = {
  getAllCustomers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getCustomerById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};
