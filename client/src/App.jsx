import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import AddAddress from './pages/AddAddress';
import Contact from './pages/Contact';

// Import Login Modal
import Login from './components/Login';   // ← Make sure path is correct

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Login Modal - This was missing! */}
      <Login />
      
    </div>
  );
};

export default App;