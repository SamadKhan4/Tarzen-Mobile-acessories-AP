import { useState, useEffect } from 'react';
import { Package, Tags, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import api from '../services/api';
import { dashboardService } from '../services/dashboardService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  // Mock data for charts (you can create analytics endpoints in backend)
  const ordersData = [
    { name: 'Jan', orders: 45 },
    { name: 'Feb', orders: 52 },
    { name: 'Mar', orders: 38 },
    { name: 'Apr', orders: 65 },
    { name: 'May', orders: 48 },
    { name: 'Jun', orders: 72 },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await dashboardService.getOverview();
        setOverview(data);
        
        // Fetch recent orders
        const ordersResponse = await api.get('/orders?limit=5');
        if (ordersResponse.data && ordersResponse.data.data) {
          setRecentOrders(ordersResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching overview:', error);
        // Set default values on error
        setOverview({
          totalProducts: 0,
          totalCategories: 0,
          totalOrders: 0,
          totalCustomers: 0,
        });
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to Tarzen Mobile Accessories Admin Panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={overview.totalProducts}
          icon={Package}
          color="blue"
          trend={12}
        />
        <StatCard
          title="Total Categories"
          value={overview.totalCategories}
          icon={Tags}
          color="green"
          trend={8}
        />
        <StatCard
          title="Total Orders"
          value={overview.totalOrders}
          icon={ShoppingCart}
          color="purple"
          trend={15}
        />
        <StatCard
          title="Total Customers"
          value={overview.totalCustomers}
          icon={Users}
          color="yellow"
          trend={22}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Overview Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales Trend Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            View All
            <TrendingUp size={16} />
          </button>
        </div>
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
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{order.customerDetails?.name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{order.totalPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.orderStatus === 'Shipped'
                            ? 'bg-purple-100 text-purple-800'
                            : order.orderStatus === 'Confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
