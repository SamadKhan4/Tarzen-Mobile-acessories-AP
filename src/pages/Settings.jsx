import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { settingsService } from '../services/settingsService';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    contactNumber: '',
    shopAddress: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // const response = await settingsService.getSettings();
        
        // Mock data for demonstration
        const mockSettings = {
          storeName: 'Tarzen Mobile Accessories',
          contactNumber: '+91 9876543210',
          shopAddress: 'Shop No. 123, Main Market Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          email: 'contact@tarzen.com',
        };

        setFormData(mockSettings);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // await settingsService.updateSettings(formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert('Settings updated successfully!');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to update settings',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your store settings</p>
      </div>

      {/* Settings Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Store Name"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Enter store name"
              required
              error={errors.storeName}
            />

            <Input
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
              error={errors.contactNumber}
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            error={errors.email}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="shopAddress"
              value={formData.shopAddress}
              onChange={handleChange}
              placeholder="Enter shop address"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.shopAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.shopAddress}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              error={errors.city}
            />

            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
              error={errors.state}
            />

            <Input
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              required
              error={errors.pincode}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Settings'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
