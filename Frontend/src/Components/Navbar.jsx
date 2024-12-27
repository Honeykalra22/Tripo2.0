import React, { useContext, useState } from 'react'
import logo from '../../public/logo.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

function Navbar() {

  const [log, setLog] = useState('Login')
  const { token } = useContext(UserContext)

  if (token) {
    setLog('Profile')
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }


  return (
    <div className='flex justify-between mx-12 py-2'>
      <Link to='/'>
        <div className='items-center flex flex-col'>
          <img src={logo} alt="" className='h-12 w-12' />
          <p className='text-[9px]'>TRIPO: A new way to trip</p>
        </div>
      </Link>

      <div className='flex items-center'>
        <ul className='flex gap-7 text-lg'>
          <Link to='/'>
            <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>Home</li>
          </Link>
          <Link to='/plantrip'>
            <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>Plan A Trip</li>
          </Link>
          <Link to='/about'>
            <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>About Us</li>
          </Link>
          <Link to='/contact'>
            <li className='text-gray-400 active:underline focus:text-blue-600 cursor-pointer'>Contact Us</li>
          </Link>
        </ul>
      </div>

      <div className='flex items-center gap-10'>
        <form className='bg-white rounded-xl pr-5' onSubmit={handleSearch}>
          <input
            type="search"
            placeholder='Search for location'
            className='rounded-xl px-2 py-1'
          />
          <button type='submit' className='text-black'>Search</button>
        </form>
        {
          log === 'Login' && (
            <Link to='/login'>
              <button className='bg-blue-600 px-4 py-1 rounded-xl font-bold'>{log}</button>
            </Link>
          )
        }
        {
          log === 'Profile' && (
            <Link to='/profile'>
              <button className='bg-blue-600 px-4 py-1 rounded-xl font-bold'>{log}</button>
            </Link>
          )
        }
      </div>

    </div>
  )
}

export default Navbar