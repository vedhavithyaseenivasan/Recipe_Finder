import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './components/Auth.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://recipe-finder-backend-cw2w.onrender.com/api/login', { identifier, password });
      localStorage.setItem('user', JSON.stringify(response.data.user)); 
      navigate('/search'); 
      
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="Authcontainer">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username or Email</Form.Label>
          <Form.Control type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <br></br>
        <Button type="submit">Login</Button>
        <p>Click to Signup <a href='/signup'>Signup</a></p>
      </Form>
    </div>
  );
};

export default Login;
