import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className=' text-white flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl max-3 md:mx-auto rounded-2xl overflow-hidden'>
        <div>
            <h2 className='text-3xl font-medium'>
                Do you Own a Luxary Car? 
            </h2>
            <p className='mt-2'>Monetize your vehicles effortlessly by listing it on Car Rental</p>
            <p className='max-w-130'>
               We take care of Insurance, DRiver Verification and secure Payments So that you can earn passive income ,Stress-free 
            </p>
            <button className=' px-8 py-3  text-blue-500 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>
                List Your Car
            </button>
        </div>
        <img src={assets.banner_car_image} alt="Car" className='max-h-45 mt-10'/>
      
    </div>
  )
}

export default Banner
