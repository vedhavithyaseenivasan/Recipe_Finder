import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Search from "./search/search"
import Home from "./home/home"
import Signup from "./logins/signup"
import Login from "./logins/login"
import Nav from "./Nav/Navbar"
import ProtectedRoute from "./Nav/components/ProtectedRoute"
import AdminProtectedRoute from "./Nav/components/AdminProtectedRoute"
import OTP from "./logins/components/otp"
import AdminLogin from "./admin/AdminLogin"
import AdminSignup from "./admin/AdminSignup"
import Dashboard from "./admin/dashboard"
import Wishlist from "./Wishlist"
import ChatbotWidget from "./components/ChatbotWidget"
import { NotificationProvider } from "./components/NotificationContext"

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#ec4899",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  const location = useLocation()
  const noNavRoutes = ["/admin", "/admin/signup", "/dash"]
  const noChatbotRoutes = ["/admin", "/admin/signup", "/dash", "/login", "/signup", "/otp"]

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <div className="rf-app-container">
          <div className="rf-floating-shapes">
            <div className="rf-shape rf-shape-1"></div>
            <div className="rf-shape rf-shape-2"></div>
            <div className="rf-shape rf-shape-3"></div>
            <div className="rf-shape rf-shape-4"></div>
          </div>

          {!noNavRoutes.includes(location.pathname) && <Nav />}

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route
              path="/dash"
              element={
                <AdminProtectedRoute>
                  <Dashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Chatbot Widget - Only show on certain pages */}
          {!noChatbotRoutes.includes(location.pathname) && <ChatbotWidget />}
        </div>
      </NotificationProvider>
    </ThemeProvider>
  )
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
)

export default AppWithRouter
