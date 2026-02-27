import React, { useState, useEffect } from 'react';

// 📸 სურათების იმპორტი assets საქაღალდიდან
// (შენი მითითებული სახელების მიხედვით)
import tbilisiImg from '../assets/tbilisi.jpg'; 
import batumiImg from '../assets/batumi.jpeg';

const ShopByScreen = () => {
  // 🌐 ენის მართვა
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ka');

  useEffect(() => {
    // ენის ცვლილების მოსმენა
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem('language') || 'ka');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 🔗 Google Maps-ის რეალური ლინკები
  const mapsLinks = {
    tbilisi: "https://www.google.com/maps/search/?api=1&query=Galleria+Tbilisi",
    batumi: "https://www.google.com/maps/search/?api=1&query=14+Memed+Abashidze+Ave,+Batumi"
  };

  // 📦 მონაცემები 3 ენაზე
  const content = {
    ka: {
      pageTitle: "ჩვენი მაღაზიები",
      pageDesc: "ეწვიეთ ჩვენს ფილიალებს თბილისსა და ბათუმში.",
      viewMapBtn: "რუკაზე ნახვა",
      addressLabel: "მისამართი:",
      hoursLabel: "სამუშაო საათები:",
      stores: [
        {
          id: 1,
          city: "თბილისი",
          title: "გალერეა თბილისი",
          address: "რუსთაველის გამზ. 2/4",
          floor: "მე-3 სართული",
          workingHours: "10:00 - 22:00",
          mapLink: mapsLinks.tbilisi, // ✅ გასწორებული ლინკი
          image: tbilisiImg
        },
        {
          id: 2,
          city: "ბათუმი",
          title: "ბათუმის ფილიალი",
          address: "მემედ აბაშიძის 14",
          floor: "ცენტრალური შესასვლელი",
          workingHours: "10:00 - 21:00",
          mapLink: mapsLinks.batumi, // ✅ გასწორებული ლინკი
          image: batumiImg
        }
      ]
    },
    en: {
      pageTitle: "Our Stores",
      pageDesc: "Visit our branches in Tbilisi and Batumi.",
      viewMapBtn: "View on Map",
      addressLabel: "Address:",
      hoursLabel: "Working Hours:",
      stores: [
        {
          id: 1,
          city: "Tbilisi",
          title: "Galleria Tbilisi",
          address: "Rustaveli Ave. 2/4",
          floor: "3rd Floor",
          workingHours: "10:00 - 22:00",
          mapLink: mapsLinks.tbilisi, // ✅
          image: tbilisiImg
        },
        {
          id: 2,
          city: "Batumi",
          title: "Batumi Branch",
          address: "Memed Abashidze 14",
          floor: "Main Entrance",
          workingHours: "10:00 - 21:00",
          mapLink: mapsLinks.batumi, // ✅
          image: batumiImg
        }
      ]
    },
    ru: {
      pageTitle: "Наши Магазины",
      pageDesc: "Посетите наши филиалы в Тбилиси и Батуми.",
      viewMapBtn: "Посмотреть на карте",
      addressLabel: "Адрес:",
      hoursLabel: "Часы работы:",
      stores: [
        {
          id: 1,
          city: "Тбилиси",
          title: "Галерея Тбилиси",
          address: "Пр. Руставели 2/4",
          floor: "3-й этаж",
          workingHours: "10:00 - 22:00",
          mapLink: mapsLinks.tbilisi, // ✅
          image: tbilisiImg
        },
        {
          id: 2,
          city: "Батуми",
          title: "Филиал в Батуми",
          address: "Мемед Абашидзе 14",
          floor: "Центральный вход",
          workingHours: "10:00 - 21:00",
          mapLink: mapsLinks.batumi, // ✅
          image: batumiImg
        }
      ]
    }
  };

  // ვირჩევთ მიმდინარე ენის მონაცემებს (თუ ენა არ მოიძებნა - ინგლისურს)
  const currentContent = content[language] || content.en;

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>

      <div className="max-w-7xl mx-auto">
        {/* სათაური */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
            {currentContent.pageTitle}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {currentContent.pageDesc}
          </p>
        </div>

        {/* მაღაზიების გრიდი */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {currentContent.stores.map((store) => (
            <div key={store.id} className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              
              {/* 📸 სურათის სექცია */}
              <div className="relative h-96 overflow-hidden bg-gray-200">
                <img 
                  src={store.image} 
                  alt={store.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { 
                    console.error("Image load error:", e.target.src);
                    e.target.style.display = 'none';
                  }} 
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                
                {/* ქალაქის ტეგი */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{store.city}</span>
                </div>

                {/* 📍 ლოკაციის ღილაკი */}
                <a 
                  href={store.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-sm hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 whitespace-nowrap z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  {currentContent.viewMapBtn}
                </a>
              </div>

              {/* ℹ️ ინფორმაცია */}
              <div className="p-8">
                <h3 className="text-2xl font-serif text-gray-900 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {store.title}
                </h3>
                
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-gray-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <div>
                      <p className="font-semibold text-gray-900">{currentContent.addressLabel}</p>
                      <p>{store.address}</p>
                      <p className="text-sm text-gray-500">{store.floor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                       <p className="font-semibold text-gray-900">{currentContent.hoursLabel}</p>
                       <p>{store.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByScreen;