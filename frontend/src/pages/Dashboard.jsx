import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, PlusCircle, LogOut, CheckSquare, Square, Inbox, Calendar, Tag, LayoutDashboard, Settings, Edit, Trash2, ShoppingBag } from 'lucide-react';

export default function Dashboard() {
  // Authentication States
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // ADMIN SIDEBAR ACTIVE TAB STATE
  // 'add_product' | 'manage_products' | 'inquiries' | 'view_orders'
  const [activeTab, setActiveTab] = useState('add_product');

  // Auth Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // --- ADMIN PRODUCT FORM STATES ---
  const [pName, setPName] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pCategory, setPCategory] = useState('Men');
  const [pClothingType, setPClothingType] = useState('Shirt');
  const [pImageUrl, setPImageUrl] = useState('');
  const [pSizes, setPSizes] = useState([]);
  const [pColors, setPColors] = useState('');
  const [pError, setPError] = useState('');
  const [pSuccess, setPSuccess] = useState('');

  // Available Sizes for Admin Select
  const availableSizes = ['S', 'M', 'L', 'XL'];

  const handleSizeToggle = (size) => {
    if (pSizes.includes(size)) {
      setPSizes(pSizes.filter(s => s !== size));
    } else {
      setPSizes([...pSizes, size]);
    }
  };

  // SIGNUP & LOGIN ACTIONS
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
      } else {
        await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        setAuthSuccess('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  // ADMIN: NEW PRODUCT ADD ACTION
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setPError('');
    setPSuccess('');

    if (pSizes.length === 0) {
      setPError('Please select at least one Size!');
      return;
    }

    const colorsArray = pColors.split(',').map(c => c.trim()).filter(c => c !== '');

    const productData = {
      name: pName,
      price: Number(pPrice),
      description: pDescription,
      category: pCategory,
      clothingType: pClothingType,
      images: [pImageUrl || 'https://via.placeholder.com/300'],
      sizes: pSizes,
      colors: colorsArray
    };

    try {
      await axios.post('http://localhost:5000/api/products/add', productData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPSuccess('🎉 Product Added Successfully into Database!');
      setPName('');
      setPPrice('');
      setPDescription('');
      setPImageUrl('');
      setPSizes([]);
      setPColors('');
    } catch (err) {
      setPError(err.response?.data?.message || 'Failed to add product.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
          <h2 className="text-2xl font-black text-center text-velvetDark mb-6 uppercase tracking-wider">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>

          {authError && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center">{authError}</div>}
          {authSuccess && <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-600 rounded-xl text-xs font-bold text-center">{authSuccess}</div>}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                <User className="absolute left-3 top-3 text-gray-400" size={16} />
              </div>
            )}
            <div className="relative">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
              <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>
            <div className="relative">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
              <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>

            <button type="submit" className="w-full bg-velvetBurgundy text-white font-bold py-3 rounded-xl hover:bg-red-950 transition text-sm shadow-md">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-velvetBurgundy font-bold hover:underline">
              {isLogin ? 'Register Here' : 'Login Here'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-velvetDark">Hello, {user?.name}!</h1>
            <p className="text-xs text-gray-400 font-semibold uppercase mt-0.5 tracking-wider">
              Role: <span className={user?.role === 'admin' ? 'text-velvetGold font-bold' : 'text-velvetBurgundy'}>{user?.role}</span>
            </p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-600 bg-gray-100 px-4 py-2 rounded-xl transition">
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* ROLE-BASED ACCESS CONTROL VIEWS */}
        {user?.role === 'admin' ? (
          /* ADMIN SIDEBAR LAYOUT (GRID SYSTEM 1:3) */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            
            {/* Left Side: Admin Navigation Sidebar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-3 mb-2">Management</p>
              
              {/* Tab 1: Add Product */}
              <button 
                onClick={() => setActiveTab('add_product')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'add_product' 
                    ? 'bg-velvetBurgundy text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-velvetDark'
                }`}
              >
                <PlusCircle size={16} /> Add New Apparel
              </button>

              {/* Tab 2: Manage Products */}
              <button 
                onClick={() => setActiveTab('manage_products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'manage_products' 
                    ? 'bg-velvetBurgundy text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-velvetDark'
                }`}
              >
                <Settings size={16} /> Manage Store
              </button>

              {/* Tab 3: Customer Inquiries */}
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'inquiries' 
                    ? 'bg-velvetBurgundy text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-velvetDark'
                }`}
              >
                <Inbox size={16} /> View Inquiries
              </button>

              {/* Tab 4: View Orders */}
              <button 
                onClick={() => setActiveTab('view_orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'view_orders' 
                    ? 'bg-velvetBurgundy text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-velvetDark'
                }`}
              >
                <ShoppingBag size={16} /> View Orders
              </button>
            </div>

            {/* Right Side: Component switches dynamically based on active tab */}
            <div className="md:col-span-3">
              
              {activeTab === 'add_product' && (
                /* VIEW A: PRODUCT ENTRY FORM */
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-extrabold text-velvetDark mb-6 flex items-center gap-2 border-b pb-3">
                    <LayoutDashboard size={20} className="text-velvetGold" /> Add New Velvet Vogue Apparel
                  </h2>

                  {pError && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center">{pError}</div>}
                  {pSuccess && <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-bold text-center">{pSuccess}</div>}

                  <form onSubmit={handleAddProduct} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Product Name</label>
                      <input type="text" value={pName} onChange={(e) => setPName(e.target.value)} required placeholder="e.g. Velvet Vogue Luxury Silk Dress" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Price (Rs.)</label>
                        <input type="number" value={pPrice} onChange={(e) => setPPrice(e.target.value)} required placeholder="3450" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Gender Category</label>
                        <select value={pCategory} onChange={(e) => setPCategory(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Clothing Type</label>
                        <select value={pClothingType} onChange={(e) => setPClothingType(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
                          <option value="Shirt">Shirt</option>
                          <option value="T-Shirt">T-Shirt</option>
                          <option value="Dress">Dress</option>
                          <option value="Trousers">Trousers</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Product Image URL</label>
                      <input type="url" value={pImageUrl} onChange={(e) => setPImageUrl(e.target.value)} placeholder="Paste any image address link from Unsplash or Google" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Available Sizes</label>
                      <div className="flex gap-6 mt-1">
                        {availableSizes.map((size) => (
                          <button key={size} type="button" onClick={() => handleSizeToggle(size)} className="flex items-center gap-2 text-sm font-semibold text-velvetDark">
                            {pSizes.includes(size) ? <CheckSquare size={18} className="text-velvetBurgundy" /> : <Square size={18} className="text-gray-300" />}
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Available Colors (Separated by commas)</label>
                      <input type="text" value={pColors} onChange={(e) => setPColors(e.target.value)} placeholder="e.g. Royal Blue, Crimson Red, Charcoal Black" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                      <span className="text-[10px] text-gray-400 block mt-1">Separate colors with commas (,).</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Product Description</label>
                      <textarea rows="3" value={pDescription} onChange={(e) => setPDescription(e.target.value)} required placeholder="Write details about the fabric, fit and style..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-velvetDark hover:bg-black text-white font-bold py-3.5 rounded-xl transition text-sm shadow-md uppercase tracking-wider">
                      Upload Product to Store
                    </button>
                  </form>
                </div>
              )}

              {/* VIEW B: MANAGE PRODUCTS LIST (EDIT / DELETE PANEL) */}
              {activeTab === 'manage_products' && <AdminProductsManager />}

              {/* VIEW C: CUSTOMER SUPPORT INQUIRIES LIST */}
              {activeTab === 'inquiries' && <AdminInquiriesList />}

              {/* VIEW D: CUSTOMER ORDERS LOGS DATA GRID PANEL */}
              {activeTab === 'view_orders' && <AdminOrdersList token={token} />}

            </div>
          </div>
        ) : (
          /* STANDARD CUSTOMER VIEW */
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-velvetDark mb-4">Your Shopping Profile</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p className="text-xs text-green-600 bg-green-50 p-3 rounded-xl mt-4 font-semibold">
                   Welcome to Velvet Vogue premium loyalty club! You can now browse items and check out your cart.
                </p>
              </div>
            </div>

            <OrderHistory token={token} />
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================================
// SUB-COMPONENT: ALL CUSTOMER ORDERS MANAGER PANEL
// ==========================================================
function AdminOrdersList({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, [token]);

  if (loading) return <div className="text-sm text-gray-500 bg-white p-6 rounded-2xl border text-center font-medium">Loading store transaction logs...</div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-extrabold text-velvetDark mb-6 flex items-center gap-2 border-b pb-3">
        <ShoppingBag size={22} className="text-velvetBurgundy" /> Customer Order Logs ({orders.length})
      </h2>
      
      {orders.length === 0 ? (
        <p className="text-xs text-gray-400 font-medium text-center py-6">No dynamic order logs recorded inside database clusters yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm bg-white">
            <thead>
              <tr className="border-b text-gray-400 font-black uppercase tracking-wider bg-gray-50 text-[10px]">
                <th className="p-4">Order ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Items Manifest</th>
                <th className="p-4 text-right">Total Invoice</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-600 font-semibold text-xs">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4 font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="max-w-xs space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="line-clamp-1 text-gray-700 font-medium">
                          • {item.name} <span className="text-velvetBurgundy font-black">({item.quantity})</span>
                          {item.selectedSize && <span className="text-gray-400 text-[10px] ml-1">[{item.selectedSize}]</span>}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right font-black text-gray-900">Rs. {order.totalAmount}.00</td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-full font-bold border border-green-200 uppercase tracking-wider text-[9px]">
                      {order.status || 'Success'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================================
// SUB-COMPONENT: EDIT & DELETE PRODUCTS MANAGER PANEL
// ==========================================================
function AdminProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Inline Editing States
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editName, setEditName] = useState('');

  const fetchStoreProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/all');
      setProducts(res.data);
      loading && setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreProducts();
  }, []);

  // 1. Handle Inline Edit Trigger
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  // 2. Save Edited Price & Name to Database
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/products/edit/${id}`, {
        name: editName,
        price: Number(editPrice)
      });
      alert("🎉 Product details updated successfully!");
      setEditingId(null);
      fetchStoreProducts(); 
    } catch (err) {
      alert("Failed to update product details.");
    }
  };

  // 3. Delete Product from Database
  const handleDeleteProduct = async (id) => {
    if (window.confirm(" Are you sure you want to permanently delete this product from store?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
        alert(" Product deleted successfully!");
        fetchStoreProducts(); 
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  };

  if (loading) return <div className="text-sm text-gray-500 bg-white p-6 rounded-2xl border text-center">Loading inventory data...</div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-extrabold text-velvetDark mb-6 flex items-center gap-2 border-b pb-3">
        <Settings size={22} className="text-velvetBurgundy" /> Manage Store Products ({products.length})
      </h2>

      <div className="space-y-4">
        {products.map((prod) => (
          <div key={prod._id} className="border border-gray-100 rounded-xl p-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Product Meta Left Row */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img src={prod.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg border bg-white" />
              
              <div className="flex-grow">
                {editingId === prod._id ? (
                  // Edit Mode Inputs
                  <div className="space-y-2">
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="px-2 py-1 border text-xs font-bold rounded w-full" />
                    <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="px-2 py-1 border text-xs font-bold rounded w-28 block" />
                  </div>
                ) : (
                  // Normal View Mode
                  <div>
                    <h4 className="font-bold text-sm text-velvetDark line-clamp-1">{prod.name}</h4>
                    <p className="text-xs text-velvetBurgundy font-black mt-1">Rs. {prod.price}.00</p>
                    <span className="text-[10px] bg-gray-200 font-bold px-2 py-0.5 rounded text-gray-500 uppercase mt-2 inline-block">
                      {prod.category} | {prod.clothingType}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Controller Buttons Right Row */}
            <div className="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-0 pt-2 sm:pt-0">
              {editingId === prod._id ? (
                <>
                  <button onClick={() => handleSaveEdit(prod._id)} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="border border-gray-300 text-gray-600 text-xs font-bold px-3 py-2 rounded-lg hover:bg-white transition">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(prod)} className="inline-flex items-center gap-1 bg-gray-100 hover:bg-velvetDark hover:text-white border text-xs font-bold px-3 py-2 rounded-lg transition text-gray-600">
                    <Edit size={12} /> Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(prod._id)} className="inline-flex items-center gap-1 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition text-red-600">
                    <Trash2 size={12} /> Delete
                  </button>
                </>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

// SUB-COMPONENT: ADMIN INQUIRIES LIST
function AdminInquiriesList() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/inquiries/all');
        setInquiries(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) return <div className="text-sm text-gray-500 bg-white p-6 rounded-2xl border text-center">Loading customer inquiries...</div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-extrabold text-velvetDark mb-6 flex items-center gap-2 border-b pb-3">
        <Inbox size={22} className="text-velvetBurgundy" /> Customer Support Messages ({inquiries.length})
      </h2>
      {inquiries.length === 0 ? (
        <p className="text-xs text-gray-400 font-medium text-center py-6">No customer inquiries found.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq._id} className="border border-gray-100 rounded-xl p-5 bg-gray-50 hover:border-gray-200 transition space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-gray-500 gap-1 border-b pb-2">
                <div>
                  <p className="font-bold text-velvetDark text-sm">{inq.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{inq.email}</p>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 font-bold bg-white px-2.5 py-1 rounded-lg border text-[10px]">
                  <Calendar size={12} /> {new Date(inq.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-velvetBurgundy text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                <Tag size={10} /> {inq.subject}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Message Content:</p>
                <p className="text-sm text-gray-600 mt-1 bg-white p-3 rounded-lg border border-gray-100 leading-relaxed font-medium">
                  {inq.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// SUB-COMPONENT: ORDER HISTORY
function OrderHistory({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [token]);

  if (loading) return <div className="text-sm text-gray-500 bg-white p-6 rounded-2xl border text-center">Loading order history...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-velvetDark mb-4">Your Order History & Invoices</h2>
      {orders.length === 0 ? (
        <p className="text-xs text-gray-400 font-medium">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-gray-500 border-b pb-2 gap-1">
                <div>
                  <p className="font-medium"><strong>Invoice ID:</strong> {order._id}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm text-velvetDark">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-[11px] text-gray-400 font-bold">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                    </div>
                    <span className="text-xs text-gray-500">{item.quantity} × Rs. {item.price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dashed font-black text-sm text-velvetBurgundy">
                <span>Total Amount Paid</span>
                <span>Rs. {order.totalAmount}.00</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}