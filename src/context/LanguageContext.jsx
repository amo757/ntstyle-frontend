import React, { createContext, useContext, useState } from 'react';

// 1. ვქმნით კონტექსტს
const LanguageContext = createContext();

// 2. ვქმნით პროვაიდერს
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ge'); // საწყისი ენა

    // ეს ფუნქცია შეცვლის ენას კონკრეტულზე (მაგ: changeLanguage('en'))
    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    // ✅ აი ეს ფუნქცია გაკლდათ! 
    // ეს ავტომატურად გადართავს: თუ ქართულია -> ინგლისურზე და პირიქით
    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'ge' ? 'en' : 'ge'));
    };

    // დამხმარე (სურვილისამებრ)
    const t = (key) => key; 

    return (
        // ⚠️ აუცილებლად გადაეცი toggleLanguage აქ value-ში
        <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// 3. ჰუკი
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};