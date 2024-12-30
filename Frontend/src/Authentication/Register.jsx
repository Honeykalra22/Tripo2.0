import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/Slices/auth.slice.js';
import Loading from '../Components/Loading.jsx';

function Register() {
  const navigate = useNavigate();

  const loading = useSelector(state => state.auth?.loading);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    mobile_no: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!data.username || !data.fullname || !data.email || !data.password || !data.mobile_no) {
      setMessage('All fields are required');
      setError(true);
      return;
    }     
    const response = await dispatch(registerUser(data));

    if(response?.payload) {
      setMessage(response.payload.message);
      const username = data?.username;
      const password = data?.password;
      const login = await dispatch(loginUser({ username, password }));
  
      if(login?.payload) {
        setError(false);
        
        navigate('/');
      }
      else {
          navigate('/login');
        }
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
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
          onChange={handleChange}
        />
        <input
          type="text"
          name="fullname"
          value={data.fullname}
          placeholder="fullname"
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="email"
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
          onChange={handleChange}
        />
        <input
          type="mobile_no"
          name="mobile_no"
          value={data.mobile_no}
          placeholder="mobile number"
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="password"
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
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
