import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products, navigate } = useAppContext()

  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 5)

  return (
    <section className="mt-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-600 mb-1">
            MOST POPULAR
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Best Sellers
          </h2>
        </div>

        <button
          onClick={() => {
            navigate('/products')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition-all group"
        >
          View All
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

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-7">
        {bestSellers.length > 0 ? (
          bestSellers.map((product, index) => (
            <ProductCard 
              key={product.id || index} 
              product={product} 
              className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-12">
            No best sellers available at the moment.
          </p>
        )}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-8 text-center sm:hidden">
        <button
          onClick={() => {
            navigate('/products')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-all active:scale-95"
        >
          View All Best Sellers
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default BestSeller