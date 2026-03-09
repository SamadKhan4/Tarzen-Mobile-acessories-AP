import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Package } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');
    setLoading(true);

    console.log('Submitting login with:', formData);
    const result = await login(formData);
    console.log('Login result:', result);

    if (result.success) {
      console.log('Login successful, navigating to dashboard');
      // Small delay to ensure localStorage is updated
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } else {
      console.error('Login failed:', result.message);
      setError(result.message || 'Login failed. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Package size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Tarzen</h1>
          <p className="text-gray-600 mt-1">Mobile Accessories</p>
          <p className="text-sm text-gray-500 mt-2">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Admin access only
        </p>
      </div>
    </div>
  );
};

export default Login;
