# Tarzen Mobile Accessories - Admin Dashboard

A modern, professional admin dashboard web application for managing a mobile accessories e-commerce system.

## 🚀 Tech Stack

- **Frontend Framework:** React.js 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **State Management:** Context API
- **Routing:** React Router 7
- **HTTP Requests:** Axios
- **Charts Library:** Recharts
- **Icons:** Lucide React

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── ImageUpload.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── Pagination.jsx
│   ├── PrivateRoute.jsx
│   ├── Select.jsx
│   ├── StatusBadge.jsx
│   └── StatCard.jsx
├── context/         # React Context providers
│   └── AuthContext.jsx
├── hooks/           # Custom React hooks
├── layout/          # Layout components
│   ├── DashboardLayout.jsx
│   ├── Header.jsx
│   └── Sidebar.jsx
├── pages/           # Page components
│   ├── AddCategory.jsx
│   ├── AddProduct.jsx
│   ├── Analytics.jsx
│   ├── Categories.jsx
│   ├── Customers.jsx
│   ├── Dashboard.jsx
│   ├── EditCategory.jsx
│   ├── EditProduct.jsx
│   ├── Login.jsx
│   ├── OrderDetail.jsx
│   ├── Orders.jsx
│   ├── Products.jsx
│   └── Settings.jsx
├── services/        # API services
│   ├── api.js
│   ├── authService.js
│   ├── categoryService.js
│   ├── customerService.js
│   ├── dashboardService.js
│   ├── orderService.js
│   ├── productService.js
│   └── settingsService.js
├── utils/           # Utility functions
├── App.jsx          # Main app component
├── index.css        # Global styles
└── main.jsx         # Entry point
```

## ✨ Features

### Authentication
- JWT-based authentication
- Protected routes with private route wrapper
- Automatic redirect on unauthorized access
- Token stored in localStorage

### Dashboard Overview
- Key business metrics at a glance
  - Total Products
  - Total Categories
  - Total Orders
  - Total Customers
- Interactive charts (Orders & Sales trends)
- Recent orders table

### Product Management
- View all products with pagination
- Search functionality
- Add new products with images
- Edit existing products
- Delete products
- Stock status tracking (Active, Out of Stock, Low Stock)

### Category Management
- View all categories
- Add new categories with images
- Edit existing categories
- Delete categories
- Product count per category

### Order Management
- View all orders with detailed information
- Filter and search orders
- Update order status
- Cancel orders
- Detailed order view with:
  - Customer information
  - Ordered products
  - Payment & delivery details
  - Order summary

### Customer Management
- View registered customers
- Customer order history
- Contact information

### Analytics
- Monthly orders trend chart
- Top selling products visualization
- Product category distribution (Pie chart)
- Revenue trend analysis

### Settings
- Update store information
- Manage contact details
- Shop address configuration

## 🎨 Design Features

### Color Palette
- **Primary:** Dark Gray / Black (#1a202c)
- **Accent:** Blue (#2563eb)
- **Background:** Light Gray (#f5f7fa)
- **Success:** Green (#10b981)
- **Warning:** Yellow (#f59e0b)
- **Danger:** Red (#ef4444)

### UI Components
- Clean card-based layout
- Soft shadows and rounded corners
- Responsive tables with hover effects
- Modern form inputs with validation
- Status badges with color coding
- Pagination component
- Modal dialogs
- Image upload with preview

### Responsive Design
- Desktop optimized (default)
- Tablet responsive
- Mobile friendly (collapsed sidebar)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js version 20.19+ or 22.12+
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

The application is designed to connect with a Node.js + Express + MongoDB backend API.

### Base URL Configuration
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Available API Services
- **Auth Service:** Login, logout, token management
- **Dashboard Service:** Overview statistics
- **Product Service:** CRUD operations for products
- **Category Service:** CRUD operations for categories
- **Order Service:** Order management and status updates
- **Customer Service:** Customer data retrieval
- **Settings Service:** Store settings management

### Mock Data
Currently, the application uses mock data for demonstration. To connect to your backend:

1. Uncomment the API calls in each page/component
2. Remove or replace the mock data
3. Ensure your backend API follows the expected response structure

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Credentials sent to `/auth/login` endpoint
3. Backend returns JWT token and admin data
4. Token stored in localStorage
5. Admin data stored in localStorage
6. User redirected to dashboard
7. Token automatically included in all subsequent requests
8. Protected routes check for authentication

## 📊 State Management

The application uses React Context API for global state:
- **AuthContext:** Manages authentication state and admin data

Local state management with useState/useEffect for:
- Form data
- Loading states
- Error handling
- Pagination
- Search functionality

## 🎯 Key Features Implementation

### Protected Routes
```jsx
<PrivateRoute>
  <DashboardLayout />
</PrivateRoute>
```

### API Request Interceptor
Automatically attaches JWT token to all requests.

### Response Interceptor
Handles 401 errors by clearing storage and redirecting to login.

### Image Upload
FileReader API for client-side image preview before upload.

## 🧪 Testing

To test the application:

1. Start the development server
2. Navigate to the login page
3. Enter any credentials (backend integration required for actual auth)
4. Explore the dashboard and features

## 📝 Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Future Enhancements

- [ ] Dark mode toggle
- [ ] Export data to CSV/PDF
- [ ] Advanced filtering options
- [ ] Real-time notifications
- [ ] Bulk operations (delete, update)
- [ ] Product reviews management
- [ ] Inventory alerts
- [ ] Sales reports generation
- [ ] Multi-language support
- [ ] Role-based access control

## 🤝 Contributing

This is a custom admin panel built for Tarzen Mobile Accessories.

## 📄 License

This project is proprietary software created for Tarzen Mobile Accessories.

## 👨‍💻 Developer Notes

- All components are functional components using React hooks
- Code follows React best practices
- Consistent naming conventions used throughout
- Comments added for complex logic
- Error handling implemented in all async operations
- Loading states shown during API calls

## 📞 Support

For issues or questions, please refer to the code comments or contact the development team.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
