import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest font-serif">404</h1>
            <p className="text-xl font-semibold mb-4 uppercase tracking-widest">გვერდი ვერ მოიძებნა</p>
            <p className="text-gray-600 mb-8">ბოდიშს გიხდით, გვერდი, რომელსაც ეძებთ, არ არსებობს.</p>
            <Link to="/" className="bg-black text-white px-6 py-3 uppercase text-sm tracking-widest hover:bg-gray-800 transition duration-300">
                დაბრუნება მთავარ გვერდზე
            </Link>
        </div>
    );
};

export default NotFoundScreen;
