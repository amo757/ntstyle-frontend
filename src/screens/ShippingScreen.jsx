import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
);

const ShippingScreen = () => {
    // ✅ 1. ამოვიღოთ promoDiscount კონტექსტიდან
    const { cartItems, cartTotals, promoDiscount } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', address: '', city: '', phone: '',
    });

    // ✅ 2. გამოვთვალოთ საბოლოო ჯამი (ფასდაკლების გათვალისწინებით)
    const finalTotal = cartTotals.totalPrice - (promoDiscount || 0);

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify(formData));
        navigate('/payment'); 
    };

    return (
        <div className="min-h-screen bg-white font-sans relative">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>

            {/* --- HEADER (FIXED TOP, Z-50) --- */}
            <div className="bg-black text-white h-20 w-full px-8 fixed top-0 left-0 z-50 shadow-md flex items-center justify-between">
                <div className="flex-grow flex items-center relative lg:pr-[380px]">
                    <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-300 hidden md:block">
                        Secure Checkout
                    </span>
                    <Link to="/" className="text-2xl md:text-3xl font-serif tracking-widest text-white whitespace-nowrap z-10 mx-auto lg:mr-20" style={{ fontFamily: '"Playfair Display", serif' }}>
                        N.T.Style
                    </Link>
                </div>
                <div className="hidden lg:flex w-[380px] flex-shrink-0 items-center justify-end px-8 border-l border-gray-800/30">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <span className="tracking-widest">SECURE</span>
                    </div>
                </div>
            </div>

            <div className="flex w-full">
                
                {/* --- LEFT SIDE: FORM (CONTENT AREA) --- */}
                <div className="flex-grow min-h-screen pr-0 lg:pr-[380px] pt-28 bg-white"> 
                    <div className="max-w-[600px] mx-auto px-6 pb-20">
                        
                        {/* Progress Bar */}
                        <div className="flex justify-center items-center mb-16">
                            <div className="flex flex-col items-center relative z-10">
                                <div className="w-8 h-8 rounded-full border border-black bg-white text-black flex items-center justify-center mb-2 text-[13px] font-serif">1</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black absolute -bottom-6 w-32 text-center">Shipping</span>
                            </div>
                            <div className="w-32 h-[1px] bg-gray-200 -mt-6"></div>
                            <div className="flex flex-col items-center relative z-10 opacity-40">
                                <div className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center mb-2 text-[13px] font-serif">2</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 w-32 text-center">Payment</span>
                            </div>
                            <div className="w-32 h-[1px] bg-gray-200 -mt-6"></div>
                            <div className="flex flex-col items-center relative z-10 opacity-40">
                                <div className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center mb-2 text-[13px] font-serif">3</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 w-32 text-center">Complete</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-[28px] text-black mb-8 font-normal pb-4 border-b border-gray-200" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Shipping Address
                        </h2>
                        
                        <div className="text-[13px] mb-8 text-gray-800 flex items-center">
                            Shipping to: <span className="font-bold ml-2 flex items-center gap-2 border-b border-black pb-0.5">🇬🇪 Georgia</span>
                        </div>

                        {/* FORM */}
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-3/4 flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-[11px] text-gray-500 mb-1 uppercase tracking-wider">First name</label>
                                        <input required type="text" className="w-full border border-gray-300 p-3.5 text-[13px] focus:border-black outline-none rounded-none" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-[11px] text-gray-500 mb-1 uppercase tracking-wider">Last name</label>
                                        <input required type="text" className="w-full border border-gray-300 p-3.5 text-[13px] focus:border-black outline-none rounded-none" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Address Field */}
                            <div>
                                <label className="block text-[11px] text-gray-500 mb-1 uppercase tracking-wider">Address Search</label>
                                <div className="relative">
                                    <input type="text" className="w-full border border-gray-300 p-3.5 pl-10 text-[13px] focus:border-black outline-none rounded-none" placeholder="Start typing your address..."  onChange={(e)=>{setFormData({...formData, address: e.target.value})}}/>
                                    <svg className="w-4 h-4 absolute left-3.5 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <p className="text-[11px] text-gray-500 mt-2 underline cursor-pointer hover:text-black">Enter address manually</p>
                            </div>

                            {/* City Field */}
                            <div>
                                <label className="block text-[11px] text-gray-500 mb-1 uppercase tracking-wider">City</label>
                                <input 
                                    required 
                                    type="text" 
                                    className="w-full border border-gray-300 p-3.5 text-[13px] focus:border-black outline-none rounded-none" 
                                    placeholder="Enter your city (e.g. Tbilisi)"
                                    onChange={(e) => setFormData({...formData, city: e.target.value})} 
                                />
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-[11px] text-gray-500 mb-1 uppercase tracking-wider">Phone number</label>
                                <input required type="tel" className="w-full border border-gray-300 p-3.5 text-[13px] focus:border-black outline-none rounded-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                                <p className="text-[10px] text-gray-400 mt-1">We may need to contact you about your order.</p>
                            </div>

                            <button type="submit" className="w-full bg-black text-white py-4 uppercase text-[12px] font-bold tracking-[0.2em] hover:bg-gray-800 transition mt-8">
                                Continue to Payment
                            </button>
                        </form>

                        {/* Footer Help */}
                        <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                            <h3 className="font-serif text-xl mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Need help?</h3>
                            <button className="w-full border border-black py-3.5 flex items-center justify-center gap-3 text-[11px] font-bold hover:bg-gray-50 transition uppercase tracking-widest">
                                <ChatIcon />
                                Chat to an expert
                            </button>
                            <p className="text-[11px] text-gray-500 mt-4">Call us on <span className="underline">+995 593 14 25 77</span></p>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: ORDER SUMMARY (FIXED AND ON TOP) --- */}
                <div className="hidden lg:block w-[380px] bg-[#F5F5F5] border-l border-gray-200 h-screen fixed right-0 top-0 overflow-y-auto scrollbar-thin z-[60]">
                    
                    <div className="pt-28 px-10 pb-10"> 
                        
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Order Summary</h3>
                            <Link to="/cart" className="text-[11px] underline text-gray-500 hover:text-black">Edit</Link>
                        </div>
                        
                        <div className="space-y-6 mb-10">
                            {cartItems.map((item) => (
                                <div key={item.slug + item.size} className="flex gap-4">
                                    <div className="w-20 h-28 flex-shrink-0 bg-white border border-gray-200">
                                        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover object-top" />
                                    </div>
                                    <div className="flex-grow pt-1">
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1">{item.designer}</h4>
                                        <p className="text-[12px] text-gray-600 leading-tight mb-1 line-clamp-2">{item.name}</p>
                                        <p className="text-[10px] text-gray-500 mb-2">{item.size} | Qty: {item.quantity}</p>
                                        <p className="text-[11px] font-bold mt-1">{item.price} GEL</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-300 pt-6 text-[13px] text-gray-800">
                            {/* Subtotal */}
                            <div className="flex justify-between mb-3">
                                <span>Subtotal</span>
                                <span>{cartTotals.totalPrice.toFixed(2)} GEL</span>
                            </div>

                            {/* ✅ 3. DISCOUNT (მხოლოდ მაშინ გამოჩნდება, თუ არის ფასდაკლება) */}
                            {promoDiscount > 0 && (
                                <div className="flex justify-between mb-3 text-red-700">
                                    <span>Discount</span>
                                    <span>- {promoDiscount.toFixed(2)} GEL</span>
                                </div>
                            )}

                            <div className="flex justify-between mb-5">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>

                            {/* Total - იყენებს finalTotal-ს */}
                            <div className="flex justify-between font-bold text-[16px] mt-4 pt-4 border-t border-gray-300">
                                <span>Total to pay</span>
                                <span>{finalTotal.toFixed(2)} GEL</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShippingScreen;