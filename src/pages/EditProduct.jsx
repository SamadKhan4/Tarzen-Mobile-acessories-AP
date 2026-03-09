import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import ImageUpload from '../components/ImageUpload';
import Card from '../components/Card';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
    images: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await productService.getProductById(id);
        
        // Mock data
        const mockProduct = {
          _id: id,
          name: 'iPhone 15 Pro Case',
          description: 'Premium quality protective case for iPhone 15 Pro',
          price: 1299,
          category: { _id: '1', name: 'Cases & Covers' },
          stock: 45,
          brand: 'Apple',
          images: ['https://via.placeholder.com/100'],
        };
        
        setFormData({
          name: mockProduct.name,
          description: mockProduct.description,
          price: mockProduct.price.toString(),
          category: mockProduct.category?._id,
          stock: mockProduct.stock.toString(),
          brand: mockProduct.brand,
          images: mockProduct.images,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        // const response = await categoryService.getAllCategories();
        // Mock data
        const mockCategories = [
          { _id: '1', name: 'Cases & Covers' },
          { _id: '2', name: 'Smartphones' },
          { _id: '3', name: 'Audio' },
          { _id: '4', name: 'Chargers' },
          { _id: '5', name: 'Screen Protectors' },
          { _id: '6', name: 'Cables' },
        ];
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const handleImageChange = (file) => {
    setFormData({
      ...formData,
      images: file ? [...formData.images, file] : formData.images,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('category', formData.category);
      productData.append('stock', formData.stock);
      productData.append('brand', formData.brand);
      
      formData.images.forEach((image) => {
        if (typeof image === 'object') {
          productData.append('images', image);
        }
      });

      // await productService.updateProduct(id, productData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      navigate('/products');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to update product',
      });
    } finally {
      setSubmitting(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-1">Update product information</p>
        </div>
        <Button onClick={() => navigate('/products')} variant="secondary">
          Cancel
        </Button>
      </div>

      {/* Edit Product Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              error={errors.name}
            />

            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              required
              error={errors.brand}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
              placeholder="Select category"
              required
              error={errors.category}
            />

            <Input
              label="Price (₹)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              error={errors.price}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
              error={errors.stock}
            />

            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                label="Product Images"
                value={formData.images[0]}
                onChange={handleImageChange}
                error={errors.images}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Product'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/products')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProduct;
