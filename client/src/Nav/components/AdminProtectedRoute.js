import { Navigate } from "react-router-dom"

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))

  // Check if user exists and has admin role
  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== "admin") {
    return <Navigate to="/" /> // Redirect non-admin users to home
  }

  return children
}

export default AdminProtectedRoute
