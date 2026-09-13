import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, ShoppingBag, Tag, Sparkles, Clock } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/all');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      {/* 1. HERO SECTION */}
      <div className="relative bg-velvetDark text-white h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl pt-16">
          <span className="text-velvetGold font-semibold tracking-widest text-sm uppercase block mb-3 animate-pulse">
            ✨ Premium Velvet Vogue Experience ✨
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Elevate Your Identity <br /> Through Your Style
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Discover a vast selection of premium casualwear and luxury formal wear tailored for young adults.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-velvetBurgundy hover:bg-red-900 text-white font-medium px-8 py-3 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
            Shop Collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* 🚀 2. BRAND NEW: EXCLUSIVE PROMOTIONS & DISCOUNTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-velvetDark via-red-950 to-velvetDark rounded-3xl p-6 sm:p-10 shadow-xl border border-red-900/30 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Background Decorative Glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-velvetGold/10 rounded-full blur-3xl"></div>
          
          <div className="space-y-3 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-velvetGold/20 text-velvetGold px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles size={12} /> Mid-Season Luxury Sale
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-wide">
              GET FLAT <span className="text-velvetGold">20% OFF</span> ON ALL APPARELS
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-medium">
              Use the exclusive promo code at the checkout page to unlock premium discounts on our luxury collection.
            </p>
            
            {/* Promo Code Tag Badge */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-2 rounded-xl">
                <Tag size={14} className="text-velvetGold" />
                <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">CODE: <strong className="text-velvetGold">VELVET20</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300 text-xs font-bold">
                <Clock size={14} className="text-red-400" /> Limited Time Offer
              </div>
            </div>
          </div>

          <div className="z-10 w-full md:w-auto text-center">
            <Link to="/shop" className="inline-block w-full md:w-auto bg-velvetGold hover:bg-yellow-600 text-velvetDark font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition shadow-lg transform hover:-translate-y-0.5">
              Claim Discount Now
            </Link>
          </div>
        </div>
      </div>

      {/* 3. PREMIUM CATEGORIES SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-velvetDark mb-10 uppercase tracking-wider">
          Browse Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Men's Wear Card */}
          <Link to="/shop?category=Men" className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100">
            <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600" alt="Men's Wear" className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center transition duration-300 group-hover:bg-opacity-50">
              <h3 className="text-white text-xl font-black tracking-widest uppercase mb-1">Men's Wear</h3>
              <span className="text-white text-xs font-bold flex items-center gap-1.5 group-hover:text-velvetGold transition transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* Women's Wear Card */}
          <Link to="/shop?category=Women" className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100">
            <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600" alt="Women's Wear" className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center transition duration-300 group-hover:bg-opacity-50">
              <h3 className="text-white text-xl font-black tracking-widest uppercase mb-1">Women's Wear</h3>
              <span className="text-white text-xs font-bold flex items-center gap-1.5 group-hover:text-velvetGold transition transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* Accessories Card */}
          <Link to="/shop?category=Accessories" className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 pointer border border-gray-100">
            <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=600" alt="Accessories" className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center transition duration-300 group-hover:bg-opacity-50">
              <h3 className="text-white text-xl font-black tracking-widest uppercase mb-1">Accessories</h3>
              <span className="text-white text-xs font-bold flex items-center gap-1.5 group-hover:text-velvetGold transition transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. NEW ARRIVALS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-velvetDark">New Arrivals</h2>
            <p className="text-gray-500 text-sm mt-1">Handpicked trends fresh off the runway.</p>
          </div>
          <Link to="/shop" className="text-velvetBurgundy hover:text-velvetGold font-semibold text-sm flex items-center gap-1 transition">
            See All Products <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 font-medium text-gray-500">Loading Velvet Vogue Products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 font-medium text-gray-500">No products found. Add some from the Admin Panel!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition duration-300 flex flex-col group">
                <div className="h-64 bg-gray-100 overflow-hidden relative">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-2 left-2 bg-velvetGold text-velvetDark text-xs font-bold px-2 py-1 rounded">
                    {product.clothingType}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-gray-400 uppercase mb-1">{product.category}'s Fashion</span>
                  <h3 className="font-bold text-velvetDark text-base line-clamp-1 mb-2 hover:text-velvetBurgundy">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <span className="text-lg font-extrabold text-velvetBurgundy">Rs. {product.price}.00</span>
                    <Link to={`/product/${product._id}`} className="p-2 bg-gray-100 hover:bg-velvetBurgundy hover:text-white rounded-full text-velvetDark transition">
                      <ShoppingBag size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}