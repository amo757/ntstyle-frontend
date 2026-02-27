import React, { useState } from 'react';

// ხატულები
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);


// ლოკაციების სია (შეგვიძლია გავზარდოთ მომავალში)
const locations = [
    { name: 'Georgia', currency: '£GBP', flag: '/images/geo.png' },
    { name: 'Albania', currency: '£GBP', flag: '🇦🇱' }, // დროებით ვიყენებთ ემოჯის, სანამ სურათებს დავამატებთ
    { name: 'Algeria', currency: '£GBP', flag: '🇩🇿' },
    { name: 'Anguilla', currency: '$USD', flag: '🇦🇮' },
    { name: 'Armenia', currency: '£GBP', flag: '🇦🇲' },
];

const LocationModal = ({ isOpen, onClose }) => {
    
    // ეს ფუნქცია გამოიძახება, როდესაც ენას ავირჩევთ
    const handleLocationSelect = (locationName) => {
        // --- აქ დაგვჭირდება ენის შეცვლის ლოგიკა (მაგ. i18next) ---
        alert(`თქვენ აირჩიეთ: ${locationName}. ენის შეცვლის ფუნქციონალი დასამატებელია.`);
        onClose(); // ვხურავთ მოდულს
    };

    if (!isOpen) {
        return null; // თუ 'isOpen' არის false, მოდული არ ჩანს
    }

    return (
        // 1. Overlay (გამუქებული ფონი)
        // 'fixed' - აფიქსირებს ეკრანზე
        // 'inset-0' - ავსებს მთელ ეკრანს
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose} // ფონზე დაჭერით დახურვა
        >
            {/* 2. მოდულის კონტენტი */}
            {/* e.stopPropagation() - ხელს უშლის ფონზე დაჭერის ივენთს */}
            <div 
              className="bg-white text-black rounded-lg shadow-2xl w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()} 
            >
                {/* 3. სათაური და დახურვის ღილაკი */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-lg font-semibold uppercase tracking-widest">Change Location</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        <CloseIcon />
                    </button>
                </div>

                {/* 4. ძებნის ველი */}
                <div className="p-6 border-b">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search location"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                {/* 5. ლოკაციების სია (სქროლვადი) */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <ul className="space-y-2">
                        {locations.map((loc) => (
                            <li key={loc.name}>
                                <button 
                                    onClick={() => handleLocationSelect(loc.name)}
                                    className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                                >
                                    <div className="flex items-center space-x-3">
                                        {/* დროშა */}
                                        {loc.flag.startsWith('/') ? (
                                            <img src={loc.flag} alt={loc.name} className="w-6 h-6 rounded-full object-cover" />
                                        ) : (
                                            <span className="text-2xl">{loc.flag}</span>
                                        )}
                                        <span className="font-medium">{loc.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{loc.currency}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;