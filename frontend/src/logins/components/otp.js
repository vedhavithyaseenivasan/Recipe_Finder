import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email; // Get email from state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://recipe-finder-backend-cw2w.onrender.com/api/verify-otp', { email, otp });
      navigate('/login'); // Redirect to login after successful OTP verification
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>OTP Verification</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter OTP sent to {email}</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;
