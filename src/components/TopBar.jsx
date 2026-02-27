import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const messagesData = {
  en: [
    "SALE: NOW UP TO 70% OFF. T&CS APPLY",
    "NEW COLLECTION IS LIVE - SHOP NOW",
    "FREE SHIPPING ON ORDERS OVER 200 GEL",
    "FLEXIBLE RETURN POLICY"
  ],
  ge: [
    "ფასდაკლება: 70%-მდე. ვრცელდება პირობები",
    "ახალი კოლექცია უკვე საიტზეა - ნახე ახლავე",
    "უფასო მიწოდება 200 ლარის ზემოთ შეკვეთებზე",
    "დაბრუნების მოქნილი პოლიტიკა"
  ],
  ru: [
    "РАСПРОДАЖА: СКИДКИ ДО 70%. ДЕЙСТВУЮТ УСЛОВИЯ",
    "НОВАЯ КОЛЛЕКЦИЯ УЖЕ НА САЙТЕ - СМОТРЕТЬ",
    "БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 200 GEL",
    "ГИБКАЯ ПОЛИТИКА ВОЗВРАТА"
  ]
};

const TopBar = () => {
  const { language } = useLanguage(); // დარწმუნდით, რომ აქ 'ru' ბრუნდება რუსულის არჩევისას
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // ვიღებთ შეტყობინებებს ენის მიხედვით. თუ ენა ვერ იპოვა (მაგ. თავიდან), აიღოს ინგლისური
  const activeMessages = messagesData[language] || messagesData['en'];

  useEffect(() => {
    // ენის შეცვლისას განულდეს და გამოჩნდეს პირველი მესიჯი
    setCurrentIndex(0);
    setIsVisible(true);
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade Out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activeMessages.length);
        setIsVisible(true); // Fade In
      }, 500);

    }, 4000);

    return () => clearInterval(interval);
  }, [language, activeMessages]);

  return (
    <div className="bg-gray-200 text-black text-xs font-medium py-2 text-center tracking-widest uppercase relative z-50">
      <div 
        className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {activeMessages[currentIndex]}
      </div>
    </div>
  );
};

export default TopBar;