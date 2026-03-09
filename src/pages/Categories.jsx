import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { categoryService } from '../services/categoryService';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data (replace with API call)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await categoryService.getAllCategories();
        
        // Mock data for demonstration
        const mockCategories = [
          {
            _id: '1',
            name: 'Cases & Covers',
            image: 'https://via.placeholder.com/100',
            productCount: 45,
          },
          {
            _id: '2',
            name: 'Smartphones',
            image: 'https://via.placeholder.com/100',
            productCount: 12,
          },
          {
            _id: '3',
            name: 'Audio',
            image: 'https://via.placeholder.com/100',
            productCount: 28,
          },
          {
            _id: '4',
            name: 'Chargers',
            image: 'https://via.placeholder.com/100',
            productCount: 35,
          },
          {
            _id: '5',
            name: 'Screen Protectors',
            image: 'https://via.placeholder.com/100',
            productCount: 50,
          },
          {
            _id: '6',
            name: 'Cables',
            image: 'https://via.placeholder.com/100',
            productCount: 40,
          },
        ];

        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        // await categoryService.deleteCategory(id);
        setCategories(categories.filter((c) => c._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

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
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={category.image || 'https://via.placeholder.com/50'}
                      alt={category.name}
                      className="h-12 w-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{category.productCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/categories/edit/${category._id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Categories;
