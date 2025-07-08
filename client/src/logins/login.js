// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import './components/Auth.css';

// const Login = () => {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://recipe-finder-x2s0.onrender.com/api/login', { identifier, password });
//       localStorage.setItem('user', JSON.stringify(response.data.user)); 
//       navigate('/search'); 
      
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div className="Authcontainer">
//       <h2>Login</h2>
//       {error && <p className="text-danger">{error}</p>}
//       <Form onSubmit={handleLogin}>
//         <Form.Group>
//           <Form.Label>Username or Email</Form.Label>
//           <Form.Control type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </Form.Group>
//         <br></br>
//         <Button type="submit">Login</Button>
//         <p>Click to Signup <a href='/signup'>Signup</a></p>
//       </Form>
//     </div>
//   );
// };

// export default Login;











"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useNotification } from "../components/NotificationContext"
import "./components/Auth.css"

const Login = () => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("https://recipe-finder-x2s0.onrender.com/api/login", { identifier, password })
      localStorage.setItem("user", JSON.stringify(response.data.user))
      addNotification("Welcome back! Login successful.", "success")
      navigate("/search")
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again."
      setError(errorMessage)
      addNotification(errorMessage, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rf-auth-page">
      <div className="rf-auth-container">
        <div className="rf-auth-card">
          <div className="rf-auth-header">
            <div className="rf-auth-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <h1 className="rf-auth-title">Welcome Back</h1>
            <p className="rf-auth-subtitle">Sign in to continue your culinary journey</p>
          </div>

          {error && <div className="rf-error-message">{error}</div>}

          <form onSubmit={handleLogin} className="rf-auth-form">
            <div className="rf-form-group">
              <label className="rf-form-label">Email or Username</label>
              <div className="rf-input-wrapper">
                <div className="rf-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="rf-form-input"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  required
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
                  type={showPassword ? "text" : "password"}
                  className="rf-form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button type="button" className="rf-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="rf-submit-btn" disabled={loading}>
              {loading ? (
                <div className="rf-loading-spinner"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="rf-auth-footer">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="rf-auth-link">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
