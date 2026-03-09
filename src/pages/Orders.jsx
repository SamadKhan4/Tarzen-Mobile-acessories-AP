import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';
import Card from '../components/Card';
import { orderService } from '../services/orderService';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Mock data (replace with API call)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const response = await orderService.getAllOrders({ page: currentPage, limit: 10 });
        
        // Mock data for demonstration
        const mockOrders = [
          {
            _id: 'ORD001',
            customer: { name: 'John Doe', phone: '9876543210' },
            totalPrice: 1500,
            deliveryType: 'Home Delivery',
            paymentMethod: 'Online',
            status: 'Delivered',
            createdAt: '2026-03-08',
          },
          {
            _id: 'ORD002',
            customer: { name: 'Jane Smith', phone: '9876543211' },
            totalPrice: 2300,
            deliveryType: 'Express',
            paymentMethod: 'COD',
            status: 'Shipped',
            createdAt: '2026-03-08',
          },
          {
            _id: 'ORD003',
            customer: { name: 'Mike Johnson', phone: '9876543212' },
            totalPrice: 890,
            deliveryType: 'Home Delivery',
            paymentMethod: 'Online',
            status: 'Pending',
            createdAt: '2026-03-07',
          },
          {
            _id: 'ORD004',
            customer: { name: 'Sarah Williams', phone: '9876543213' },
            totalPrice: 3200,
            deliveryType: 'Store Pickup',
            paymentMethod: 'Online',
            status: 'Confirmed',
            createdAt: '2026-03-07',
          },
          {
            _id: 'ORD005',
            customer: { name: 'David Brown', phone: '9876543214' },
            totalPrice: 1750,
            deliveryType: 'Home Delivery',
            paymentMethod: 'COD',
            status: 'Cancelled',
            createdAt: '2026-03-06',
          },
        ];

        setOrders(mockOrders);
        setTotalPages(5);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage customer orders</p>
      </div>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{order.customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{order.customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{order.totalPrice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{order.deliveryType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default Orders;
