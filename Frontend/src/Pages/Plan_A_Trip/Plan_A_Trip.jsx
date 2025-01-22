import React from 'react'

function Plan_A_Trip() {
  return (
    <div className='flex flex-col items-center justify-center text-center min-h-screen bg-gray-800'>
      <form className="bg-gray-950 shadow-md flex flex-col rounded px-8 pt-6 pb-8 mb-4">
        <h1 className='text-3xl font-bold mb-8'>Make your trip easier with us</h1>
        <p className="text-xl font-bold mb-4">Fill the form below to get the best reccomdation for your trip</p>
        <input
          type="text"
          placeholder='Enter your name'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />

        <input
          type='text'
          placeholder='Enter your budget'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />

        <input
          type='number'
          placeholder='number of people'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />

        <input
          type='text'
          placeholder='Enter your destination'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />
        <input
          type='text'
          placeholder='Enter your starting point'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />

        <input
          type='date'
          placeholder='Enter your starting date'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />
        <input
          type='date'
          placeholder='Enter your ending date'
          className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-700"
        />
        <button
          type='submit'
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >Submit </button>

      </form>
    </div>
  )
}

export default Plan_A_Trip

/**
 * This file is the heart of this project
 * This file first takes the data from user as a form data
 * After this process this will redirect the user to reccomdation page
 * On reccomdation page there will be shown all AI generated data
 */