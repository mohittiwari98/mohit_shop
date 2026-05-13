import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext()

  const handleNavigate = (category) => {
    navigate(`/products/${category.path.toLowerCase()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="mt-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-600 mb-1">
            EXPLORE OUR
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-none tracking-tight">
            Categories
          </h2>
        </div>

        <button
          onClick={() => { navigate('/products'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition-all duration-200 group"
        >
          View All Products
          <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 group-hover:border-orange-600 transition-colors">
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(category)}
            className="group relative flex flex-col items-center justify-center gap-4 py-7 px-4 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-4 active:scale-[0.98]"
            style={{ backgroundColor: category.bgColor }}
            aria-label={`Browse ${category.text}`}
          >
            {/* Image Container */}
            <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 bg-white/40 rounded-2xl blur-xl scale-75 group-hover:scale-90 transition-transform duration-500" />
              <img
                src={category.image}
                alt={category.text}
                className="w-full h-full object-contain drop-shadow-md relative z-10"
              />
            </div>

            {/* Label */}
            <div className="text-center">
              <p className="text-sm sm:text-base font-semibold text-gray-800 leading-tight tracking-tight">
                {category.text}
              </p>
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-orange-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Enhanced shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Mobile All Products */}
      <div className="mt-8 text-center sm:hidden">
        <button
          onClick={() => { navigate('/products'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-all active:scale-95"
        >
          Browse All Products
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Categories