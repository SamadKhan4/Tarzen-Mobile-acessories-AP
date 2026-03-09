import api from './api';

export const orderService = {
  getAllOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const response = await api.put(`/api/orders/${id}/status`, statusData);
    return response.data;
  },

  cancelOrder: async (id) => {
    // Note: Based on API docs, users can cancel via DELETE, but admin updates status
    const response = await api.put(`/api/orders/${id}/status`, { status: 'Cancelled' });
    return response.data;
  },
};
