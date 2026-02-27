import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useLanguage } from '../context/LanguageContext';

// --- TRANSLATIONS ---
const translations = {
  ge: {
    newsletter_title: "მიიღეთ 10%-იანი ფასდაკლება თქვენს შემდეგ შეკვეთაზე N.T.Style-ზე",
    newsletter_desc: "გამოიწერეთ N.T.Style-ის ელ-ფოსტა და მიიღეთ ექსკლუზიური ფასდაკლების კოდი. მოქმედებს წესები და პირობები.",
    email_placeholder: "ელ-ფოსტის მისამართი",
    sign_up: "გამოწერა",
    processing: "გაგზავნა...",
    success_msg: "✅ კოდი გამოგზავნილია!",
    error_msg: "❌ შეცდომა. სცადეთ კვლავ.",
    
    need_help: "დახმარება გჭირდებათ?",
    contact_us: "დაგვიკავშირდით",
    delivery: "მიწოდება",
    returns: "დაბრუნება & გადაცვლა",
    faqs: "ხშირად დასმული კითხვები",
    
    location_lang: "ლოკაცია & ენა",

    customer_care: "მომხმარებელზე ზრუნვა",
    track_order: "შეკვეთის დევნება", 
    create_return: "დაბრუნების შექმნა",
    payment: "გადახდა",
    privacy_policy: "კონფიდენციალურობის პოლიტიკა",
    cookie_policy: "Cookie პოლიტიკა",

    about_us: "ჩვენ შესახებ",
    about_nt: "N.T.Style-ის შესახებ",
    
    website_title: "ვებ-გვერდი N.T.Style",
    accepts: "N.T.Style იღებს",
    all_rights: "ყველა უფლება დაცულია."
  },
  en: {
    newsletter_title: "Enjoy 10% off your next order on N.T.Style",
    newsletter_desc: "Claim your exclusive discount code when you subscribe to N.T.Style emails. Terms & conditions apply.",
    email_placeholder: "Email Address",
    sign_up: "Sign Up",
    processing: "Sending...",
    success_msg: "✅ Code sent!",
    error_msg: "❌ Error. Try again.",
    
    need_help: "Need Help?",
    contact_us: "Contact Us",
    delivery: "Delivery",
    returns: "Returns & Exchanges",
    faqs: "FAQs",
    
    location_lang: "Location & Language",
    customer_care: "Customer Care",
    track_order: "Track an Order",
    create_return: "Create a Return",
    payment: "Payment",
    privacy_policy: "Privacy Policy",
    cookie_policy: "Cookie Policy",

    about_us: "About Us",
    about_nt: "About N.T.Style",
    people_planet: "People & Planet",
    rewards: "N.T.Style Rewards",
    advertising: "Advertising",
    affiliates: "Affiliates",
    careers: "Careers",

    website_title: "Website N.T.Style",
    accepts: "N.T.Style Accepts",
    all_rights: "All Rights Reserved."
  },
  ru: { 
    newsletter_title: "Получите скидку 10% на следующий заказ в N.T.Style",
    newsletter_desc: "Подпишитесь на рассылку N.T.Style и получите эксклюзивный код скидки. Действуют правила и условия.",
    email_placeholder: "Адрес эл. почты",
    sign_up: "Подписаться",
    processing: "Отправка...",
    success_msg: "✅ Код отправлен!",
    error_msg: "❌ Ошибка. Попробуйте снова.",
    
    need_help: "Нужна помощь?",
    contact_us: "Связаться с нами",
    delivery: "Доставка",
    returns: "Возврат и обмен",
    faqs: "Частые вопросы",
    
    location_lang: "Локация и язык",
    customer_care: "Обслуживание клиентов",
    track_order: "Отследить заказ",
    create_return: "Оформить возврат",
    payment: "Оплата",
    privacy_policy: "Политика конфиденциальности",
    cookie_policy: "Политика Cookie",

    about_us: "О нас",
    about_nt: "О N.T.Style",
    people_planet: "Люди и Планета",
    rewards: "Бонусы N.T.Style",
    advertising: "Реклама",
    affiliates: "Партнеры",
    careers: "Карьера",

    website_title: "Веб-сайт N.T.Style",
    accepts: "N.T.Style принимает",
    all_rights: "Все права защищены."
  }
};

const SocialIcon = ({ d }) => (
  <svg className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

const Footer = () => {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language] || translations['en'];

  // --- STATE ---
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');      
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  const languageOptions = [
    { code: 'ge', label: 'Georgia', flag: '/images/geo.png' }, 
    { code: 'en', label: 'English', flag: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" },
    { code: 'ru', label: 'Russian', flag: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg" }
  ];

  const currentOption = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // --- SUBSCRIBE LOGIC ---
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // დარწმუნდი, რომ პორტი (5000) ემთხვევა შენს სერვერს
      await axios.post('https://ntstyle-api.onrender.com/api/newsletter/subscribe', { email });
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(null), 5000); 
    } catch (error) {
      console.error("Newsletter Error:", error);
      setStatus('error');
    }
  };

  return (
    <footer className="w-full font-sans text-gray-600 text-sm pb-10"> 
      
      {/* --- ნაცრისფერი სექცია --- */}
      <div className="bg-[#f4f4f4] py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between gap-10">
          
          {/* მარცხენა მხარე */}
          <div className="lg:w-1/2">
            <h3 className="font-bold text-black uppercase tracking-wider mb-2 text-xs md:text-sm">
              {t.newsletter_title}
            </h3>
            <p className="mb-4 text-xs text-gray-500 leading-relaxed max-w-md">
              {t.newsletter_desc}
            </p>

            {/* --- ფორმა --- */}
            <form onSubmit={handleSubscribe} className="max-w-md mb-6 relative">
              <div className="flex w-full">
                <input 
                  type="email" 
                  placeholder={t.email_placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition"
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-white border-t border-b border-r border-gray-300 text-black font-bold uppercase px-6 py-3 text-xs hover:bg-black hover:text-white transition-colors border-l-0 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? t.processing : t.sign_up}
                </button>
              </div>
              
              {/* სტატუსის მესიჯები */}
              {status === 'success' && (
                <p className="text-green-600 text-xs mt-2 absolute">{t.success_msg}</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-xs mt-2 absolute">{t.error_msg}</p>
              )}
            </form>
            
            <div className="flex space-x-6 mt-8">
                <SocialIcon d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                <SocialIcon d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                <SocialIcon d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </div>
          </div>
          
          {/* მარჯვენა მხარე */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-10 lg:gap-20">
            {/* Need Help? */}
            <div>
                <h4 className="font-bold text-black uppercase text-xs mb-4 tracking-wide">{t.need_help}</h4>
                <ul className="space-y-2 text-xs">
                    <li><Link to="/contact" className="hover:text-black hover:underline decoration-1 underline-offset-2">{t.contact_us}</Link></li>
                    <li><Link to="/shipping-info" className="hover:text-black hover:underline decoration-1 underline-offset-2">{t.delivery}</Link></li>
                    <li><Link to="/refund-policy" className="hover:text-black hover:underline decoration-1 underline-offset-2">{t.returns}</Link></li>
                </ul>
            </div>
            
            {/* --- LOCATION & LANGUAGE SELECTOR --- */}
            <div className="relative">
                <h4 className="font-bold text-black uppercase text-xs mb-4 tracking-wide">{t.location_lang}</h4>
                
                {/* მთავარი ღილაკი */}
                <div 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="flex items-center gap-2 cursor-pointer group select-none relative z-10"
                >
                    <img 
                      src={currentOption.flag} 
                      alt={currentOption.label} 
                      className="w-5 h-5 rounded-full border border-gray-200 object-cover" 
                    />
                    
                    <span className="text-black font-medium group-hover:underline decoration-1 underline-offset-2 text-xs">
                        {currentOption.label}
                    </span>
                    
                    <svg className={`w-3 h-3 ml-1 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* --- Dropdown Menu --- */}
                {isOpen && (
                  <div className="absolute  left-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                    {languageOptions.map((option) => (
                      <div 
                        key={option.code}
                        onClick={() => handleLanguageSelect(option.code)}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition ${language === option.code ? 'bg-gray-100 font-bold' : ''}`}
                      >
                          <img src={option.flag} alt={option.label} className="w-4 h-4 rounded-full border border-gray-200 object-cover" />
                          <span className="text-xs text-black">{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>

          </div>
        </div>
      </div>

      {/* --- თეთრი სექცია --- */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Customer Care */}
            <div>
                <h4 className="font-bold text-black uppercase text-xs mb-5 tracking-widest">{t.customer_care}</h4>
                <ul className="space-y-3 text-xs text-gray-500">
                    <li><Link to="/refund-policy" className="hover:underline hover:text-black">{t.create_return}</Link></li>
                    <li><Link to="/contact" className="hover:underline hover:text-black">{t.contact_us}</Link></li>
                    <li><Link to="/payment-info" className="hover:underline hover:text-black">{t.payment}</Link></li>
                    <li><Link to="/shipping-info" className="hover:underline hover:text-black">{t.delivery}</Link></li>
                    <li><Link to="/privacy" className="hover:underline hover:text-black">{t.privacy_policy}</Link></li>
                    <li><Link to="/cookies" className="hover:underline hover:text-black">{t.cookie_policy}</Link></li>
                </ul>
            </div>

            {/* About Us */}
            <div>
                <h4 className="font-bold text-black uppercase text-xs mb-5 tracking-widest">{t.about_us}</h4>
                <ul className="space-y-3 text-xs text-gray-500">
                    <li><Link to="/category/aboutNT" className="hover:underline hover:text-black">{t.about_nt}</Link></li>
                </ul>
            </div>

            {/* Designer Info */}
            <div>
                <h4 className="font-bold text-black uppercase text-xs mb-5 tracking-widest">{t.website_title}</h4>
                <div className="flex items-start gap-4">
                    <img src="/fav.jpg" alt="QR Code" className="w-20 h-20 border border-gray-200" />
                    <p className="text-xs text-gray-500 max-w-[140px] leading-relaxed">
                        {language === 'ge' ? (
                           <>ქართველი დიზაინერი <br /> ნათია თხელიძე</>
                        ) : language === 'ru' ? (
                           <>Грузинский дизайнер <br /> Натия Тхелидзе</>
                        ) : (
                           <>Georgian Designer <br /> Natia Tkhelidze</>
                        )}
                    </p>
                </div>
            </div>

            {/* Payment */}
            <div>
                <h4 className="font-bold text-black uppercase text-xs mb-5 ml-0.5 tracking-widest">{t.accepts}</h4>
                <img src="/images/visa.png" alt="Payment Methods" className="h-6 lg:h-7 object-contain opacity-100" />
            </div>
        </div>
      </div>
      
      {/* --- Copyright --- */}
      <div className="bg-white py-8 border-t border-gray-200 text-center">
         <h3 className="font-serif text-xl tracking-[0.2em] mb-2 text-black">N.T.Style</h3>
         <p className="text-[10px] text-gray-400 uppercase tracking-widest">© {new Date().getFullYear()} N.T.Style. {t.all_rights}</p>
      </div>

    </footer>
  );
};

export default Footer;