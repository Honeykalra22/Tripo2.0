import React from 'react'
import { TravelBox } from '../Components/TravelBox'
import logo from '../../public/logo.png'
function Home() {

  const mockPlace = [
    {
      name: "Eiffel Tower",
      image: logo,
      address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      openingTime: "9:00 AM",
      closingTime: "12:00 AM",
      tags: ["Landmark", "Paris", "Historical"],
    },
    {
      name: "Eiffel Tower",
      image: 'https://media.architecturaldigest.com/photos/66a951edce728792a48166e6/16:9/w_1920,c_limit/GettyImages-955441104.jpg',
      address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      openingTime: "9:00 AM",
      closingTime: "12:00 AM",
      tags: ["Landmark", "Paris", "Historical"],
    },
  ]

  return (
    <div className='flex flex-wrap gap-10 my-10 justify-center'>
      {
        mockPlace.map((place, index) => (
          <TravelBox key={index} place={place} />
        ))
      }
    </div>
  )
}

export default Home