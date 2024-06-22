// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const LoginPage = ({setLogin}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        email,
        password,
      });
        console.log("Response for loging in ", response)
      setSuccess('User registered successfully!');
      setError('');

      const {token}= response.data.data;
      localStorage.setItem('token', token);
      if(response){
        setLogin(true)
      }
    } catch (err) {
      setError('Error registering user');
      setSuccess('');
    }
  };

  return (
    <div className="login-page">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
