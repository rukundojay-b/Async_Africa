import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import our pages
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Test from './components/test';
import Products from './components/Products';
import Orders from './components/Orders';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gray-800">
            STOCKPRO
          </div>
          <div className="flex space-x-6 items-center">
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="/orders" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
            {username && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium ml-4"
              >
                Logout ({username})
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const isAuthenticated = !!localStorage.getItem('username');

  return (
    <BrowserRouter>
      <Navbar />
      <div className={`min-h-screen ${isAuthenticated ? 'pt-20' : 'flex items-center justify-center bg-gray-100'}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
