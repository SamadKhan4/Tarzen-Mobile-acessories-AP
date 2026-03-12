import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { productService } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        const productData = response.data;
        
        setProduct(productData);
        console.log('Product Response:', productData);
        console.log('Product Images:', productData?.images);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        navigate('/products');
      } catch (error) {
        console.error('Error deleting product:', error);
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

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  // Handle image display - use first image url or placeholder
  const mainImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/products')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
            <p className="text-gray-600 mt-1">{product.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate(`/products/edit/${id}`)} variant="primary">
            <Edit size={18} className="mr-2" />
            Edit Product
          </Button>
          <Button onClick={handleDelete} variant="danger">
            <Trash2 size={18} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Product Images */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
        <div className="space-y-4">
          {/* Main Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  console.error('Image failed to load:', mainImage);
                  e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                }}
              />
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {product.images.map((image, index) => {
                const imageUrl = image.url || image;
                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Basic Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Product Name</p>
            <p className="font-medium text-gray-900 text-lg">{product.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-medium text-gray-900">{product.category?.name || 'Uncategorized'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Description</p>
            <p className="font-medium text-gray-900 mt-1">{product.description || 'No description available'}</p>
          </div>
        </div>
      </Card>

      {/* Pricing & Stock */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Stock</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-medium text-gray-900 text-xl">₹{product.price || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Stock Quantity</p>
            <p className="font-medium text-gray-900 text-lg">{product.stock ?? 0} units</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <div className="mt-1">
              <StatusBadge status={product.status} />
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Details */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Brand</p>
            <p className="font-medium text-gray-900">{product.brand || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">SKU</p>
            <p className="font-medium text-gray-900">{product.sku || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created At</p>
            <p className="font-medium text-gray-900">
              {new Date(product.createdAt).toLocaleDateString()} at{' '}
              {new Date(product.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-medium text-gray-900">
              {new Date(product.updatedAt).toLocaleDateString()} at{' '}
              {new Date(product.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Specifications (if available) */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 gap-4">
                <p className="text-sm text-gray-600 capitalize">{key}</p>
                <p className="font-medium text-gray-900 col-span-2">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reviews Summary (if available) */}
      {product.averageRating && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">{product.averageRating}</span>
              <span className="text-gray-600 ml-1">/ 5</span>
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(product.averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">({product.totalReviews || 0} reviews)</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductDetail;
