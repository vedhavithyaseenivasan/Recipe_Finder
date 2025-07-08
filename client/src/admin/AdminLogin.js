"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./AdminLogin.css"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if user is already logged in and is admin
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      if (user.role === "admin") {
        navigate("/dash")
      } else {
        // Regular user trying to access admin - redirect to home
        navigate("/")
      }
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post("https://recipe-finder-x2s0.onrender.com/admin/login", formData)

      // Store admin user data with role
      const adminUser = {
        ...res.data.user,
        role: "admin",
      }
      localStorage.setItem("user", JSON.stringify(adminUser))
      navigate("/dash")
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid admin credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rf-admin-auth-page">
      <div className="rf-admin-auth-container">
        <div className="rf-admin-auth-card">
          <div className="rf-admin-auth-header">
            <div className="rf-admin-auth-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="rf-admin-auth-title">Admin Access</h1>
            <p className="rf-admin-auth-subtitle">Authorized personnel only</p>
          </div>

          {message && <div className="rf-error-message">{message}</div>}

          <form onSubmit={handleSubmit} className="rf-auth-form">
            <div className="rf-form-group">
              <label className="rf-form-label">Admin Email</label>
              <div className="rf-input-wrapper">
                <div className="rf-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rf-form-input"
                  placeholder="Enter admin email"
                />
              </div>
            </div>
            <div className="rf-form-group">
              <label className="rf-form-label">Password</label>
              <div className="rf-input-wrapper">
                <div className="rf-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rf-form-input"
                  placeholder="Enter admin password"
                />
              </div>
            </div>
            <button type="submit" className="rf-admin-submit-btn" disabled={loading}>
              {loading ? (
                <div className="rf-loading-spinner"></div>
              ) : (
                <>
                  <span>Admin Sign In</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="rf-admin-auth-footer">
            <p style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>
              ⚠️ Restricted Access - Admin Only
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
