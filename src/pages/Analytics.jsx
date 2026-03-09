import { useState, useEffect } from 'react';
import Card from '../components/Card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  // Mock data (replace with API calls)
  const monthlyOrdersData = [
    { name: 'Jan', orders: 145 },
    { name: 'Feb', orders: 168 },
    { name: 'Mar', orders: 192 },
    { name: 'Apr', orders: 175 },
    { name: 'May', orders: 210 },
    { name: 'Jun', orders: 245 },
  ];

  const topProductsData = [
    { name: 'iPhone Cases', value: 45 },
    { name: 'Screen Protectors', value: 38 },
    { name: 'Chargers', value: 32 },
    { name: 'Earbuds', value: 28 },
    { name: 'Cables', value: 25 },
  ];

  const revenueTrendData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 61000 },
    { name: 'Apr', revenue: 55000 },
    { name: 'May', revenue: 68000 },
    { name: 'Jun', revenue: 75000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Business insights and performance metrics</p>
      </div>

      {/* Monthly Orders Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Orders Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyOrdersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={2} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Selling Products Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10b981" name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProductsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Analytics;
