import api from './api';

export const dashboardService = {
  getOverview: async () => {
    // Since there's no specific overview endpoint, we'll fetch data from multiple endpoints
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
};
