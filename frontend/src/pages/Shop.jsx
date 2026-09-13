import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, ShoppingBag } from 'lucide-react';

export default function Shop() {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  // Filter States
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [clothingType, setClothingType] = useState('');
  const [size, setSize] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000); 
  
  // Product States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false); // Mobile filters toggle

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/products/all', {
          params: {
            search,
            category,
            clothingType,
            size,
            maxPrice
          }
        });
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, clothingType, size, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Search Bar and Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full sm:max-w-md">
            <input 
              type="text" 
              placeholder="Search Velvet Vogue items..." 
              value={search}
              onChange={(req) => setSearch(req.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-velvetBurgundy text-velvetDark text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          {/* Filter Button visible only on Mobile (sm:hidden) */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden w-full flex items-center justify-center gap-2 bg-velvetDark text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          
          {/* 1. SIDEBAR FILTERS (Visible on Desktop - hidden sm:block) */}
          <div className={`w-full sm:w-64 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
            <h3 className="font-bold text-lg text-velvetDark mb-6 border-b pb-2 flex items-center gap-2">
              <SlidersHorizontal size={18} /> Filters
            </h3>

            {/* A. Category Filter (Gender) */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm text-velvetDark focus:outline-none focus:border-velvetBurgundy"
              >
                <option value="">All Genders</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* B. Clothing Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Clothing Type</label>
              <select 
                value={clothingType} 
                onChange={(e) => setClothingType(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm text-velvetDark focus:outline-none focus:border-velvetBurgundy"
              >
                <option value="">All Types</option>
                <option value="Shirt">Shirt</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Dress">Dress</option>
                <option value="Trousers">Trousers</option>
              </select>
            </div>

            {/* C. Size Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(size === s ? '' : s)} // Toggles filter off if clicked again
                    className={`px-3 py-1.5 border rounded-md text-xs font-bold transition ${size === s ? 'bg-velvetBurgundy text-white border-velvetBurgundy' : 'bg-gray-50 border-gray-200 text-velvetDark hover:border-gray-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* D. Price Range Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700">Max Price</label>
                <span className="text-sm font-extrabold text-velvetBurgundy">Rs. {maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-velvetBurgundy"
              />
            </div>
            
            {/* Clear Filters Button */}
            <button 
              onClick={() => { setCategory(''); setClothingType(''); setSize(''); setMaxPrice(10000); setSearch(''); }}
              className="w-full mt-4 text-xs font-semibold text-gray-500 hover:text-velvetBurgundy underline transition"
            >
              Reset All Filters
            </button>
          </div>

          {/* 2. MAIN SECTION (Products Grid on the right) */}
          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-12 font-medium text-gray-500">Filtering Velvet Vogue Products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200 p-8">
                <p className="text-gray-500 font-medium mb-2">No items match your specific filters.</p>
                <p className="text-gray-400 text-xs">Try adjusting your filters or resetting them.</p>
              </div>
            ) : (
              /* Grid Layout: Responsive (Mobile: 1, Tablet: 2, PC: 3) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition duration-300 flex flex-col group">
                    
                    {/* Product Image */}
                    <div className="h-64 bg-gray-100 overflow-hidden relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-velvetGold text-velvetDark text-xs font-bold px-2 py-1 rounded">
                        {product.clothingType}
                      </span>
                    </div>

                    {/* Product Info */}
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
      </div>
    </div>
  );
}