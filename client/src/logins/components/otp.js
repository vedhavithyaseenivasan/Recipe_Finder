// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const OtpVerification = () => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state.email; // Get email from state

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('https://recipe-finder-x2s0.onrender.com/api/verify-otp', { email, otp });
//       navigate('/login'); // Redirect to login after successful OTP verification
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>OTP Verification</h2>
//       {error && <p className="text-danger">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Enter OTP sent to {email}</label>
//           <input
//             type="text"
//             className="form-control"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Verify OTP</button>
//       </form>
//     </div>
//   );
// };

// export default OtpVerification;









"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useNotification } from "../../components/NotificationContext"
import "../components/Auth.css"

const OtpVerification = () => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email
  const { addNotification } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post("https://recipe-finder-x2s0.onrender.com/api/verify-otp", { email, otp })
      addNotification("Email verified successfully! You can now login.", "success")
      navigate("/login")
    } catch (err) {
      const errorMessage = err.response?.data?.message || "OTP verification failed. Please try again."
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
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
              </svg>
            </div>
            <h1 className="rf-auth-title">Verify Your Email</h1>
            <p className="rf-auth-subtitle">Enter the OTP sent to {email}</p>
          </div>

          {error && <div className="rf-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="rf-auth-form">
            <div className="rf-form-group">
              <label className="rf-form-label">Verification Code</label>
              <div className="rf-input-wrapper">
                <div className="rf-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="rf-form-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  required
                />
              </div>
            </div>

            <button type="submit" className="rf-submit-btn" disabled={loading}>
              {loading ? (
                <div className="rf-loading-spinner"></div>
              ) : (
                <>
                  <span>Verify OTP</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
