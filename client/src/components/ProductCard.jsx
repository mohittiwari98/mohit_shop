import React from 'react';
import assets from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  const discount = product.price && product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

  return product && (
    <div 
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
            -{discount}%
          </div>
        )}
        
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
          {product.category}
        </p>

        <h3 className="font-semibold text-gray-900 text-lg leading-tight mt-1 mb-2 line-clamp-2 min-h-[3.2em]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array(5).fill('').map((_, i) => (
            <img
              key={i}
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="star"
              className="w-4 h-4"
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4)</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-emerald-600 tracking-tight">
              {currency}{product.offerPrice}
            </p>
            {product.price !== product.offerPrice && (
              <p className="text-sm text-gray-400 line-through">
                {currency}{product.price}
              </p>
            )}
          </div>

          {/* Cart Controls */}
          <div onClick={(e) => e.stopPropagation()}>
            {!cartItems[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-sm font-medium transition-all active:scale-95 shadow-md shadow-emerald-500/30"
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center bg-gray-100 rounded-2xl h-10 px-1">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-red-600 transition-colors active:bg-gray-200 rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="w-8 text-center font-semibold text-emerald-700">
                  {cartItems[product._id]}
                </span>

                <button
                  onClick={() => addToCart(product._id)}
                  className="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-emerald-600 transition-colors active:bg-gray-200 rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;