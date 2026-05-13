import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
  const { products } = useAppContext()
  const { category } = useParams()

  const categoryInfo = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  )

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  )

  return (
    <section className="mt-16 max-w-7xl mx-auto px-5 md:px-8">
      {/* Header */}
      {categoryInfo ? (
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-1">
            CATEGORY
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            {categoryInfo.text}
          </h1>
          <div className="h-0.5 w-20 bg-emerald-600 mt-4 rounded-full" />
        </div>
      ) : (
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Category</h1>
        </div>
      )}

      {/* Results Info */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600 font-medium">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </p>
        
        {categoryInfo && (
          <p className="text-sm text-gray-500">
            Showing all {categoryInfo.text.toLowerCase()}
          </p>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <span className="text-5xl text-gray-400">📦</span>
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 mb-3">
            No products found
          </h3>
          <p className="text-gray-500 max-w-md text-lg">
            We couldn't find any products in this category at the moment.
          </p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-8 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-2xl transition-all active:scale-95"
          >
            Go Back
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductCategory