import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext'; // 👈 დამატებულია

const translations = {
  ge: {
    yourWishlist: "შენი სურვილების სია",
    alerts: "შეტყობინებები",
    closet: "კარადა",
    wishlistTab: "სურვილების სია",
    createList: "სიის შექმნა",
    share: "გაზიარება",
    emptyTitle: "შენი სურვილების სია ცარიელია",
    emptyDesc: "დაამატე შენი ფავორიტი ნივთები სურვილების სიაში",
    shopWhatsNew: "ნახე სიახლეები",
    addToBag: "კალათაში დამატება",
    goodEvening: "საღამო მშვიდობისა",
    myRewards: "ჩემი ჯილდოები",
    manageAccount: "ანგარიშის მართვა",
    signOut: "გასვლა",
    needHelp: "დახმარება გჭირდება?",
    customerCare1: "ნებისმიერი კითხვისთვის ეწვიეთ N.T.Style-ის",
    customerCare2: "მომხმარებელთა ზრუნვის ცენტრს"
  },
  en: {
    yourWishlist: "Your Wish List",
    alerts: "Alerts",
    closet: "Closet",
    wishlistTab: "WISH LIST",
    createList: "Create List",
    share: "Share",
    emptyTitle: "This Wish List is currently empty",
    emptyDesc: "Add all your favorites to this Wish List",
    shopWhatsNew: "Shop What's New",
    addToBag: "Add to Bag",
    goodEvening: "Good Evening",
    myRewards: "My Rewards",
    manageAccount: "Manage your account",
    signOut: "Sign Out",
    needHelp: "Need Help?",
    customerCare1: "For any enquiries please visit N.T.Style",
    customerCare2: "Customer Care"
  },
  ru: {
    yourWishlist: "Ваш список желаний",
    alerts: "Оповещения",
    closet: "Гардероб",
    wishlistTab: "СПИСОК ЖЕЛАНИЙ",
    createList: "Создать список",
    share: "Поделиться",
    emptyTitle: "Ваш список желаний пуст",
    emptyDesc: "Добавьте все свои любимые вещи в этот список желаний",
    shopWhatsNew: "Смотреть новинки",
    addToBag: "В корзину",
    goodEvening: "Добрый вечер",
    myRewards: "Мои награды",
    manageAccount: "Управление аккаунтом",
    signOut: "Выйти",
    needHelp: "Нужна помощь?",
    customerCare1: "По любым вопросам посетите N.T.Style",
    customerCare2: "Центр обслуживания"
  }
};

const WishlistScreen = () => {
    const { wishlist, toggleWishlist } = useWishlist();
    const { user } = useUser();
    const { language } = useLanguage(); // 👈 ვიღებთ ენას
    
    // ვიღებთ შესაბამის ლექსიკონს (თუ არასწორია, ინგლისურს იღებს)
    const t = translations[language] || translations['en'];

    // დინამიური სათაურის გენერირება მომხმარებლის სახელის მიხედვით
    const getWishlistTitle = (name, isTab = false) => {
        if (!name) return isTab ? t.wishlistTab : t.yourWishlist;
        
        const upperName = isTab ? name.toUpperCase() : name;
        
        if (language === 'ge') return `${upperName}-ს სურვილების სია`;
        if (language === 'ru') return `Список желаний ${upperName}`;
        return `${upperName}'S WISH LIST`;
    };

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <div className="max-w-[1920px] mx-auto w-full px-6 md:px-12 pt-6 pb-12 flex-grow">
                
                {/* სათაური */}
                <h1 className="text-3xl font-serif mb-4">
                    {getWishlistTitle(user?.name, false)}
                </h1>

                {/* ტაბები */}
                <div className="flex space-x-8 border-b border-gray-200 mb-8 overflow-x-auto items-end">
                    <button className="pb-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black whitespace-nowrap">
                        {t.alerts}
                    </button>
                    <button className="pb-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black whitespace-nowrap">
                        {t.closet}
                    </button>
                    <button className="pb-3 text-xs font-bold uppercase tracking-widest border-b-2 border-black text-black whitespace-nowrap">
                        {getWishlistTitle(user?.name, true)}
                    </button>
                    <div className="flex-grow flex justify-end pb-3 space-x-6">
                         <span className="cursor-pointer uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-gray-600">
                             + {t.createList}
                         </span>
                         <span className="cursor-pointer uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-gray-600">
                             {t.share}
                         </span>
                    </div>
                </div>

                {/* კონტენტი */}
                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-6 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <h2 className="text-xl font-serif mb-2">{t.emptyTitle}</h2>
                        <p className="text-sm text-gray-600 mb-8">{t.emptyDesc}</p>
                        <Link to="/category/clothing" className="border-b border-black pb-1 uppercase text-xs font-bold tracking-widest hover:text-gray-600 hover:border-gray-600">
                            {t.shopWhatsNew}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
                        {wishlist.map((item) => (
                            <div key={item._id} className="relative group flex flex-col">
                                <button 
                                    onClick={() => toggleWishlist(item)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10 p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="mb-3 relative w-full aspect-[3/4] bg-[#F9F9F9]">
                                    <Link to={`/product/${item.slug}`}>
                                        <img 
                                            src={item.images?.[0]} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover object-top" 
                                        />
                                    </Link>
                                </div>

                                <div className="text-center px-1 flex flex-col flex-grow">
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.05em] mb-1 truncate w-full">{item.designer}</h3>
                                    <p className="text-[12px] text-gray-600 font-light mb-2 line-clamp-1">{item.name}</p>
                                    <p className="text-[13px] font-bold mb-3">{item.price} GEL</p>
                                    
                                    <button className="mt-auto w-full border border-black bg-white text-black py-2.5 uppercase text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition duration-300">
                                        {t.addToBag}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Info Area */}
            {user && (
                <div className="bg-[#F9F9F9] py-12 px-6 border-t border-gray-200 mt-auto">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            <h3 className="text-lg font-serif mb-2">{t.goodEvening}, {user.name}</h3>
                            <div className="flex space-x-4 text-xs text-gray-500 uppercase tracking-wide">
                                <Link to="/rewards" className="hover:underline">{t.myRewards}</Link>
                                <Link to="/account" className="hover:underline">{t.manageAccount}</Link>
                                <span className="hover:underline cursor-pointer">{t.signOut}</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500">
                            <p className="uppercase font-bold tracking-widest mb-2 text-black">{t.needHelp}</p>
                            <p>{t.customerCare1} <span className="underline cursor-pointer">{t.customerCare2}</span>.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistScreen;