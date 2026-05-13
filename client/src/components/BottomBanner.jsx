import React from 'react'
import assets, { features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24 overflow-hidden rounded-2xl shadow-lg'>
      {/* Banner Images */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className='w-full hidden md:block object-cover'
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className='w-full block md:hidden object-cover'
      />

      {/* Gradient overlay for readability */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/60 hidden md:block' />
      <div className='absolute inset-0 bg-white/50 block md:hidden' />

      {/* Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center md:items-end md:justify-center px-6 md:pr-16 lg:pr-24'>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md'>

          {/* Heading */}
          <p className='text-xs font-semibold tracking-[0.2em] uppercase text-orange-500 mb-1 text-center md:text-left'>
            Our Promise
          </p>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight text-center md:text-left'>
            Why We are <br className='hidden md:block' />the Best?
          </h1>

          {/* Features list */}
          <div className='flex flex-col gap-4'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='flex items-start gap-4 group'
              >
                {/* Icon wrapper */}
                <div className='flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:bg-orange-50 transition-all duration-200'>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className='w-5 h-5 md:w-6 md:h-6 object-contain'
                  />
                </div>

                {/* Text */}
                <div className='pt-0.5'>
                  <h3 className='text-base md:text-lg font-semibold text-gray-900 leading-snug'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-500 text-xs md:text-sm mt-0.5 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default BottomBanner;