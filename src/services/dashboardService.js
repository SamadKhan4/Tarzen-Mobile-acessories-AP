import api from './api';

export const dashboardService = {
  getOverview: async () => {
    // Fetch data from multiple endpoints to build dashboard overview
    const [productsRes, categoriesRes, ordersRes, usersRes] = await Promise.all([
      api.get('/products?limit=1'),
      api.get('/categories'),
      api.get('/orders?limit=1'),
      api.get('/users?limit=1'),
    ]);

    return {
      totalProducts: productsRes.data.total || productsRes.data.count || 0,
      totalCategories: categoriesRes.data.count || 0,
      totalOrders: ordersRes.data.total || ordersRes.data.count || 0,
      totalCustomers: usersRes.data.total || usersRes.data.count || 0,
    };
  },

  getRecentOrders: async (limit = 5) => {
    const response = await api.get('/orders', { params: { limit } });
    return response.data.data || [];
  },

  getLowStockProducts: async () => {
    const response = await api.get('/products', { params: { lowStock: true } });
    return response.data.data || [];
  },
};
