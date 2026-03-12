import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Card from '../components/Card';
import { categoryService } from '../services/categoryService';

const AddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

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
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const categoryData = new FormData();
      categoryData.append('name', formData.name);
      if (formData.image) {
        categoryData.append('image', formData.image);
      }

      await categoryService.createCategory(categoryData);
      
      navigate('/categories');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to create category',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
          <p className="text-gray-600 mt-1">Create a new product category</p>
        </div>
        <Button onClick={() => navigate('/categories')} variant="secondary">
          Cancel
        </Button>
      </div>

      {/* Add Category Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <Input
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
            error={errors.name}
          />

          <ImageUpload
            label="Category Image"
            value={formData.image}
            onChange={handleImageChange}
            error={errors.image}
          />

          <div className="flex gap-4 mt-6">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Category'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/categories')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCategory;
