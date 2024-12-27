import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const url = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!data.username || !data.fullname || !data.email || !data.password) {
      setMessage('All fields are required');
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('fullname', data.fullname);
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const response = await axios.post(`${url}/user/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('User is registered successfully');
      setError(false);
      setData({ username: '', fullname: '', email: '', password: '' });
    } catch (error) {
      console.error('Registration error:', error);
      setError(true);
      setMessage(error.response?.data?.data?.message || 'Something went wrong');
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center text-center gap-10 justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleRegister}
        className="bg-gray-950 shadow-md flex flex-col rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className='text-3xl font-bold mb-8'>Tripo: A new way to travel</h1>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          value={data.username}
          placeholder="username"
          className="mb-4 p-2 w-full border border-gray-500 rounded text-black"
          onChange={handleChange}
        />
        <input
          type="text"
          name="fullname"
          value={data.fullname}
          placeholder="fullname"
          className="mb-4 p-2 w-full border border-gray-500 rounded text-black"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="email"
          className="mb-4 p-2 w-full border border-gray-500 rounded text-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="password"
          className="mb-4 p-2 w-full border border-gray-500 rounded text-black"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >Register</button>
        <p className=''>Already have account
          <Link to='/login'>
            <span className='text-blue-500 mx-2 underline cursor-pointer hover:text-blue-600'>login here</span>
          </Link>
        </p>
      </form>
      {message && (
        <p className={`${error ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Register;
