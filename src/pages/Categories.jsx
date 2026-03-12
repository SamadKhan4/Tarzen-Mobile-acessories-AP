import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { categoryService } from '../services/categoryService';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAllCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    
    try {
      await categoryService.deleteCategory(categoryToDelete);
      setCategories(categories.filter((c) => c._id !== categoryToDelete));
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const openDeleteModal = (id) => {
    setCategoryToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setDeleteModalOpen(false);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && deleteModalOpen) {
        closeDeleteModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [deleteModalOpen]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories</p>
        </div>
        <Button onClick={() => navigate('/categories/add')} variant="primary">
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg">No categories found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-12 w-12 object-cover rounded-lg"
                          onError={(e) => {
                            console.error('Failed to load category image:', category.image);
                            e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/categories/${category._id}`)}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/categories/${category._id}`)}
                        className="text-sm text-blue-600 hover:text-blue-900"
                      >
                        View Products →
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/categories/edit/${category._id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(category._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Category"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button onClick={closeDeleteModal} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
