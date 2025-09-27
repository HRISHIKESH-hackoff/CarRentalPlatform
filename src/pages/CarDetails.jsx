import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY
  const handleSubmit = async (e)=>{
    e.preventDefault();
  }

  useEffect(() => {
    const foundCar = dummyCarData.find(car => car._id.toString() === id)
    setCar(foundCar)
  }, [id])

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-60" />
        Back to All Cars
      </button>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Section - Car Details (70%) */}
        <div className="lg:col-span-8 space-y-6">
          <img
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>
            <hr className="border-blue-800 my-6" />

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.carIcon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-blue-50 p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Extra Features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "ADAS LEVEL 6",
                  "Panaromic Sunroof",
                  "Ventilated Seats",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-500"
                  >
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Sticky Form (30%) */}
        <form onSubmit={handleSubmit} className="lg:col-span-4 shadow-lg h-max sticky top-20 rounded-xl p-9 space-y-6 text-gray-500 bg-white">
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}{car.pricePerDay}
            <span className="text-base text-gray-400 font-normal"> per day </span>
          </p>
          <hr className='border-borderColor my-6'/>

          {/* Add more form fields here later */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input type="date" className="border border-blue-600 px-3 py-2 rounded-lg required" required id ='pickup-date' min={new Date().toISOString().split('T')[0]}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date">Return Date Date</label>
            <input type="date" className="border border-blue-600 px-3 py-2 rounded-lg required" required id ='return-date' min={new Date().toISOString().split('T')[0]}/>
          </div>

          <button className='bg-blue-600 w-full  hover:bg-blue-500 transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>
            Book Now !
          </button>

          <p className='text-center text-sm'>
            No Credit Card required to reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default CarDetails



