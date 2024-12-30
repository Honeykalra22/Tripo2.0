import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10" style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.25)' }}>
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
        <Link to='/'>
          <div className='item-center flex flex-col'>
            <img src="/logo.png" alt="" className='h-24 w-24' />
            <p className='text-[16px]'>TRIPO: A new way to trip</p>
          </div>
        </Link>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-semibold text-gray-400 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-sky-500 transition duration-200">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-sky-500 transition duration-200">Contact Us</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-sky-500 transition duration-200">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-400 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-gray-400 hover:text-sky-500 transition duration-200">Blog</a></li>
              <li><a href="/help" className="text-gray-400 hover:text-sky-500 transition duration-200">Help Center</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-sky-500 transition duration-200">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-400 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-sky-500 transition duration-200">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-sky-500 transition duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-end">
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="w-6 h-6 text-gray-400 hover:text-blue-500 transition duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.018 3.675 9.156 8.438 9.875v-6.985H8.078V12h2.36v-2.087c0-2.334 1.393-3.616 3.516-3.616 1.02 0 2.087.183 2.087.183v2.297h-1.177c-1.16 0-1.52.718-1.52 1.45V12h2.586l-.414 2.89h-2.172v6.985C18.325 21.156 22 17.018 22 12z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg className="w-6 h-6 text-gray-400 hover:text-blue-400 transition duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6c-.77.35-1.58.59-2.43.69a4.14 4.14 0 0 0 1.84-2.3c-.82.48-1.73.83-2.7 1.01a4.11 4.11 0 0 0-7.04 3.75A11.65 11.65 0 0 1 3.09 5.15a4.1 4.1 0 0 0 1.27 5.48A4.08 4.08 0 0 1 2.8 10v.05a4.12 4.12 0 0 0 3.3 4.03 4.11 4.11 0 0 1-1.85.07 4.11 4.11 0 0 0 3.84 2.85A8.23 8.23 0 0 1 2 18.13a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.32 8.32 0 0 0 24 4.56a8.26 8.26 0 0 1-2.38.65A4.12 4.12 0 0 0 22.46 6z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-6 h-6 text-gray-400 hover:text-pink-500 transition duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.25 0 3.637.012 4.914.071 1.18.054 1.958.244 2.415.414a4.841 4.841 0 0 1 1.731 1.145 4.839 4.839 0 0 1 1.145 1.73c.17.458.36 1.235.414 2.416.06 1.276.072 1.664.072 4.912s-.012 3.636-.071 4.912c-.054 1.18-.244 1.957-.414 2.415a4.84 4.84 0 0 1-1.145 1.73 4.837 4.837 0 0 1-1.73 1.145c-.458.17-1.235.36-2.415.414-1.277.06-1.665.071-4.914.071s-3.637-.012-4.914-.071c-1.18-.054-1.957-.244-2.415-.414a4.84 4.84 0 0 1-1.73-1.145 4.839 4.839 0 0 1-1.145-1.73c-.17-.458-.36-1.235-.414-2.415C2.212 15.637 2.2 15.25 2.2 12s.012-3.637.071-4.914c.054-1.18.244-1.958.414-2.415a4.84 4.84 0 0 1 1.145-1.73A4.84 4.84 0 0 1 5.56 2.686c.458-.17 1.235-.36 2.415-.414C8.363 2.212 8.75 2.2 12 2.2m0-2.2C8.742 0 8.326.013 7.053.072 5.768.13 4.785.334 4.1.676A7.047 7.047 0 0 0 1.826 2.1 7.048 7.048 0 0 0 .676 4.1C.334 4.785.13 5.768.072 7.053.013 8.326 0 8.742 0 12c0 3.258.013 3.674.072 4.947.058 1.285.262 2.268.604 2.953a7.047 7.047 0 0 0 2.1 2.275 7.048 7.048 0 0 0 2.275 2.1c.685.342 1.668.546 2.953.604C8.326 23.987 8.742 24 12 24c3.258 0 3.674-.013 4.947-.072 1.285-.058 2.268-.262 2.953-.604a7.05 7.05 0 0 0 2.275-2.1 7.05 7.05 0 0 0 2.1-2.275c.342-.685.546-1.668.604-2.953.058-1.273.072-1.689.072-4.947s-.013-3.674-.072-4.947c-.058-1.285-.262-2.268-.604-2.953a7.048 7.048 0 0 0-2.1-2.275 7.048 7.048 0 0 0-2.275-2.1C17.268.334 16.285.13 15 .072 13.726.013 13.31 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-8 3.999 3.999 0 0 1 0 8zM18.406 4.594a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} Tripo. All rights reserved.
      </div>
    </footer>


  )
}

export default Footer

// triptosafar