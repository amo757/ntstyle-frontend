import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
// ყურადღება: შემოიტანე შენი ავტორიზაციის და ენის კონტექსტები
// import { useAuth } from '../context/AuthContext'; 
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext.jsx';

// --- 3 ენის ლექსიკონი ---
const translations = {
    en: {
        emptyCart: "Your Shopping Bag is empty",
        startShopping: "Start Shopping",
        title: "Shopping Bag",
        color: "Color",
        size: "Size",
        qty: "Qty",
        remove: "Remove from Bag",
        moveToWishlist: "Move to your Wish List",
        orderSummary: "Order Summary",
        subtotal: "Item subtotal",
        discountMsg: "Discount (10% First Order)",
        total: "Total",
        taxInfo: "I accept that I will pay any applicable taxes and/or duties when my order arrives at customs.",
        rewardInfo: "This purchase will bring you closer to the next Reward tier",
        addPromo: "Add a Promo Code",
        enterCode: "Enter code",
        apply: "Apply",
        checkout: "CONTINUE TO CHECKOUT",
        loginRequired: "Please log in to use promo codes.",
        promoApplied: "Promo code applied: 10% Off First Order",
        promoUsed: "This code is valid for first purchases only.",
        invalidPromo: "Invalid promo code."
    },
    ge: {
        emptyCart: "თქვენი კალათა ცარიელია",
        startShopping: "შოპინგის დაწყება",
        title: "კალათა",
        color: "ფერი",
        size: "ზომა",
        qty: "რაოდ.",
        remove: "კალათიდან წაშლა",
        moveToWishlist: "სურვილების სიაში გადატანა",
        orderSummary: "შეკვეთის ჯამი",
        subtotal: "ქვეჯამი",
        discountMsg: "ფასდაკლება (10% პირველ შეკვეთაზე)",
        total: "სულ",
        taxInfo: "ვეთანხმები, რომ გადავიხდი შესაბამის გადასახადებს/ბაჟს ნივთის ჩამოსვლისას.",
        rewardInfo: "ეს შენაძენი დაგეხმარებათ შემდეგი ფასდაკლების დონის მიღწევაში.",
        addPromo: "პრომო კოდის დამატება",
        enterCode: "შეიყვანეთ კოდი",
        apply: "გამოყენება",
        checkout: "გადახდაზე გადასვლა",
        loginRequired: "პრომო კოდის გამოსაყენებლად, გთხოვთ გაიაროთ ავტორიზაცია.",
        promoApplied: "პრომო კოდი გააქტიურდა: 10% ფასდაკლება",
        promoUsed: "ეს კოდი მოქმედებს მხოლოდ პირველ შეკვეთაზე.",
        invalidPromo: "არასწორი პრომო კოდი."
    },
    ru: {
        emptyCart: "Ваша корзина пуста",
        startShopping: "Начать покупки",
        title: "Корзина",
        color: "Цвет",
        size: "Размер",
        qty: "Кол-во",
        remove: "Удалить из корзины",
        moveToWishlist: "Переместить в избранное",
        orderSummary: "Сумма заказа",
        subtotal: "Подытог",
        discountMsg: "Скидка (10% на первый заказ)",
        total: "Итого",
        taxInfo: "Я согласен оплатить любые применимые налоги и/или пошлины по прибытии заказа на таможню.",
        rewardInfo: "Эта покупка приблизит вас к следующему уровню скидок.",
        addPromo: "Добавить промокод",
        enterCode: "Введите код",
        apply: "Применить",
        checkout: "ПЕРЕЙТИ К ОПЛАТЕ",
        loginRequired: "Пожалуйста, войдите в систему, чтобы использовать промокод.",
        promoApplied: "Промокод применен: скидка 10%",
        promoUsed: "Этот код действителен только для первых покупок.",
        invalidPromo: "Неверный промокод."
    }
};

// --- ICONS ---
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);

const CartScreen = () => {
    const { cartItems, cartTotals, removeItem, setPromoDiscount, promoDiscount } = useCart();
    const { toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    // ყურადღება: აქ უნდა შემოიტანო იუზერი შენი Auth Context-იდან.
    // დროებით Mock მონაცემი:
    const userContext = useUser() || {};
    const userInfo = userContext.user;
    // ყურადღება: აქ უნდა შემოიტანო ენა შენი Language Context-იდან.
    // დროებითი Mock მონაცემი (აირჩიე 'en', 'ka', 'ru'):
    // წაშალე ეს:
    // const language = 'ge'; 

    // და ჩასვი ეს:
    const { language } = useLanguage();

    const t = translations[language]; // ეს ისედაც გიწერია და დატოვე

    const [promoCode, setPromoCode] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    // ვამოწმებთ: იუზერი შესულია და არ გამოუყენებია ველქომ პრომო?
    const isFirstPurchase = userInfo && !userInfo.hasUsedWelcomePromo;

    const handleApplyPromo = () => {
        if (!userInfo) {
            setMessage({ text: t.loginRequired, type: 'error' });
            return;
        }

        if (promoCode === 'NTstyle10') {
            if (isFirstPurchase) {
                const discountAmount = cartTotals.totalPrice * 0.10;
                setPromoDiscount(discountAmount);
                setMessage({ text: t.promoApplied, type: 'success' });
            } else {
                setPromoDiscount(0);
                setMessage({ text: t.promoUsed, type: 'error' });
            }
        } else {
            setPromoDiscount(0);
            setMessage({ text: t.invalidPromo, type: 'error' });
        }
    };

    const finalTotal = cartTotals.totalPrice - promoDiscount;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-serif mb-4">{t.emptyCart}</h2>
                <Link to="/category/clothing" className="border-b border-black pb-1 uppercase text-xs font-bold tracking-widest hover:text-gray-600">
                    {t.startShopping}
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
                <h1 className="text-[32px] font-serif mb-10 text-black" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {t.title}
                </h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- LEFT: CART ITEMS --- */}
                    <div className="w-full lg:w-2/3">
                        <div className="border-t border-gray-200">
                            {cartItems.map((item) => (
                                <div key={item.slug + item.size} className="flex py-8 border-b border-gray-200">
                                    <Link to={`/product/${item.slug}`} className="w-32 h-40 flex-shrink-0 bg-gray-50 mr-6">
                                        <img
                                            src={item.images?.[0]}
                                            alt={item.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </Link>

                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1">{item.designer}</h3>
                                                    <Link to={`/product/${item.slug}`} className="text-[13px] text-gray-600 hover:text-black mb-2 block">
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <p className="text-[13px] font-bold">{item.price} GEL</p>
                                            </div>

                                            <div className="text-[12px] text-gray-500 space-y-1 mt-2">
                                                {item.selectedColor && <p>{t.color}: {item.selectedColor.name}</p>}
                                                <p>{t.size}: {item.size}</p>
                                                <p>{t.qty}: {item.quantity}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 mt-4">
                                            <button
                                                onClick={() => removeItem(item.slug, item.size)}
                                                className="text-[11px] text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4"
                                            >
                                                {t.remove}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    toggleWishlist(item);
                                                    removeItem(item.slug, item.size);
                                                }}
                                                className="text-[11px] text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4"
                                            >
                                                {t.moveToWishlist}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: ORDER SUMMARY --- */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6 text-gray-500">{t.orderSummary}</h3>

                            <div className="flex justify-between text-[13px] mb-4">
                                <span>{t.subtotal}</span>
                                <span>{cartTotals.totalPrice.toFixed(2)} GEL</span>
                            </div>

                            {promoDiscount > 0 && (
                                <div className="flex justify-between text-[13px] mb-4 text-green-700">
                                    <span>{t.discountMsg}</span>
                                    <span>- {promoDiscount.toFixed(2)} GEL</span>
                                </div>
                            )}

                            <div className="flex justify-between text-[14px] font-bold mb-6 pt-4 border-t border-gray-200">
                                <span>{t.total}</span>
                                <span>{finalTotal.toFixed(2)} GEL</span>
                            </div>

                            <div className="bg-[#F5F8FA] p-4 mb-6 flex gap-3 text-[11px] text-gray-600 leading-relaxed">
                                <div className="mt-0.5"><InfoIcon /></div>
                                <p>{t.taxInfo}</p>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-gray-700 mb-8">
                                <span className="text-[#9E8B6E]">◆</span>
                                <p>{t.rewardInfo}</p>
                            </div>

                            <div className="mb-8">
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-2">{t.addPromo}</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={t.enterCode}
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-grow border border-gray-300 p-3 text-[13px] focus:outline-none focus:border-black"
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        className="border border-gray-300 px-6 text-[11px] font-bold uppercase tracking-widest hover:border-black transition"
                                    >
                                        {t.apply}
                                    </button>
                                </div>
                                {message.text && (
                                    <p className={`text-[11px] mt-2 ${message.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                                        {message.text}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => navigate('/shipping')}
                                className="w-full bg-black text-white py-4 uppercase text-[12px] font-bold tracking-[0.15em] hover:bg-gray-800 transition flex justify-center items-center gap-3 mb-6"
                            >
                                <LockIcon />
                                {t.checkout}
                            </button>

                            <div className="flex justify-center opacity-90">
                                <img
                                    src="/images/visa.png"
                                    alt="Payment Methods"
                                    className="h-6 object-contain"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartScreen;