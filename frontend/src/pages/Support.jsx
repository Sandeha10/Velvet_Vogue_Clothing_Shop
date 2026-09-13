import React, { useState } from 'react';
import axios from 'axios'; // Imported Axios for HTTP requests
import { Mail, Phone, MapPin, MessageSquare, Send, HelpCircle } from 'lucide-react';

export default function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to the backend /api/inquiries/submit endpoint
      await axios.post('http://localhost:5000/api/inquiries/submit', {
        name,
        email,
        subject,
        message
      });

      setSubmitted(true);
      setLoading(false);
      
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('General Inquiry');
      setMessage('');

      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Inquiry error:", error);
      alert("Something went wrong. Please try again!");
      setLoading(false);
    }
  };

  const faqs = [
    { q: "What is your return policy?", a: "We offer a 7-day luxury return policy for unworn items with tags intact." },
    { q: "How long does shipping take within Sri Lanka?", a: "Standard delivery takes 2-3 business days. Premium express delivery takes 24 hours." },
    { q: "Can I adjust my order details after payment?", a: "Please contact our executive support line immediately within 1 hour of placing the order." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl font-black text-velvetDark uppercase tracking-wider mb-2">
            Customer Support & Inquiries
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">Have a question or need assistance? Our executive luxury team is here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-velvetDark mb-2">Get in Touch</h2>
            
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-red-50 text-velvetBurgundy rounded-xl"><Phone size={20} /></div>
              <div>
                <h4 className="font-bold text-sm text-velvetDark">Call Support</h4>
                <p className="text-xs text-gray-500 mt-1">+94 11 234 5678</p>
                <p className="text-[10px] text-gray-400">Mon - Sat: 9 AM - 6 PM</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-red-50 text-velvetBurgundy rounded-xl"><Mail size={20} /></div>
              <div>
                <h4 className="font-bold text-sm text-velvetDark">Email Relations</h4>
                <p className="text-xs text-gray-500 mt-1">support@velvetvogue.com</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-red-50 text-velvetBurgundy rounded-xl"><MapPin size={20} /></div>
              <div>
                <h4 className="font-bold text-sm text-velvetDark">Atrium Flagship Store</h4>
                <p className="text-xs text-gray-500 mt-1">Colombo 07, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* INQUIRY FORM */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h2 className="text-lg font-bold text-velvetDark mb-6 flex items-center gap-2 border-b pb-3">
              <MessageSquare size={20} className="text-velvetBurgundy" /> Submit an Inquiry
            </h2>

            {submitted && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold text-center">
                🎉 Inquiry Submitted Successfully! Our luxury agents will email you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Your Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Inquiry Type</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-velvetBurgundy">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Tracking">Order Tracking & Delivery</option>
                  <option value="Size Guide / Stock">Size Guide & Stock Availability</option>
                  <option value="Returns & Refunds">Returns & Refunds</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message Details</label>
                <textarea rows="4" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your inquiry with order ID if applicable..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-velvetBurgundy"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-velvetBurgundy hover:bg-red-950 text-white font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2">
                {loading ? 'Sending...' : 'Send Inquiry'} <Send size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-velvetDark mb-6 flex items-center gap-2 uppercase tracking-wide">
            <HelpCircle size={22} className="text-velvetBurgundy" /> Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-sm text-velvetDark mb-2">{faq.q}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}