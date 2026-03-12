import api from './api';

export const orderService = {
  getAllOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data; // Returns { success, count, total, page, pages, data }
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data; // Returns { success, data }
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data; // Returns { success, message, data }
  },

  cancelOrder: async (id) => {
    // Admin cancels by updating status to 'Cancelled'
    const response = await api.put(`/orders/${id}/status`, { status: 'Cancelled' });
    return response.data;
  },
};
