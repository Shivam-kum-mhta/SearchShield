import { useState } from 'react';
import logo from './assets/shield-removebg-preview.png';
import axios from 'axios';
import PropTypes from 'prop-types';
const Login = ({setLogin}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isLogin) {
    try {
      const response = await axios.post('http://localhost:3003/login', {
        email,
        password,
      });
        console.log("Response for loging in ", response)
      setMessage('User Logined successfully!');

      const {token}= response.data.data;
      localStorage.setItem('token', token);
      if(response){
        setLogin(true)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Set error message from JSON response
      } else {
        setMessage('An error occurred. Please try again.'); // Fallback error message
      }
    }
  }
  else{
    try {
      const response = await axios.post('http://localhost:3003/signup', {
        username,
        email,
        password,
      });
        console.log("Response for sign in ", response)
      setMessage('User signed in successfully!');

      const {token}= response.data.data;
      localStorage.setItem('token', token);
      if(token){
        setLogin(true)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Set error message from JSON response
      } else {
        setMessage('An error occurred. Please try again.'); // Fallback error message
      }
    }
}
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400">
      <div className="mb-6">
        <img src={logo} alt="SearchShield Logo" className="w-36 h-auto" />
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-80">
        {message? <p className="text-red-400">{message}</p>: null}

        <h2 className="text-2xl mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-green-400 border border-green-400 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-green-400 border border-green-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-green-400 border border-green-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-400 text-gray-900 rounded font-bold"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div
          className="mt-4 cursor-pointer text-sm"
          onClick={handleToggle}
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  
  setLogin: PropTypes.string.isRequired,
}

export default Login;
