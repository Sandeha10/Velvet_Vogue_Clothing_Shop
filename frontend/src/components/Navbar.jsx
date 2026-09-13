
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const { cartItems } = useContext(CartContext);
  return (
    <nav className="bg-velvetDark text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Logo (Velvet Vogue) */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-widest text-velvetGold">
              VELVET VOGUE
            </Link>
          </div>

          
          <div className="hidden sm:flex space-x-8 font-medium">
            <Link to="/" className="hover:text-velvetGold transition duration-300">Home</Link>
            <Link to="/shop" className="hover:text-velvetGold transition duration-300">Shop</Link>
            <Link to="/support" className="hover:text-velvetGold transition">Support</Link>
          </div>

          {/* 3. Icons (Cart, User, Search) */}
          <div className="hidden sm:flex items-center space-x-6">
            <button className="hover:text-velvetGold transition"><Search size={20} /></button>
            <Link to="/cart" className="hover:text-velvetGold transition relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-velvetBurgundy text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
            </Link>
            <Link to="/dashboard" className="hover:text-velvetGold transition"><User size={20} /></Link>
          </div>

          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-velvetGold focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-velvetDark border-t border-gray-800 px-2 pt-2 pb-4 space-y-1">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-velvetGold">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-velvetGold">Shop</Link>
          <div className="flex justify-around pt-4 border-t border-gray-800 mt-2">
            <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:text-velvetGold"><ShoppingCart size={20} /></Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-velvetGold"><User size={20} /></Link>
          </div>
        </div>
      )}
    </nav>
  );
}