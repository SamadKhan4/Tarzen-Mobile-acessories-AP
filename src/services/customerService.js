import api from './api';

export const customerService = {
  getAllCustomers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data; // Returns { success, count, total, page, pages, data }
  },

  getCustomerById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data; // Returns { success, data }
  },

  updateCustomerRole: async (id, role) => {
    const response = await api.put(`/users/${id}/role`, { role });
    return response.data; // Returns { success, message, data }
  },

  deleteCustomer: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data; // Returns { success, message }
  },
};
