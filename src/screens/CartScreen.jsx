import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// --- ICONS ---
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);

const CartScreen = () => {
    // 1. ცვლილება: აქ დავამატეთ setPromoDiscount და promoDiscount
    const { cartItems, cartTotals, removeItem, setPromoDiscount, promoDiscount } = useCart();
    
    const { toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    // --- PROMO CODE STATES ---
    const [promoCode, setPromoCode] = useState('');
    // 2. ცვლილება: ამოვიღეთ local state (const [discount, setDiscount] = useState(0))
    const [message, setMessage] = useState({ text: '', type: '' });

    const isFirstPurchase = true;

    // --- PROMO LOGIC ---
    const handleApplyPromo = () => {
        if (promoCode === 'NTstyle10') {
            if (isFirstPurchase) {
                // 10%-იანი ფასდაკლება
                const discountAmount = cartTotals.totalPrice * 0.10;
                
                // 3. ცვლილება: ვიყენებთ გლობალურ კონტექსტს setDiscount-ის ნაცვლად
                setPromoDiscount(discountAmount);
                
                setMessage({ text: 'Promo code applied: 10% Off First Order', type: 'success' });
            } else {
                setPromoDiscount(0);
                setMessage({ text: 'This code is valid for first purchases only.', type: 'error' });
            }
        } else {
            setPromoDiscount(0);
            setMessage({ text: 'Invalid promo code.', type: 'error' });
        }
    };

    // 4. ცვლილება: discount-ის ნაცვლად promoDiscount
    const finalTotal = cartTotals.totalPrice - promoDiscount;

    // --- EMPTY CART UI ---
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-serif mb-4">Your Shopping Bag is empty</h2>
                <Link to="/category/clothing" className="border-b border-black pb-1 uppercase text-xs font-bold tracking-widest hover:text-gray-600">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
                <h1 className="text-[32px] font-serif mb-10 text-black" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Shopping Bag
                </h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- LEFT: CART ITEMS --- */}
                    <div className="w-full lg:w-2/3">
                        <div className="border-t border-gray-200">
                            {cartItems.map((item) => (
                                <div key={item.slug + item.size} className="flex py-8 border-b border-gray-200">
                                    {/* Image */}
                                    <Link to={`/product/${item.slug}`} className="w-32 h-40 flex-shrink-0 bg-gray-50 mr-6">
                                        <img
                                            src={item.images?.[0]}
                                            alt={item.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1">{item.designer}</h3>
                                                    <Link to={`/product/${item.slug}`} className="text-[13px] text-gray-600 hover:text-black mb-2 block">
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <p className="text-[13px] font-bold">{item.price} GEL</p>
                                            </div>

                                            {/* Attributes */}
                                            <div className="text-[12px] text-gray-500 space-y-1 mt-2">
                                                {item.selectedColor && <p>Color: {item.selectedColor.name}</p>}
                                                <p>Size: {item.size}</p>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                        </div>

                                        {/* Actions Links */}
                                        <div className="flex gap-6 mt-4">
                                            <button
                                                onClick={() => removeItem(item.slug, item.size)}
                                                className="text-[11px] text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4"
                                            >
                                                Remove from Bag
                                            </button>
                                            <button
                                                onClick={() => {
                                                    toggleWishlist(item);
                                                    removeItem(item.slug, item.size);
                                                }}
                                                className="text-[11px] text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4"
                                            >
                                                Move to your Wish List
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: ORDER SUMMARY --- */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6 text-gray-500">Order Summary</h3>

                            <div className="flex justify-between text-[13px] mb-4">
                                <span>Item subtotal</span>
                                <span>{cartTotals.totalPrice.toFixed(2)} GEL</span>
                            </div>

                            {/* Discount Row (შეიცვალა ცვლადი promoDiscount-ით) */}
                            {promoDiscount > 0 && (
                                <div className="flex justify-between text-[13px] mb-4 text-green-700">
                                    <span>Discount (10% First Order)</span>
                                    <span>- {promoDiscount.toFixed(2)} GEL</span>
                                </div>
                            )}

                            <div className="flex justify-between text-[14px] font-bold mb-6 pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span>{finalTotal.toFixed(2)} GEL</span>
                            </div>

                            {/* Info Box */}
                            <div className="bg-[#F5F8FA] p-4 mb-6 flex gap-3 text-[11px] text-gray-600 leading-relaxed">
                                <div className="mt-0.5"><InfoIcon /></div>
                                <p>I accept that I will pay any applicable taxes and/or duties when my order arrives at customs.</p>
                            </div>

                            {/* Reward Tier */}
                            <div className="flex items-center gap-2 text-[11px] text-gray-700 mb-8">
                                <span className="text-[#9E8B6E]">◆</span>
                                <p>This purchase will bring you closer to the next Reward tier</p>
                            </div>

                            {/* Promo Code Input */}
                            <div className="mb-8">
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Add a Promo Code</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-grow border border-gray-300 p-3 text-[13px] focus:outline-none focus:border-black"
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        className="border border-gray-300 px-6 text-[11px] font-bold uppercase tracking-widest hover:border-black transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {message.text && (
                                    <p className={`text-[11px] mt-2 ${message.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                                        {message.text}
                                    </p>
                                )}
                            </div>

                            {/* CONTINUE TO CHECKOUT BUTTON */}
                            <button
                                onClick={() => navigate('/shipping')}
                                className="w-full bg-black text-white py-4 uppercase text-[12px] font-bold tracking-[0.15em] hover:bg-gray-800 transition flex justify-center items-center gap-3 mb-6"
                            >
                                <LockIcon />
                                CONTINUE TO CHECKOUT
                            </button>

                            {/* PAYMENT ICONS */}
                            <div className="flex justify-center opacity-90">
                                <img
                                    src="/images/visa.png"
                                    alt="Payment Methods"
                                    className="h-6 object-contain"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartScreen;