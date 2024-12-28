// import React, { useContext, useState } from 'react'
// import logo from '../../public/logo.png'
// import { Link } from 'react-router-dom'
// import { UserContext } from '../Context/UserContext'
// import axios from 'axios'

// function Navbar() {

//   const [log, setLog] = useState('Login')
//   const { token, url } = useContext(UserContext)
//   const [data, setData] = useState('')

//   if (token) {
//     setLog('Profile')
//   }

//   const handleSearch = async(e) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post(`${url}/itinerary/searchLocation`, 
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         },
//       )
//       setData(response)
//     } catch (error) {
//       console.log('An error while searching ', error);
//     }
//   }


//   return (
//     <div className='flex justify-between mx-12 py-2'>

//       <Link to='/'>
//         <div className='items-center flex flex-col'>
//           <img src={logo} alt="" className='h-12 w-12' />
//           <p className='text-[9px]'>TRIPO: A new way to trip</p>
//         </div>
//       </Link>

//       <div className='flex items-center'>
//         <ul className='flex gap-7 text-lg'>
//           <Link to='/'>
//             <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>Home</li>
//           </Link>
//           <Link to='/plantrip'>
//             <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>Plan A Trip</li>
//           </Link>
//           <Link to='/about'>
//             <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>About Us</li>
//           </Link>
//           <Link to='/contact'>
//             <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>Contact Us</li>
//           </Link>
//         </ul>
//       </div>

//       <div className='flex items-center gap-10'>
//         <form className='bg-gray-700 rounded-xl pr-5 flex' onSubmit={handleSearch}>
//           <input
//             type="search"
//             placeholder='Search for location'
//             className='rounded-xl px-2 py-1 bg-gray-700'
//           />
//           <button type='submit' className='text-black items-center'>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 hover:text-blue-600 hover:size-6">
//               <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//             </svg>
//           </button>
//         </form>
//         {
//           log === 'Login' && (
//             <Link to='/login'>
//               <button className='px-1 py-1 rounded-xl font-bold'>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" className="size-8">
//                   <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                 </svg>
//               </button>
//             </Link>
//           )
//         }
//         {
//           log === 'Profile' && (
//             <Link to='/profile'>
//               <button className='bg-blue-600 px-4 py-1 rounded-xl font-bold'>{log}</button>
//             </Link>
//           )
//         }
//       </div>

//     </div>
//   )
// }

// export default Navbar


import React, { useContext, useState, useEffect } from 'react';
import logo from '../../public/logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

function Navbar() {
  const [log, setLog] = useState('Login');
  const [searchInput, setSearchInput] = useState('');
  const { token, url } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      setLog('Profile');
    }
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/itinerary/searchLocation`,
        { location: searchInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Search Results:', response.data);
    } catch (error) {
      console.error('An error occurred while searching:', error);
    }
  };

  return (
    <div className="flex justify-between mx-12 py-2">
      {/* Logo */}
      <Link to="/">
        <div className="items-center flex flex-col">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <p className="text-[9px]">TRIPO: A new way to trip</p>
        </div>
      </Link>

      {/* Navbar Links */}
      <div className="flex items-center">
        <ul className="flex gap-7 text-lg">
          <Link to="/">
            <li className="text-gray-400 active:underline focus:text-blue-600 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/plantrip">
            <li className="text-gray-400 active:underline focus:text-blue-600 cursor-pointer">
              Plan A Trip
            </li>
          </Link>
          <Link to="/about">
            <li className="text-gray-400 active:underline focus:text-blue-600 cursor-pointer">
              About Us
            </li>
          </Link>
          <Link to="/contact">
            <li className="text-gray-400 active:underline focus:text-blue-600 cursor-pointer">
              Contact Us
            </li>
          </Link>
        </ul>
      </div>

      {/* Search and Profile/Login */}
      <div className="flex items-center gap-10">
        {/* Search Bar */}
        <form
          className="bg-gray-700 rounded-xl pr-5 flex"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            placeholder="Search for location"
            className="rounded-xl px-2 py-1 bg-gray-700 text-white"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="text-white items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 hover:text-blue-600 hover:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>

        {/* Login/Profile Button */}
        {log === 'Login' ? (
          <Link to="/login">
            <button className="px-1 py-1 rounded-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="orange"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          </Link>
        ) : (
          <Link to="/profile">
            <button className="bg-blue-600 px-4 py-1 rounded-xl font-bold">
              {log}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
