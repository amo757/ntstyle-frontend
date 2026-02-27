import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CompleteScreen = () => {
    const { clearCart } = useCart();
    const location = useLocation();
    
    // ვიღებთ წინა გვერდიდან გადმოწოდებულ შეკვეთის აიდის
    const orderId = location.state?.orderId; 

    useEffect(() => {
        clearCart(); 
        localStorage.removeItem('shippingAddress'); 
    }, [clearCart]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>
            
            <svg className="w-16 h-16 text-green-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0Z" />
            </svg>
            
            <h1 className="text-4xl font-serif mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                მადლობა, თქვენი შეკვეთა მიღებულია!
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-lg">
                {orderId ? (
                    <>
                        თქვენი შეკვეთის ნომერია: <span className="font-bold text-black">#{orderId}</span>. 
                    </>
                ) : (
                    <>
                       თქვენი შეკვეთა წარმატებით გაფორმდა.
                    </>
                )}
                <br />
                დადასტურების მეილს და გზავნილის დეტალებს მალე მიიღებთ ელ.ფოსტაზე.
            </p>
            
            <Link to="/" className="bg-black text-white py-3 px-8 uppercase text-sm font-bold tracking-widest hover:bg-gray-800 transition">
                ყიდვის გაგრძელება
            </Link>
        </div>
    );
};

export default CompleteScreen;