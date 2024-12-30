import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/Slices/auth.slice.js';
import Loading from '../Components/Loading.jsx';

function Login() {
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth?.loading);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await dispatch(loginUser(data));
      if(response?.payload) {
        setError(false);
        setMessage(response.payload.message);
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
  if(loading) return <Loading/>
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
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
          onChange={handleChange}
          value={data.username}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border border-gray-300 rounded bg-gray-700"
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
