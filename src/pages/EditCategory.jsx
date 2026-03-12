import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Card from '../components/Card';
import { categoryService } from '../services/categoryService';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getCategoryById(id);
        const category = response.data;

        setFormData({
          name: category.name,
          image: category.image,
        });
      } catch (error) {
        console.error('Error fetching category:', error);
        alert('Failed to fetch category details');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
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
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const categoryData = new FormData();
      categoryData.append('name', formData.name);
      if (formData.image && typeof formData.image === 'object') {
        categoryData.append('image', formData.image);
      }

      await categoryService.updateCategory(id, categoryData);
      
      alert('Category updated successfully!');
      navigate('/categories');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to update category',
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-gray-600 mt-1">Update category information</p>
        </div>
        <Button onClick={() => navigate('/categories')} variant="secondary">
          Cancel
        </Button>
      </div>

      {/* Edit Category Form */}
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
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Category'}
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

export default EditCategory;
