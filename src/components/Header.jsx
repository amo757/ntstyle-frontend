import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx'; 

const GEO_FLAG = "/images/geo.png"; 
const ENG_FLAG = "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"; 
const RUS_FLAG = "https://flagcdn.com/w40/ru.png"; // რუსული დროშა

const translations = {
  ge: {
    search: "ძებნა",
    login: "შესვლა",
    logout: "გამოსვლა",
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
    search: "Search",
    login: "Login",
    logout: "Logout",
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
    search: "Поиск",
    login: "Войти",
    logout: "Выйти",
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
    // უზრუნველვყოფთ, რომ თუ ენა არასწორია, ნაგულისხმევად ინგლისური აიღოს
    const t = translations[language] || translations['en']; 

    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const cartContext = useCart() || {};
    const { cartTotals } = cartContext;
    const userContext = useUser() || {};
    const { user, logout } = userContext;
    const totalItems = cartTotals?.totalItems || 0;

    const handleLanguageSelect = (lang) => {
        changeLanguage(lang);
        setIsLangMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 text-white bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between items-center h-20">

                    {/* --- ენის არჩევა --- */}
                    <div className="flex-1 relative">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center space-x-2 text-base hover:text-gray-300 focus:outline-none" 
                        >
                            <img 
                                src={
                                    language === 'ge' ? GEO_FLAG : 
                                    language === 'en' ? ENG_FLAG : 
                                    RUS_FLAG
                                } 
                                alt={language} 
                                className="w-7 h-7 rounded-full object-cover border border-gray-600" 
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {isLangMenuOpen && (
                            <div className="absolute top-10 left-0 bg-white text-black rounded shadow-xl w-40 py-2 z-50">
                                {/* ქართული */}
                                <button 
                                    onClick={() => handleLanguageSelect('ge')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                                >
                                    <img src={GEO_FLAG} alt="GE" className="w-5 h-5 rounded-full object-cover"/>
                                    <span className="text-base font-bold">ქართული</span>
                                </button>
                                
                                {/* English */}
                                <button 
                                    onClick={() => handleLanguageSelect('en')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                                >
                                    <img src={ENG_FLAG} alt="EN" className="w-5 h-5 rounded-full object-cover"/>
                                    <span className="text-base font-medium">English</span>
                                </button>

                                {/* Русский */}
                                <button 
                                    onClick={() => handleLanguageSelect('ru')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                                >
                                    <img src={RUS_FLAG} alt="RU" className="w-5 h-5 rounded-full object-cover"/>
                                    <span className="text-base font-medium">Русский</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* --- ლოგო --- */}
                    <div className="flex-1 text-center">
                        <Link to="/" className="text-4xl font-serif tracking-widest">
                            N.T.Style
                        </Link>
                    </div>

                    {/* --- მარჯვენა მხარე --- */}
                    <div className="flex-1 flex justify-end items-center space-x-6">
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
                        
                        <Link to="/cart" className="flex items-center space-x-2 text-base hover:text-gray-300 ">
                            <BagIcon />
                            <span>({totalItems})</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- ნავიგაცია --- */}
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
                {/* <Link to="/category/shoes" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
                    {t.shoes}
                </Link> */}
                {/* <Link to="/category/bags" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
                    {t.bags}
                </Link>
                <Link to="/category/jewelry" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
                    {t.jewelry}
                </Link>
                <Link to="/category/accessories" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
                    {t.accessories}
                </Link>
                <Link to="/category/gifts" className="text-base font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-all pb-1">
                    {t.gifts}
                </Link> */}
                <Link to="/category/salepage" className="text-base font-medium text-red-500 hover:text-red-400 border-b-2 border-transparent hover:border-red-500 transition-all pb-1">
                    {t.sale}
                </Link>
            </nav>

            <div className="lg:hidden flex justify-start space-x-4 overflow-x-auto whitespace-nowrap py-3 px-4">
                {/* მობილურისთვის ლინკები აქ შეგიძლიათ ჩაამატოთ იგივე პრინციპით თუ დაგჭირდათ */}
            </div>

        </header>
    );
};
 
export default Header;