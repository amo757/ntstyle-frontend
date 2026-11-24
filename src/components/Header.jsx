import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const GEO_FLAG = "/images/geo.png";
const ENG_FLAG = "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg";
const RUS_FLAG = "https://flagcdn.com/w40/ru.png";

const translations = {
  ge: {
    home: "მთავარი",
    search: "ძებნა",
    login: "შესვლა",
    logout: "გამოსვლა",
    wishlist: "სურვილების სია",
    newCollection: "ახალი კოლექცია",
    shop: "მაღაზია",
    designers: "დიზაინერი",
    clothing: "ტანსაცმელი",
    shoes: "ფეხსაცმელი",
    bags: "ჩანთები",
    jewelry: "სამკაულები",
    accessories: "აქსესუარები",
    gifts: "საჩუქრები",
    sale: "შეთავაზებები"
  },
  en: {
    home: "Home",
    search: "Search",
    login: "Login",
    logout: "Logout",
    wishlist: "Wishlist",
    newCollection: "New Collection",
    shop: "Shop",
    designers: "Designers",
    clothing: "Clothing",
    shoes: "Shoes",
    bags: "Bags",
    jewelry: "Jewelry",
    accessories: "Accessories",
    gifts: "Gifts",
    sale: "Sale"
  },
  ru: {
    home: "Главная",
    search: "Поиск",
    login: "Войти",
    logout: "Выйти",
    wishlist: "Избранное",
    newCollection: "Новая коллекция",
    shop: "Магазин",
    designers: "Дизайнеры",
    clothing: "Одежда",
    shoes: "Обувь",
    bags: "Сумки",
    jewelry: "Украшения",
    accessories: "Аксессуары",
    gifts: "Подарки",
    sale: "Распродажа"
  }
};

const BurgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.875 1.875 0 0 1 18 22.5H6A1.875 1.875 0 0 1 4.501 20.118Z" />
  </svg>
);

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
  </svg>
);

const WishlistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const Header = () => {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language] || translations['en'];

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartContext = useCart() || {};
  const { cartTotals } = cartContext;
  const userContext = useUser() || {};
  const { user, logout } = userContext;
  const totalItems = cartTotals?.totalItems || 0;

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 text-white bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-20">

          {/* --- მარცხენა მხარე: ბურგერი (მობილურზე) + ენის არჩევა --- */}
          <div className="flex-1 flex items-center space-x-3 sm:space-x-4 relative">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-white p-1 hover:text-gray-300 focus:outline-none"
            >
              <BurgerIcon />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1.5 sm:space-x-2 text-base hover:text-gray-300 focus:outline-none"
              >
                <img
                  src={
                    language === 'ge' ? GEO_FLAG :
                    language === 'en' ? ENG_FLAG :
                    RUS_FLAG
                  }
                  alt={language}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-gray-600"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-10 left-0 bg-white text-black rounded shadow-xl w-40 py-2 z-50">
                  <button
                    onClick={() => handleLanguageSelect('ge')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                  >
                    <img src={GEO_FLAG} alt="GE" className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-base font-bold">ქართული</span>
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('en')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                  >
                    <img src={ENG_FLAG} alt="EN" className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-base font-medium">English</span>
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('ru')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                  >
                    <img src={RUS_FLAG} alt="RU" className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-base font-medium">Русский</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* --- ლოგო --- */}
          <div className="flex-1 text-center">
            <Link to="/" className="text-2xl sm:text-4xl font-serif tracking-widest whitespace-nowrap">
              N.T.Style
            </Link>
          </div>

          {/* --- მარჯვენა მხარე --- */}
          <div className="flex-1 flex justify-end items-center space-x-3 sm:space-x-6">
            <button className="flex items-center space-x-2 text-base hover:text-gray-300">
              <SearchIcon />
              <span className="hidden lg:block">{t.search}</span>
            </button>

            {user ? (
              <button onClick={logout} className="flex items-center space-x-2 text-base hover:text-gray-300">
                <UserIcon />
                <span className="hidden lg:block">{t.logout}</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-base hover:text-gray-300">
                <UserIcon />
                <span className="hidden lg:block">{t.login}</span>
              </Link>
            )}

            <Link to="/wishlist" className="hidden lg:flex items-center space-x-2 text-base hover:text-gray-300">
              <WishlistIcon />
            </Link>

            <Link to="/cart" className="flex items-center space-x-1 sm:space-x-2 text-base hover:text-gray-300">
              <BagIcon />
              <span>({totalItems})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- დესკტოპ ნავიგაცია --- */}
      <nav className="hidden lg:flex justify-center items-center space-x-8 h-14">
        <Link to="/category/clothing" className="text-base font-bold hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
          {t.newCollection}
        </Link>
        <Link to="/category/shop" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
          {t.shop}
        </Link>
        <Link to="/category/aboutNT" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
          {t.designers}
        </Link>
        <Link to="/category/clothing" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
          {t.clothing}
        </Link>
        <Link to="/category/salepage" className="text-base font-medium text-red-500 hover:text-red-400 border-b-2 border-transparent hover:border-red-500 transition-all pb-1">
          {t.sale}
        </Link>
      </nav>

      {/* --- მობილური ბურგერ-მენიუს პანელი (Drawer) --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={closeMobileMenu}
          />
          <div className="relative w-72 max-w-[80vw] bg-black text-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-gray-800">
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                <Link to="/" onClick={closeMobileMenu} className="text-2xl font-serif tracking-widest">
                  N.T.Style
                </Link>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="text-white hover:text-gray-300 p-1"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="flex flex-col space-y-5">
                <Link to="/" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest text-gray-200 hover:text-white">
                  {t.home}
                </Link>
                <Link to="/category/clothing" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest font-bold text-white hover:text-gray-300">
                  {t.newCollection}
                </Link>
                <Link to="/category/shop" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest text-gray-200 hover:text-white">
                  {t.shop}
                </Link>
                <Link to="/category/aboutNT" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest text-gray-200 hover:text-white">
                  {t.designers}
                </Link>
                <Link to="/category/clothing" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest text-gray-200 hover:text-white">
                  {t.clothing}
                </Link>
                <Link to="/category/salepage" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest font-bold text-red-500 hover:text-red-400">
                  {t.sale}
                </Link>
              </nav>
            </div>

            <div className="border-t border-gray-800 pt-5 flex flex-col space-y-4">
              <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white">
                <WishlistIcon />
                <span>{t.wishlist}</span>
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white text-left"
                >
                  <UserIcon />
                  <span>{t.logout}</span>
                </button>
              ) : (
                <Link to="/login" onClick={closeMobileMenu} className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white">
                  <UserIcon />
                  <span>{t.login}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;