import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Select from '../components/Select';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { orderService } from '../services/orderService';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [order, setOrder] = useState(null);
  const [statusData, setStatusData] = useState('');

  // Fetch order from API
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrderById(id);
        const orderData = response.data;
        
        setOrder(orderData);
        setStatusData(orderData.orderStatus || orderData.status);
      } catch (error) {
        console.error('Error fetching order:', error);
        alert('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await orderService.updateOrderStatus(id, statusData);
      
      setOrder({ ...order, orderStatus: statusData });
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderService.cancelOrder(id);
        
        setOrder({ ...order, orderStatus: 'Cancelled' });
        alert('Order cancelled successfully!');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order');
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

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/orders')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600 mt-1">Order ID: {order._id}</p>
          </div>
        </div>
        <div className="flex gap-4">
          {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
            <Button onClick={handleCancelOrder} variant="danger">
              Cancel Order
            </Button>
          )}
          <Button onClick={() => navigate('/orders')} variant="secondary">
            Back to Orders
          </Button>
        </div>
      </div>

      {/* Order Status */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
          <StatusBadge status={order.orderStatus || order.status} />
        </div>
        
        {(order.orderStatus || order.status) !== 'Cancelled' && (order.orderStatus || order.status) !== 'Delivered' && (
          <form onSubmit={handleStatusUpdate} className="mt-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Select
                  label="Update Status"
                  value={statusData}
                  onChange={(e) => setStatusData(e.target.value)}
                  options={[
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Confirmed', label: 'Confirmed' },
                    { value: 'Shipped', label: 'Shipped' },
                    { value: 'Delivered', label: 'Delivered' },
                    { value: 'Cancelled', label: 'Cancelled' },
                  ]}
                  required
                />
              </div>
              <Button type="submit" variant="primary" disabled={updating}>
                {updating ? 'Updating...' : 'Update Status'}
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* Customer Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">{order.customerDetails?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{order.customerDetails?.phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium text-gray-900">
              {order.customerDetails?.address
                ? `${order.customerDetails.address}, ${order.customerDetails.city || ''} - ${order.customerDetails.pincode || ''}`
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="font-medium text-gray-900">{order.customerDetails?.city || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pincode</p>
            <p className="font-medium text-gray-900">{order.customerDetails?.pincode || 'N/A'}</p>
          </div>
        </div>
      </Card>

      {/* Ordered Products */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ordered Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.products?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId?.images?.[0] || item.product?.images?.[0] || 'https://via.placeholder.com/50'}
                        alt={item.name || item.product?.name}
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                      <span className="font-medium text-gray-900">{item.name || item.product?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">₹{item.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{item.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right font-medium text-gray-900">
                  Total Amount
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-bold text-blue-600">₹{order.totalPrice}</div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Order Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Payment Method</p>
            <p className="font-medium text-gray-900">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Delivery Type</p>
            <p className="font-medium text-gray-900">{order.deliveryType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium text-gray-900">
              {new Date(order.createdAt).toLocaleDateString()} at{' '}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-medium text-gray-900">{order._id}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
