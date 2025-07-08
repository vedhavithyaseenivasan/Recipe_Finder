"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./AdminLogin.css"

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: "", // Special admin registration key
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      const res = await axios.post("https://recipe-finder-x2s0.onrender.com/admin/signup", formData)
      setMessage("Admin account created successfully! Redirecting to login...")

      // Auto-redirect to admin login after 2 seconds
      setTimeout(() => {
        navigate("/admin")
      }, 2000)
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create admin account")
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
            <h1 className="rf-admin-auth-title">Admin Registration</h1>
            <p className="rf-admin-auth-subtitle">Create admin account with authorization key</p>
          </div>

          {message && (
            <div className={`rf-error-message ${message.includes("successfully") ? "rf-success-message" : ""}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="rf-auth-form">
            <div className="rf-form-group">
              <label className="rf-form-label">Admin Username</label>
              <div className="rf-input-wrapper">
                <div className="rf-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="rf-form-input"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

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
                  placeholder="Create admin password"
                />
              </div>
            </div>

            <div className="rf-form-group">
              <label className="rf-form-label">Admin Authorization Key</label>
              <div className="rf-input-wrapper">
                <div className="rf-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="adminKey"
                  value={formData.adminKey}
                  onChange={handleChange}
                  required
                  className="rf-form-input"
                  placeholder="Enter admin authorization key"
                />
              </div>
            </div>

            <div className="rf-admin-key-info">
              <p>⚠️ Admin authorization key required for registration</p>
              <p>Contact system administrator for the key</p>
            </div>

            <button type="submit" className="rf-admin-submit-btn" disabled={loading}>
              {loading ? (
                <div className="rf-loading-spinner"></div>
              ) : (
                <>
                  <span>Create Admin Account</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="rf-admin-auth-footer">
            <div className="rf-admin-links">
              <p>
                Already have admin access?{" "}
                <a href="/admin" className="rf-admin-auth-link">
                  Sign in here
                </a>
              </p>
              <p className="rf-admin-note">✅ After registration, you'll be automatically redirected to login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSignup
