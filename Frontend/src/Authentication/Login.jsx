import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const url = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await axios.post(`${url}/user/login`, data);
      const token = response.data.data.accessToken;

      if (token) {
        localStorage.setItem('accessToken', token);
        setError(false);
        setMessage('User is logged in successfully');
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.data?.message || 'Something went wrong. Please try again.';
      setError(true);
      setMessage(errorMessage);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleLogin}
        className="bg-gray-950 shadow-md flex flex-col rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className='text-3xl font-bold mb-8'>Tripo: A new way to travel</h1>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          name="username"
          type="text"
          placeholder="Username..."
          className="mb-4 p-2 w-full border border-gray-500 rounded text-black"
          onChange={handleChange}
          value={data.username}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border border-gray-300 rounded text-black"
          onChange={handleChange}
          value={data.password}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className=''>don't have account
          <Link to='/register'>
            <span className='text-blue-500 mx-2 underline cursor-pointer hover:text-blue-600'>register here</span>
          </Link>
        </p>
      </form>
      {message && (
        <p
          className={`mt-4 ${error ? 'text-red-500' : 'text-green-500'
            } font-semibold`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
