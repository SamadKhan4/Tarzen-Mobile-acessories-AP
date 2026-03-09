const StatusBadge = ({ status, type = 'default' }) => {
  const statusStyles = {
    // Order statuses
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    
    // Product statuses
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
    OutOfStock: 'bg-red-100 text-red-800',
    LowStock: 'bg-yellow-100 text-yellow-800',
  };

  const customStatus = statusStyles[type] || statusStyles[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${customStatus}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
