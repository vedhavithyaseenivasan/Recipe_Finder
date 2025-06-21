import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('https://recipe-finder-backend-cw2w.onrender.com/admin/signup', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || 'Server error');
    }
  };

  return (
    <div className="background">
      <style>{`
        /* Full page background with the image */
        .background {
          background: url('https://png.pngtree.com/thumb_back/fh260/background/20240328/pngtree-healthy-thai-food-recipes-concept-image_15645273.jpg') no-repeat center center/cover;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-end; /* Aligns the card to the right */
          padding-right: 230px; /* Optional: Adds some padding */
        }

        /* Style for the container */
.Authcontainer {
  max-width: 550px;
  padding: 30px;
  background-color: transparent;
  /*background-color: rgba(255, 255, 255, 0.9); */ /* Semi-transparent white */
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
  margin-right: 20px; /* Adds margin to keep it away from the edge */
}



        /* Other styles remain unchanged */
        /* Style for the title (Admin Signup) */
h2 {
  text-align: center;
  color: white;
  margin-bottom: 25px;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Added text shadow */
}

/* Style for the form labels */
.form-label {
  font-weight: bold;
  color: white;
  font-size: 0.9rem;
  margin-bottom: 6px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4); /* Added text shadow */
}


        .text-danger {
          color: #e74c3c;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .form-control {
          width: 100%;
          border-radius: 8px;
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ddd;
          background-color: #f4f6f9;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-control:focus {
          border-color: #3498db;
          box-shadow: 0 0 8px rgba(52, 152, 219, 0.2);
          outline: none;
        }

        .btn {
          width: 100%;
          padding: 12px;
          background-color: #8e44ad;
          border: none;
          color: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          border-radius: 8px;
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .btn:hover {
          background-color: #9b59b6;
          transform: translateY(-2px);
        }

        .btn:active {
          background-color: #8e44ad;
          transform: translateY(0);
        }

        @media (max-width: 576px) {
          .Authcontainer {
            padding: 20px;
            margin: 40px auto;
          }
          
          h2 {
            font-size: 1.6rem;
          }
          
          .form-control {
            font-size: 0.95rem;
          }
          
          .btn {
            font-size: 1rem;
          }
        }
      `}</style>
      
      <div className="Authcontainer">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        {message && <p className="text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default AdminSignup;
