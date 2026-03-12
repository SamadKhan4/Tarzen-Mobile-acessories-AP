import api from './api';

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data; // Returns { success, count, data }
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data; // Returns { success, data }
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Returns { success, message, data }
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Returns { success, message, data }
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data; // Returns { success, message }
  },
};
