import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react' // npm install lucide-react
import assets from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  
  const { 
    user, 
    setUser, 
    setShowUserLogin, 
    navigate, 
    setSearchQuery, 
    searchQuery, 
    getCartCount 
  } = useAppContext()

  const logout = () => {
    setUser(null)
    navigate('/')
    setOpen(false)
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }
  }, [searchQuery, navigate])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to='/' className="flex items-center" onClick={() => setOpen(false)}>
          <img className="h-10" src={assets.logo} alt="Logo" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink 
            to='/' 
            className={({ isActive }) => isActive ? "text-emerald-600" : "hover:text-gray-900 transition-colors"}
          >
            Home
          </NavLink>
          <NavLink 
            to='/products' 
            className={({ isActive }) => isActive ? "text-emerald-600" : "hover:text-gray-900 transition-colors"}
          >
            Shop
          </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => isActive ? "text-emerald-600" : "hover:text-gray-900 transition-colors"}
          >
            Contact
          </NavLink>
        </div>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Search Bar */}
          <div className="relative group">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-200 transition-all w-72">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
              />
            </div>
          </div>

          {/* Cart */}
          <div 
            onClick={() => navigate("/cart")} 
            className="relative cursor-pointer hover:scale-110 transition-transform"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {getCartCount() > 0 && (
              <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </div>
            )}
          </div>

          {/* User Profile */}
          {!user ? (
            <button 
              onClick={() => setShowUserLogin(true)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-all active:scale-95"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer border border-gray-200 hover:border-emerald-300 transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 hidden group-hover:block z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <ul className="text-sm">
                  <li 
                    onClick={() => navigate("/my-orders")} 
                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                  >
                    My Orders
                  </li>
                  <li 
                    onClick={logout} 
                    className="px-4 py-2.5 hover:bg-gray-50 text-red-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2"
          >
            <Search className="w-6 h-6 text-gray-700" />
          </button>

          <div 
            onClick={() => navigate("/cart")} 
            className="relative cursor-pointer p-2"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {getCartCount() > 0 && (
              <div className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </div>
            )}
          </div>

          <button 
            onClick={() => setOpen(!open)} 
            className="p-2"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden px-6 pb-4 border-b border-gray-100">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-gray-50">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent outline-none flex-1"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-6">
          <NavLink to='/' className="block text-lg py-2" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to='/products' className="block text-lg py-2" onClick={() => setOpen(false)}>Shop</NavLink>
          <NavLink to='/contact' className="block text-lg py-2" onClick={() => setOpen(false)}>Contact</NavLink>
          
          {user && (
            <NavLink to='/my-orders' className="block text-lg py-2" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <div className="pt-4 border-t border-gray-200">
            {!user ? (
              <button 
                onClick={() => { setOpen(false); setShowUserLogin(true); }}
                className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-semibold"
              >
                Login / Sign Up
              </button>
            ) : (
              <button 
                onClick={logout}
                className="w-full py-3 bg-red-50 text-red-600 rounded-2xl font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar