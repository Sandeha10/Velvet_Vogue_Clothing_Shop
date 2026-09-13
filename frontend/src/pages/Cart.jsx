import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // Imported Axios for HTTP requests
import { Trash2, ShoppingBag, ArrowRight, CreditCard, ShieldCheck, MapPin } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate(); 
  
  // States to manage checkout progression
  const [step, setStep] = useState(1); 
  const [processing, setProcessing] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');

  // Shipping Address States
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  // Payment Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // 3-Second Delayed Auto-Redirect Function
  const handleProceedClick = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setRedirectMessage("Authentication Required! Redirecting to login page in 3 seconds...");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setStep(2);
    }
  };

  // Process payment and save order details to the database
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      setProcessing(false);
      return;
    }

    const orderItems = cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));

  try {
      setTimeout(async () => {
        try {
          await axios.post('http://localhost:5000/api/orders/create', {
            items: orderItems,
            totalAmount: getCartTotal(),
            shippingAddress: {
              address: address,
              city: city,
              phone: phone
            }
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          setProcessing(false);
          setStep(3); 
          clearCart(); 
        } catch (err) {
          console.error("Order API error:", err);
          alert(err.response?.data?.message || "Failed to save order to database.");
          setProcessing(false);
        }
      }, 2000);

    } catch (error) {
      console.error("Payment submission error:", error);
      setProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
            <ShieldCheck size={36} />
          </div>
          <h2 className="text-2xl font-black text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 text-sm mb-6">Your payment has been securely processed. Your luxury apparel from Velvet Vogue will arrive soon.</p>
          <Link to="/shop" className="block w-full bg-velvetDark text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-black transition shadow-md">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Security Banner Display */}
        {redirectMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-bold rounded-xl text-center text-sm animate-pulse flex items-center justify-center gap-2 shadow-sm">
            <span>🔒 {redirectMessage}</span>
          </div>
        )}

        {/* Checkout Steps Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-8 text-xs font-bold uppercase tracking-wider text-gray-400">
          <span className={`${step >= 1 ? 'text-velvetBurgundy' : ''}`}>01 Review Cart</span>
          <ArrowRight size={12} />
          <span className={`${step >= 2 ? 'text-velvetBurgundy' : ''}`}>02 Shipping & Payment</span>
        </div>

        {cartItems.length === 0 && step !== 2 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium mb-4">Your cart is currently empty.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-velvetBurgundy text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-950 transition">
              Explore Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Cart Items / Checkout Form */}
            <div className="lg:col-span-2">
              
              {step === 1 ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-velvetDark mb-2">Review Selected Items</h2>
                  {cartItems.map((item) => (
                    <div key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50 border" />
                        <div>
                          <h3 className="font-bold text-velvetDark text-sm sm:text-base line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-gray-400 font-bold mt-0.5">
                            Size: <span className="text-velvetBurgundy mr-3">{item.selectedSize}</span> 
                            Color: <span className="text-velvetDark">{item.selectedColor}</span>
                          </p>
                          
                          <div className="flex items-center gap-2 mt-2 bg-gray-100 w-fit rounded-lg p-0.5 border">
                            <button 
                              type="button"
                              onClick={() => updateQuantity(item._id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded transition text-sm"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-velvetDark">{item.quantity}</span>
                            <button 
                              type="button"
                              onClick={() => updateQuantity(item._id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded transition text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-0 pt-2 sm:pt-0">
                        <span className="font-extrabold text-velvetDark text-sm sm:text-base">Rs. {item.price * item.quantity}.00</span>
                        <button 
                          type="button"
                          onClick={() => removeFromCart(item._id, item.selectedSize, item.selectedColor)}
                          className="text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* STEP 2: SHIPPING ADDRESS & SECURE CARD PAYMENTS */
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    
                    {/* SHIPPING DETAILS SECTION */}
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-velvetDark flex items-center gap-2 border-b pb-2">
                        <MapPin size={20} className="text-velvetBurgundy" /> Shipping Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Delivery Address</label>
                          <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123, Galle Road" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">City</label>
                          <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Colombo" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Contact Phone Number</label>
                          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0771234567" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                        </div>
                      </div>
                    </div>

                    {/* CARD DETAILS SECTION */}
                    <div className="space-y-4 pt-4">
                      <h2 className="text-lg font-bold text-velvetDark flex items-center gap-2 border-b pb-2">
                        <CreditCard size={20} className="text-velvetBurgundy" /> Secure Card Payment
                      </h2>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Cardholder Name</label>
                        <input type="text" required value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Card Number</label>
                        <input type="text" required maxLength="16" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Expiry Date</label>
                          <input type="text" required maxLength="5" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">CVV</label>
                          <input type="password" required maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button type="button" onClick={() => setStep(1)} className="w-1/2 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                        Back to Cart
                      </button>
                      <button type="submit" disabled={processing} className="w-1/2 bg-velvetBurgundy text-white font-bold py-3 rounded-xl hover:bg-red-950 transition text-sm flex items-center justify-center">
                        {processing ? 'Processing Rs. ' + getCartTotal() + '...' : 'Pay Rs. ' + getCartTotal() + '.00'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>

            {/* Right Side: Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
              <h2 className="font-bold text-lg text-velvetDark mb-4 border-b pb-2">Order Summary</h2>
              <div className="space-y-3 text-sm border-b pb-4 mb-4">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>Rs. {getCartTotal()}.00</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>
              <div className="flex justify-between font-black text-lg text-velvetBurgundy mb-6">
                <span>Total Amount</span>
                <span>Rs. {getCartTotal()}.00</span>
              </div>

              {step === 1 && (
                <button 
                  type="button"
                  onClick={handleProceedClick} 
                  className="w-full bg-velvetBurgundy hover:bg-red-950 text-white font-bold py-3 rounded-xl transition text-center text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Payment <ArrowRight size={16} />
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}