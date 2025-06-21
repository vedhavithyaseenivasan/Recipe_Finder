import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search/search';
import Home from './home/home';
import Signup from './logins/signup';
import Login from './logins/login';
import Nav from './Nav/Navbar'; 
import ProtectedRoute from './Nav/components/ProtectedRoute'; // Import ProtectedRoute
import OTP from './logins/components/otp';
import AdminLogin from './admin/AdminLogin';
import AdminSignup from './admin/AdminSignup';
import Dashboard from './admin/dashboard';
import Wishlist from './Wishlist';
import RecipeChatbot from './RecipeChatbot'; // Import RecipeChatbot component

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const location = useLocation(); // Get current location

  // Define routes that should not display the Nav component
  const noNavRoutes = ['/admin', '/admin/signup', '/dash'];

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Conditionally render Nav based on the current route */}
        {!noNavRoutes.includes(location.pathname) && <Nav />} {/* Add Logout button here */}
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> {/* Route for Home */}
        <Route path="/otp" element={<OTP />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/search" element={
          <ProtectedRoute>
            <Search /> {/* Protected Search Route */}
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={<RecipeChatbot />} /> {/* New route for RecipeChatbot */}
      </Routes>
    </ThemeProvider>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
