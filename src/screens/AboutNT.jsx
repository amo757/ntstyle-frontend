import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext'; // დარწმუნდი, რომ გზა სწორია

// --- თარგმანები ---
const translations = {
  ge: {
    heroTitle: "N.T. STYLE",
    heroSubtitle: "ელეგანტურობა დეტალებში",
    heroScroll: "აღმოაჩინეთ ჩვენი ისტორია",

    introTitle: "დიზაინერი",
    introText1: "მოგესალმებით, მე ვარ ნათია თხელიძე. უკვე 8 წელია, რაც N.T.Style ქართულ მოდის სივრცეში საკუთარ ხელწერას ქმნის.",
    introText2: "ჩემთვის მოდა არ არის მხოლოდ სამოსი, ეს არის ხასიათის გამოხატულება. ვარ მუდმივ ძიებაში, რათა შევქმნა პროდუქტი, რომელიც არის გამორჩეული, პრაქტიკული და რაც მთავარია - კომფორტული.",

    marqueeText: "ექსკლუზიური დიზაინი • ხარისხიანი ქსოვილები • ინდივიდუალური მიდგომა • N.T.STYLE • ",

    journeyTitle: "ჩვენი გზა & აღიარება",
    journeyDesc: "თბილისის შოურუმებიდან საერთაშორისო პოდიუმებამდე.",
    
    // აკორდეონის სათაურები
    loc1: "თბილისი & ბათუმი",
    loc2: "MBFW & პრაღა",
    loc3: "ბაქო & მოსკოვი",
    loc4: "მომავალი",

    specialTitle: "სპეციალური პროექტი",
    specialDesc: "მიუხედავად იმისა, რომ N.T.Style ქალის ბრენია, ჩვენ შევქმენით გამონაკლისი ლეგენდარული მერაბ სეფაშვილისთვის, მისი ისრაელის ტურნესთვის ექსკლუზიური კოსტიუმების დამზადებით.",
    specialBtn: "იხილეთ გალერეა",

    quote: "„სამოსი უნდა იყოს ისეთივე უნიკალური, როგორიც მისი მფლობელია. ჩვენ არ ვიმეორებთ დიზაინს, ჩვენ ვქმნით ხასიათს.“",
    signature: "ნათია თხელიძე"
  },
  en: {
    heroTitle: "N.T. STYLE",
    heroSubtitle: "Elegance in Details",
    heroScroll: "Discover Our Story",

    introTitle: "The Designer",
    introText1: "Hello, I am Natia Tkhelidze. For over 8 years, N.T.Style has been creating its unique signature in the Georgian fashion industry.",
    introText2: "For me, fashion is not just clothing, it is an expression of character. I am in constant pursuit of creating products that are unique, practical, and above all - comfortable.",

    marqueeText: "EXCLUSIVE DESIGN • QUALITY FABRICS • INDIVIDUAL APPROACH • N.T.STYLE • ",

    journeyTitle: "Our Journey & Recognition",
    journeyDesc: "From Tbilisi showrooms to international runways.",

    // Accordion Titles
    loc1: "Tbilisi & Batumi",
    loc2: "MBFW & Prague",
    loc3: "Baku & Moscow",
    loc4: "The Future",

    specialTitle: "Special Project",
    specialDesc: "Although N.T.Style is a womenswear brand, we made an exception for the legendary Merab Sepashvili, crafting exclusive suits for his Israel tour.",
    specialBtn: "View Gallery",

    quote: "“Clothing should be as unique as its owner. We don't repeat designs, we create character.”",
    signature: "Natia Tkhelidze"
  }
};

// ისტორიის მონაცემები (აკორდეონისთვის)
const historyData = [
  { id: 1, titleKey: 'loc1', image: '/clothes/1.jpg', year: '2016-2020' }, // შეცვალეთ სურათები
  { id: 2, titleKey: 'loc2', image: '/clothes/2.jpg', year: 'Fashion Weeks' },
  { id: 3, titleKey: 'loc3', image: '/clothes/3.jpg', year: 'International' },
  { id: 4, titleKey: 'loc4', image: '/clothes/4.jpg', year: '2024-...' },
];

const AboutNT = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // მარტივი ეფექტი ჩატვირთვისას
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full bg-white text-black font-sans overflow-x-hidden">
      
      {/* --- 1. HERO SECTION (Parallax Style) --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* ფონი - ჩასვით აქ თქვენი მთავარი, ლამაზი ფოტო */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[3s] hover:scale-105"
          style={{ backgroundImage: "url('/fav.jpg')" }} 
        >
           <div className="absolute inset-0 bg-black/40"></div> {/* დაბურვა */}
        </div>

        <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
           <p className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 animate-pulse">
             {t.heroSubtitle}
           </p>
           <h1 className="text-6xl md:text-9xl font-serif uppercase tracking-tighter mb-6">
             {t.heroTitle}
           </h1>
           <div className="w-[1px] h-24 bg-white/50 mx-auto mt-8"></div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xs uppercase tracking-widest animate-bounce">
          {t.heroScroll}
        </div>
      </section>


      {/* --- 2. INTRO / DESIGNER PROFILE --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* ტექსტი */}
            <div className="lg:col-span-5 order-2 lg:order-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{t.introTitle}</h2>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-6">
                    {t.introText1}
                </p>
                <p className="text-gray-600 leading-8 text-sm md:text-base text-justify">
                    {t.introText2}
                </p>
                <div className="mt-8">
                    <img src="/signature.png" alt={t.signature} className="h-12 opacity-60" /> 
                    {/* თუ ხელმოწერის ფოტო არ გაქვთ, უბრალოდ დაწერეთ ტექსტად: */}
                    {/* <p className="font-serif italic text-xl mt-4">{t.signature}</p> */}
                </div>
            </div>

            {/* სურათი ჩარჩოში */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
                <div className="relative z-10 w-[80%] ml-auto aspect-[3/4] overflow-hidden bg-gray-100  transition duration-700">
                    <img src="/images/natia.jpg" alt="Natia Tkhelidze" className="w-full h-full object-cover" />
                </div>
                {/* დეკორატიული უკანა ფონი */}
                <div className="absolute top-10 right-10 w-[80%] h-full border-2 border-black z-0"></div>
            </div>
        </div>
      </section>


      {/* --- 3. MARQUEE (Moving Text) --- */}
      <div className="bg-black text-white py-6 overflow-hidden border-y border-white/20">
        <div className="whitespace-nowrap animate-marquee flex">
            {/* ვიმეორებთ ტექსტს ბევრჯერ რომ გაუთავებელი ეფექტი ქონდეს */}
            {[...Array(10)].map((_, i) => (
                <span key={i} className="text-xl md:text-3xl font-serif uppercase tracking-widest mx-4 opacity-80">
                    {t.marqueeText}
                </span>
            ))}
        </div>
        {/* CSS ანიმაციისთვის დაამატეთ ეს სტილი თქვენს index.css-ში ან tailwind config-ში. 
            თუ არ გაქვთ, ქვემოთ კომენტარში მივუთითებ ალტერნატივას. */}
      </div>


      {/* --- 4. ACCORDION TIMELINE (Home Screen Style) --- */}
      <section className="py-24 bg-[#f4f4f4]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
             <h2 className="text-4xl font-serif uppercase mb-4">{t.journeyTitle}</h2>
             <p className="text-gray-500 uppercase tracking-widest text-xs">{t.journeyDesc}</p>
         </div>

         <div className="flex w-full h-[500px] md:h-[600px] overflow-hidden">
            {historyData.map((item, index) => (
                <div 
                    key={item.id}
                    className={`relative h-full transition-all duration-700 ease-in-out cursor-pointer border-r border-white/20
                        ${activeStoryIndex === index ? 'flex-[4] grayscale-0' : 'flex-[1] grayscale hover:grayscale-0'}
                    `}
                    onMouseEnter={() => setActiveStoryIndex(index)}
                >
                    <img 
                        src={item.image} 
                        alt={t[item.titleKey]} 
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>

                    {/* ტექსტი როცა გაშლილია */}
                    <div className={`absolute bottom-8 left-8 text-white transition-opacity duration-500 ${activeStoryIndex === index ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                        <p className="text-xs font-bold bg-white text-black inline-block px-2 py-1 mb-2 uppercase">{item.year}</p>
                        <h3 className="text-3xl md:text-5xl font-serif uppercase leading-none">{t[item.titleKey]}</h3>
                    </div>

                    {/* ვერტიკალური ტექსტი როცა დახურულია (მხოლოდ დესკტოპზე) */}
                    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white transition-opacity duration-300 ${activeStoryIndex !== index ? 'opacity-100 lg:opacity-100' : 'opacity-0'}`}>
                        <p className="hidden lg:block rotate-[-90deg] whitespace-nowrap text-sm uppercase tracking-widest origin-left translate-x-2">
                             {t[item.titleKey]}
                        </p>
                    </div>
                </div>
            ))}
         </div>
      </section>


      {/* --- 5. SPECIAL PROJECT (Dark Section) --- */}
      <section className="bg-black text-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center gap-16">
                  
                  {/* სურათი */}
                  <div className="w-full md:w-1/2 relative group">
                      <div className="absolute -inset-4 bg-gray-800 rotate-2 group-hover:rotate-0 transition duration-500"></div>
                      <img 
                        src="/clothes/1222.jpg" // მამაკაცის კოსტუმის ფოტო
                        alt="Merab Sepashvili Project" 
                        className="relative w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition duration-500 z-10"
                      />
                  </div>

                  {/* ტექსტი */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                      <div className="w-16 h-[2px] bg-white mb-8 mx-auto md:mx-0"></div>
                      <h2 className="text-3xl md:text-5xl font-serif mb-6 uppercase">
                          {t.specialTitle}
                      </h2>
                      <p className="text-gray-400 text-lg leading-relaxed mb-8">
                          {t.specialDesc}
                      </p>
                  </div>

              </div>
          </div>
      </section>


      {/* --- 6. QUOTE / FOOTER --- */}
      <section className="py-32 px-4 text-center bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[20rem] text-gray-50 font-serif z-0 select-none">
              N.T.Style
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
              <p className="text-2xl md:text-4xl font-serif italic text-gray-900 leading-tight">
                  {t.quote}
              </p>
              <div className="mt-12 flex flex-col items-center">
                  <div className="w-1 h-12 bg-black mb-4"></div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                      
                  </span>
              </div>
          </div>
      </section>

    </div>
  );
};

export default AboutNT;