import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const VIDEO_URL = "/afw2020.mp4";

// --- თარგმანები და მონაცემები ---
const translations = {
  ge: {
    // Hero Section
    heroTitle: "დღესასწაულები იწყება N.T. STYLE-თან ერთად",
    heroDesc: "დროა შექმნათ თქვენი სადღესასწაულო გარდერობი, შთამბეჭდავი კაბებიდან დაწყებული გამორჩეული აქსესუარებით დამთავრებული.",
    heroBtn: "იხილეთ წვეულების კოლექცია",

    // New In Section
    newProductsCount: "521 ახალი პროდუქტი",
    newInTitle: "ახალი დამატებული",
    newInDesc: "ახალი პროდუქცია კვირაში ხუთჯერ – აღმოაჩინეთ უახლესი მოდელები ორშაბათიდან პარასკევის ჩათვლით.",
    newInBtn: "იხილეთ სიახლეები",

    // ✅ თარგმნილი პროდუქტები (GE)
    products: [
      { name: 'თეთრი მოსაცმელი', description: 'ტყავის მხარზე გადასაკიდი', slug: 'white-cardigan', image: '/clothes/1.jpg' },
      { name: 'მუქი მოსაცმელი', description: 'ქაშმირის შარფი', slug: 'dark-cardigan', image: '/clothes/6.jpg' },
      { name: 'თეთრი მოსაცმელი', description: 'ტყავის მხარზე გადასაკიდი', slug: 'white-cardigan-2', image: '/clothes/3.jpg' },
      { name: 'მუქი მოსაცმელი', description: 'ტყავის ბოტილიონი', slug: 'leather-ankle', image: '/clothes/5.jpg' },
      { name: 'ახალი სტილი', description: 'ტყავის ბოტილიონი', slug: 'new-style', image: '/clothes/55.jpg' },
    ],

    // Banners
    coatsTitle: "სეზონის პალტოები",
    shoesTitle: "სიახლეები",
    viewCollection: "იხილეთ კოლექცია",
    viewAll: "იხილეთ სრულად",

    // Full Width Banner
    wardrobeTitle: "განაახლეთ თქვენი გარდერობი",
    wardrobeDesc: "შეხვდით ცივ ამინდებს ელეგანტურად: მოდური მოსაცმელები, თბილი ქსოვილები და ყველგანმავალი ჩექმები.",

    // Editorial Titles
    knitwearTitle: "სეზონის ქსოვილები",
    knitwearDesc: "აღმოაჩინეთ გამორჩეული ნაქსოვი სამოსი – არ გამოტოვოთ სეზონის ტრენდული ტექსტურები.",
    knitwearBtn: "შეიძინეთ ქსოვილები",

    heelsTitle: "ეფექტური სტილი",
    heelsDesc: "გაამდიდრეთ თქვენი სადღესასწაულო ლუქი ახალი სტილით.",
    heelsBtn: "შეიძინეთ ახალი კოლექცია",

    statementCoatTitle: "გამორჩეული პალტო",
    statementCoatDesc: "როცა უბრალოება საკმარისი არ არის, აირჩიეთ მოცულობითი ხელოვნური ბეწვი.",
    statementCoatBtn: "შეიძინეთ პალტოები",

    // ✅ ნათია თხელიძის სექცია (GE)
    designerTitle: "ნათია თხელიძე: N.T. STYLE-ის სული",
    designerDesc: "ქართველი დიზაინერი, რომელმაც შექმნა ბრენდი საკუთარი ხედვით. ნათია თხელიძე საუბრობს შთაგონებაზე, ელეგანტურობასა და იმაზე, თუ როგორ უნდა დარჩე საკუთარი თავის ერთგული მოდის სამყაროში.",
    designerBtn: "გაიცანით დიზაინერი და ბრენდის ისტორია"
  },
  en: {
    // Hero Section
    heroTitle: "HOLIDAYS START WITH N.T. STYLE",
    heroDesc: "Time to build your holiday wardrobe, from impressive dresses to standout accessories.",
    heroBtn: "VIEW PARTY EDIT",

    // New In Section
    newProductsCount: "521 NEW PRODUCTS",
    newInTitle: "JUST IN",
    newInDesc: "New products five times a week – discover the latest models from Monday to Friday.",
    newInBtn: "VIEW WHAT'S NEW",

    // ✅ Translated Products (EN)
    products: [
      { name: 'White Cardigan', description: 'Le 5 à 7 leather shoulder', slug: 'white-cardigan', image: '/clothes/1.jpg' },
      { name: 'Dark Cardigan', description: 'Fringed checked cashmere scarf', slug: 'dark-cardigan', image: '/clothes/5.jpg' },
      { name: 'White Cardigan', description: 'Le 5 à 7 leather shoulder', slug: 'white-cardigan-2', image: '/clothes/3.jpg' },
      { name: 'Dark Cardigan', description: 'Leather ankle boots', slug: 'leather-ankle', image: '/clothes/4.jpg' },
      { name: 'New Style', description: 'Leather ankle boots', slug: 'new-style', image: '/clothes/6.jpg' },
    ],

    // Banners
    coatsTitle: "SEASON'S COATS",
    shoesTitle: "SHOES",
    viewCollection: "VIEW COLLECTION",
    viewAll: "VIEW ALL",

    // Full Width Banner
    wardrobeTitle: "REFRESH YOUR WARDROBE",
    wardrobeDesc: "Face the cold weather elegantly: stylish outerwear, warm knits, and all-terrain boots.",

    // Editorial Titles
    knitwearTitle: "NEED-TO-KNOW KNITS",
    knitwearDesc: "Embrace knitwear with a twist – don't miss this season's exaggerated cuffs and tactile textures.",
    knitwearBtn: "SHOP KNITWEAR",

    heelsTitle: "THE HIGH-IMPACT HEEL",
    heelsDesc: "Elevate your party looks with our pick of striking slingbacks and other dancing duos.",
    heelsBtn: "SHOP HEELS",

    statementCoatTitle: "THE STATEMENT COAT",
    statementCoatDesc: "When subtlety simply won't do, reach for voluminous shearling and plush faux fur.",
    statementCoatBtn: "SHOP COATS",

    // ✅ Natia Tkhelidze Section (EN)
    designerTitle: "NATIA TKHELIDZE: THE SOUL OF N.T. STYLE",
    designerDesc: "The Georgian designer who built the brand with her unique vision. Natia Tkhelidze talks about inspiration, elegance, and staying true to oneself in the world of fashion.",
    designerBtn: "MEET THE DESIGNER AND BRAND STORY"
  },
  ru: {
    // Hero Section
    heroTitle: "ПРАЗДНИКИ НАЧИНАЮТСЯ С N.T. STYLE",
    heroDesc: "Время создать свой праздничный гардероб, от впечатляющих платьев до выдающихся аксессуаров.",
    heroBtn: "СМОТРЕТЬ ВЕЧЕРНЮЮ КОЛЛЕКЦИЮ",

    // New In Section
    newProductsCount: "521 НОВЫЙ ТОВАР",
    newInTitle: "ТОЛЬКО ЧТО ПОСТУПИЛО",
    newInDesc: "Новые товары пять раз в неделю – открывайте для себя новейшие модели с понедельника по пятницу.",
    newInBtn: "СМОТРЕТЬ НОВИНКИ",

    // ✅ Translated Products (RU)
    products: [
      { name: 'Белый кардиган', description: 'Кожаная сумка на плечо', slug: 'white-cardigan', image: '/clothes/1.jpg' },
      { name: 'Темный кардиган', description: 'Кашемировый шарф в клетку', slug: 'dark-cardigan', image: '/clothes/2.jpg' },
      { name: 'Белый кардиган', description: 'Кожаная сумка на плечо', slug: 'white-cardigan-2', image: '/clothes/3.jpg' },
      { name: 'Темный кардиган', description: 'Кожаные ботильоны', slug: 'leather-ankle', image: '/clothes/4.jpg' },
      { name: 'Новый стиль', description: 'Кожаные ботильоны', slug: 'new-style', image: '/clothes/5.jpg' },
    ],

    // Banners
    coatsTitle: "ПАЛЬТО СЕЗОНА",
    shoesTitle: "ОБУВЬ",
    viewCollection: "СМОТРЕТЬ КОЛЛЕКЦИЮ",
    viewAll: "СМОТРЕТЬ ВСЕ",

    // Full Width Banner
    wardrobeTitle: "ОБНОВИТЕ СВОЙ ГАРДЕРОБ",
    wardrobeDesc: "Встречайте холодную погоду элегантно: стильная верхняя одежда, теплый трикотаж и вездеходные ботинки.",

    // Editorial Titles
    knitwearTitle: "ТРИКОТАЖ СЕЗОНА",
    knitwearDesc: "Откройте для себя необычный трикотаж – не пропустите трендовые текстуры этого сезона.",
    knitwearBtn: "КУПИТЬ ТРИКОТАЖ",

    heelsTitle: "ЭФФЕКТНЫЕ КАБЛУКИ",
    heelsDesc: "Дополните свой праздничный образ нашей подборкой потрясающих туфель.",
    heelsBtn: "КУПИТЬ ТУФЛИ",

    statementCoatTitle: "АКЦЕНТНОЕ ПАЛЬТО",
    statementCoatDesc: "Когда простоты недостаточно, выбирайте объемный искусственный мех.",
    statementCoatBtn: "КУПИТЬ ПАЛЬТО",

    // ✅ Natia Tkhelidze Section (RU)
    designerTitle: "НАТИЯ ТХЕЛИДЗЕ: ДУША N.T. STYLE",
    designerDesc: "Грузинский дизайнер, создавший бренд со своим уникальным видением. Натия Тхелидзе рассказывает о вдохновении, элегантности и верности себе в мире моды.",
    designerBtn: "ПОЗНАКОМЬТЕСЬ С ДИЗАЙНЕРОМ"
  }
};

// აკორდეონის სურათები (სტატიკური რჩება, მხოლოდ სათაურებია საჭირო)
const porterStories = [
  { id: 1, image: '/clothes/1.jpg', title: 'Summer Vibes' },
  { id: 2, image: '/clothes/2.jpg', title: 'Autumn Collection' },
  { id: 3, image: '/clothes/3.jpg', title: 'Winter Essentials' },
  { id: 4, image: '/clothes/4.jpg', title: 'Elegant Style' },
];

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const HomeScreen = () => {
  const { language } = useLanguage();
  // ვიღებთ თარგმანს ან დეფოლტად ინგლისურს
  const t = translations[language] || translations['en'];

  const scrollContainerRef = useRef(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(2);

  // Editorial მონაცემები
  const editorialData = [
    {
      title: t.knitwearTitle,
      description: t.knitwearDesc,
      linkText: t.knitwearBtn,
      image: "/clothes/10.jpg",
      link: "/category/knitwear"
    },
    {
      title: t.heelsTitle,
      description: t.heelsDesc,
      linkText: t.heelsBtn,
      image: "/clothes/11.jpg",
      link: "/category/heels"
    },
    {
      title: t.statementCoatTitle,
      description: t.statementCoatDesc,
      linkText: t.statementCoatBtn,
      image: "/clothes/6.jpg",
      link: "/category/coats"
    }
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 50) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">

      {/* --- 1. Hero Section --- */}
      <section className="relative h-[calc(100vh-8rem)] w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
          style={{ filter: 'brightness(0.8)' }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-white">
          <div className="inline-block max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-wider leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-sm">
              {t.heroDesc}
            </p>
            <div className="mt-8 flex space-x-4">
              <Link to="/category/clothing" className="bg-white text-black uppercase tracking-widest font-bold text-sm px-8 py-3 hover:bg-gray-200 transition duration-300">
                {t.heroBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. "New In" Carousel (დინამიური მონაცემებით) --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/4 flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">{t.newProductsCount}</p>
            <h2 className="text-5xl font-serif my-4 uppercase" dangerouslySetInnerHTML={{ __html: t.newInTitle.replace(' ', '<br/>') }}></h2>
            <p className="text-sm text-gray-700 mb-8 leading-relaxed">
              {t.newInDesc}
            </p>
            <Link to="/category/clothing" className="inline-block bg-black text-white uppercase tracking-widest font-bold text-xs px-8 py-4 hover:bg-gray-800 transition duration-300 w-fit">
              {t.newInBtn}
            </Link>
          </div>
          <div className="w-full lg:w-3/4 relative group">
            <div ref={scrollContainerRef} className="flex overflow-x-auto scroll-smooth gap-6 scrollbar-hide pb-4">
              {/* ✅ აქ ვიყენებთ t.products-ს, რომელიც ენის მიხედვით იცვლება */}
              {t.products.map((product, index) => (
                <Link to={`/product/${product.slug}`} key={index} className="group/item cursor-pointer block text-center w-[60%] sm:w-[40%] lg:w-[30%] flex-shrink-0">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img src={product.image} alt={product.name} className="w-full h-[400px] object-cover object-top transition duration-700 group-hover/item:scale-105" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                </Link>
              ))}
            </div>
            <button onClick={scrollRight} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-white">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* --- 3. Large Banners --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link to="/category/clothing" className="relative h-[700px] w-full overflow-hidden group">
            <img src="/clothes/8.jpg" alt="Coats" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-16 left-10 p-4">
              <h3 className="text-4xl font-serif uppercase tracking-wider drop-shadow-md">{t.coatsTitle}</h3>
              <p className="text-sm uppercase tracking-widest mt-2 hover:underline drop-shadow-md">{t.viewCollection}</p>
            </div>
          </Link>
          <Link to="/category/clothing" className="relative h-[700px] w-full overflow-hidden group">
            <img src="/clothes/99.jpg" alt="Shoes" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-16 left-10 p-4">
              <h3 className="text-4xl font-serif uppercase tracking-wider drop-shadow-md">{t.shoesTitle}</h3>
              <p className="text-sm uppercase tracking-widest mt-2 hover:underline drop-shadow-md">{t.viewAll}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* --- 4. Full Width Banner --- */}
      <section className="w-full h-[800px] relative mb-32 overflow-hidden group">
        <img
          src="/clothes/1222.jpg"
          alt="Full Width Banner"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/10 p-4">
          <h2 className="text-5xl font-serif mb-6 tracking-wide drop-shadow-lg uppercase">
            {t.wardrobeTitle}
          </h2>
          <p className="text-lg max-w-2xl mb-8 drop-shadow-md">
            {t.wardrobeDesc}
          </p>
          <Link to="/category/clothing" className="bg-white text-black uppercase tracking-widest font-bold text-sm px-10 py-4 hover:bg-gray-200 transition duration-300">
            {t.viewCollection}
          </Link>
        </div>
      </section>

      {/* --- 5. Editorial Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editorialData.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[500px] object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-gray-700 transition uppercase">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {item.description}
              </p>
              <Link to={item.link} className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- 6. 5-Images Accordion (განახლებული სექცია: ნათია თხელიძე) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative mt-40">

        <div className="absolute -top-24 left-15 z-20 pointer-events-none flex justify-start">
          <h2 className="text-[5rem] md:text-[10rem] font-serif leading-none text-silver">
            N.T.Style
          </h2>
        </div>

        <div className="flex w-full h-[600px] gap-0 overflow-hidden relative z-10">
          {porterStories.map((story, index) => (
            <div
              key={story.id}
              className={`relative h-full transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
                        ${activeStoryIndex === index ? 'flex-[3]' : 'flex-[1]'}
                      `}
              onMouseEnter={() => setActiveStoryIndex(index)}
            >
              <img
                src={story.image}
                alt={story.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />

              <div className={`absolute bottom-10 left-10 text-white transition-opacity duration-500 ${activeStoryIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <p className="tracking-widest text-sm mb-2 drop-shadow-md">N.T.Style</p>
                <h3 className="text-3xl font-serif drop-shadow-md uppercase">{story.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ განახლებული ტექსტები და ლინკი ნათია თხელიძეზე */}
        <div className="flex flex-col md:flex-row justify-between items-start mt-12 border-t border-gray-200 pt-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif mb-4 uppercase">
              {t.designerTitle}
            </h2>
          </div>
          <div className="md:w-1/3">
            <p className="text-lg text-gray-700 font-serif leading-relaxed mb-6">
              {t.designerDesc}
            </p>
            {/* ✅ ლინკი გადადის category/aboutNT გვერდზე */}
            <Link to="/category/aboutNT" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
              {t.designerBtn}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeScreen;