import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Fetch category from API
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getCategoryById(id);
        const categoryData = response.data;
        
        setCategory(categoryData);
        console.log('Category Response:', categoryData);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Fetch products in this category
  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        try {
          setProductsLoading(true);
          const response = await productService.getAllProducts({
            category: id,
            limit: 50,
          });
          
          setProducts(response.data || []);
        } catch (error) {
          console.error('Error fetching category products:', error);
          setProducts([]);
        } finally {
          setProductsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [id, category]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await categoryService.deleteCategory(id);
        navigate('/categories');
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

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
      </div>
    );
  }

  // Handle image display
  const categoryImage = category.image || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/categories')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Category Details</h1>
            <p className="text-gray-600 mt-1">{category.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate(`/categories/edit/${id}`)} variant="primary">
            <Edit size={18} className="mr-2" />
            Edit Category
          </Button>
          <Button onClick={handleDelete} variant="danger">
            <Trash2 size={18} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Category Image & Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Image */}
        <Card className="md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative w-full mb-4">
              <img
                src={categoryImage}
                alt={category.name}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  console.error('Category image failed to load:', categoryImage);
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Created {new Date(category.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Category Stats */}
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Information</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category Name</p>
                <p className="font-medium text-gray-900 text-lg">{category.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <div className="flex items-center gap-2">
                  <Package className="text-blue-600" size={20} />
                  <p className="font-medium text-gray-900 text-lg">
                    {productsLoading ? 'Loading...' : products.length}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Created At</p>
              <p className="font-medium text-gray-900">
                {new Date(category.createdAt).toLocaleDateString()} at{' '}
                {new Date(category.createdAt).toLocaleTimeString()}
              </p>
            </div>

            {category.updatedAt && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {new Date(category.updatedAt).toLocaleDateString()} at{' '}
                  {new Date(category.updatedAt).toLocaleTimeString()}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Category ID</p>
              <p className="font-mono text-xs text-gray-700 bg-gray-50 p-2 rounded">{category._id}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Products in this Category */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Products in this Category ({products.length})
          </h3>
          <Button onClick={() => navigate('/products/add')} variant="primary" size="sm">
            Add New Product
          </Button>
        </div>

        {productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600">No products in this category yet</p>
            <Button 
              onClick={() => navigate('/products/add')} 
              variant="primary" 
              className="mt-4"
            >
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.images?.[0]?.url || product.images?.[0] ? (
                        <img
                          src={product.images[0].url || product.images[0]}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded-lg"
                          onError={(e) => {
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
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900">{product.name || 'N/A'}</div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{product.price || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{product.stock ?? 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status || 'inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/products/edit/${product._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CategoryDetail;
