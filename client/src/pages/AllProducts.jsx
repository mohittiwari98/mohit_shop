import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    let result = products

    // Search Filter
    if (searchQuery && searchQuery.length > 0) {
      const query = searchQuery.toLowerCase()
      result = result.filter((product) =>
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      )
    }

    // Show only in-stock products
    result = result.filter((product) => product.inStock)

    setFilteredProducts(result)
  }, [products, searchQuery])

  return (
    <section className="mt-16 max-w-7xl mx-auto px-5 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-1">
            COLLECTION
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            All Products
          </h1>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <p className="text-gray-500 font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
          
          {searchQuery && (
            <div className="text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full text-sm font-medium">
              Results for "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-7">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product._id || index} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl">🔍</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {searchQuery ? "No matching products" : "No products found"}
          </h3>
          <p className="text-gray-500 max-w-md">
            {searchQuery 
              ? `We couldn't find any products matching "${searchQuery}"` 
              : "Please check back later for new arrivals"}
          </p>
          
          {searchQuery && (
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </section>
  )
}

export default AllProducts