import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'; 
import { useLanguage } from '../context/LanguageContext';

// ფოტოს ლინკი
const SALE_BANNER_IMG = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop";

const translations = {
  ge: {
    title: "შეთავაზებები",
    subtitle: "აღმოაჩინეთ სეზონური ფასდაკლებები და ექსკლუზიური პირობები.",
    newsletter_title: "არ გამოტოვოთ სიახლეები",
    newsletter_desc: "დარეგისტრირდი და მიიღე შეტყობინებები ახალ აქციებზე პირველმა.",
    email_placeholder: "ელ-ფოსტის მისამართი",
    join_btn: "გამოწერა",
    processing: "გაგზავნა...",
    success_msg: "✅ გმადლობთ! კოდი გამოგზავნილია.",
    error_msg: "❌ შეცდომა. სცადეთ თავიდან.",
    offers: [
      { id: 1, title: "სეზონური ფასდაკლება", desc: "-50%-მდე ფასდაკლება რჩეულ კოლექციაზე", icon: "percent" },
      { id: 2, title: "უფასო მიწოდება", desc: "ყველა შეკვეთაზე 200₾-ის ზემოთ", icon: "truck" },
      { id: 3, title: "სტუდენტური შეთავაზება", desc: "დამატებითი -10% სტუდენტებისთვის", icon: "academic" },
      { id: 4, title: "საჩუქარი შეკვეთაზე", desc: "მიიღეთ აქსესუარი საჩუქრად", icon: "gift" },
      { id: 5, title: "Black Friday Pre-Sale", desc: "ადრეული წვდომა დახურულ გაყიდვებზე", icon: "tag" },
      { id: 6, title: "ლოიალობის პროგრამა", desc: "დააგროვეთ ქულები ყოველ შენაძენზე", icon: "star" },
    ],
  },
  en: {
    title: "Special Offers",
    subtitle: "Discover seasonal sales and exclusive offers.",
    newsletter_title: "Don't miss out",
    newsletter_desc: "Sign up and be the first to know about new promotions.",
    email_placeholder: "Email Address",
    join_btn: "Join",
    processing: "Sending...",
    success_msg: "✅ Thanks! Code sent.",
    error_msg: "❌ Error. Try again.",
    offers: [
      { id: 1, title: "Seasonal Sale", desc: "Up to 50% off on selected items", icon: "percent" },
      { id: 2, title: "Free Shipping", desc: "On all orders over 200 GEL", icon: "truck" },
      { id: 3, title: "Student Discount", desc: "Extra 10% off for students", icon: "academic" },
      { id: 4, title: "Gift with Purchase", desc: "Get a free accessory with your order", icon: "gift" },
      { id: 5, title: "Black Friday Pre-Sale", desc: "Early access to closed sales", icon: "tag" },
      { id: 6, title: "Loyalty Program", desc: "Earn points on every purchase", icon: "star" },
    ],
  },
  ru: {
    title: "Предложения",
    subtitle: "Откройте для себя сезонные скидки и эксклюзивные предложения.",
    newsletter_title: "Не пропустите",
    newsletter_desc: "Зарегистрируйтесь и узнавайте о новых акциях первыми.",
    email_placeholder: "Адрес эл. почты",
    join_btn: "Подписаться",
    processing: "Отправка...",
    success_msg: "✅ Спасибо! Код отправлен.",
    error_msg: "❌ Ошибка. Попробуйте снова.",
    offers: [
      { id: 1, title: "Сезонная распродажа", desc: "Скидки до 50% на избранное", icon: "percent" },
      { id: 2, title: "Бесплатная доставка", desc: "Для всех заказов свыше 200₾", icon: "truck" },
      { id: 3, title: "Студенческая скидка", desc: "Дополнительно -10% для студентов", icon: "academic" },
      { id: 4, title: "Подарок к заказу", desc: "Получите аксессуар в подарок", icon: "gift" },
      { id: 5, title: "Black Friday Pre-Sale", desc: "Ранний доступ к закрытым распродажам", icon: "tag" },
      { id: 6, title: "Программа лояльности", desc: "Накапливайте баллы за каждую покупку", icon: "star" },
    ],
  }
};

const Icon = ({ name }) => {
  const icons = {
    percent: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a22.5 22.5 0 0 0 5.253-5.253c.542-.826.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />,
    truck: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />,
    academic: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-5.265-14.03 50.57 50.57 0 0 0 15.482 0 5.265 5.265 0 0 0-5.265 14.03m12 0c1.026 0 2.052-.102 3.064-.306M12 20.904a48.62 48.62 0 0 1-8.232-4.41M12 20.904c1.026 0 2.052-.102 3.064-.306" />,
    gift: <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25M3 11.25h18M3 11.25a2.25 2.25 0 0 1 2.25-2.25h1.313c.98 0 1.77-.66 1.992-1.61L9 6.223V6.25a3 3 0 0 0 3-3h0a3 3 0 0 0 3 3v-.026l.445 1.166c.223.95.895 1.61 1.875 1.61H18.75A2.25 2.25 0 0 1 21 11.25" />,
    tag: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  };
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300">{icons[name]}</svg>;
};

const SalePage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  // --- STATE ---
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  // --- HANDLE SUBSCRIBE ---
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // დარწმუნდი, რომ პორტი ემთხვევა (5000)
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
    <>
      <Helmet>
        <title>{t.title} | N.T.Style</title>
      </Helmet>

      {/* მთავარი კონტეინერი */}
      <div className="flex flex-col lg:flex-row relative">

        {/* --- მარცხენა მხარე (სურათი) --- */}
        <div className="lg:w-5/12 w-full relative h-96 lg:h-screen lg:sticky lg:top-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-10"></div> 
          <img 
            src={SALE_BANNER_IMG} 
            alt="Sale Collection" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-10 left-10 z-20 text-white lg:w-[80%]">
             <span className="bg-black/80 px-4 py-1 text-xs uppercase tracking-widest font-sans mb-3 inline-block">
               N.T.Style Exclusive
             </span>
             <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
               {t.title}
             </h2>
          </div>
        </div>

        {/* --- მარჯვენა მხარე (კონტენტი) --- */}
        <div className="lg:w-7/12 w-full bg-gray-50">
          <div className="px-6 py-12 lg:px-16 lg:py-20 min-h-screen">
            
            <div className="max-w-3xl mx-auto">
              {/* მობილური სათაური */}
              <div className="mb-12">
                 <h1 className="text-3xl font-serif text-black mb-4 block lg:hidden">{t.title}</h1>
                 <p className="text-gray-600 font-sans text-lg font-light leading-relaxed">
                   {t.subtitle}
                 </p>
              </div>

              {/* ბარათების გრიდი */}
              <div className="grid gap-6 md:grid-cols-2">
                {t.offers.map((offer) => (
                  <div 
                    key={offer.id}
                    className="group bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-gray-200 cursor-default"
                  >
                    <div className="mb-6 p-4 w-fit bg-gray-50 rounded-lg group-hover:bg-black transition-colors duration-500">
                        <Icon name={offer.icon} />
                    </div>
                    
                    <h3 className="text-xl font-serif text-black mb-3">
                      {offer.title}
                    </h3>
                    
                    <p className="text-gray-600 font-sans text-sm font-medium leading-relaxed">
                      {offer.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Newsletter ბლოკი (უკვე ფუნქციური) */}
              <div className="mt-16 p-10 bg-black text-white rounded-xl text-center shadow-xl relative overflow-hidden">
                  {/* დეკორატიული ელემენტი უკანა ფონზე */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-gray-800 rounded-full opacity-20 blur-2xl"></div>

                  <h3 className="text-2xl font-serif mb-4 relative z-10">{t.newsletter_title}</h3>
                  <p className="font-sans font-light text-gray-300 mb-6 relative z-10">
                    {t.newsletter_desc}
                  </p>
                  
                  <form onSubmit={handleSubscribe} className="max-w-sm mx-auto relative z-10">
                      <div className="flex border-b border-white pb-2 mb-2">
                        <input 
                          type="email" 
                          placeholder={t.email_placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 font-sans disabled:opacity-50"
                          required
                          disabled={status === 'loading'}
                        />
                        <button 
                          type="submit" 
                          disabled={status === 'loading'}
                          className="uppercase font-bold text-sm tracking-widest hover:text-gray-300 disabled:opacity-50 transition-colors"
                        >
                          {status === 'loading' ? t.processing : t.join_btn}
                        </button>
                      </div>

                      {/* სტატუსის მესიჯები */}
                      {status === 'success' && (
                        <p className="text-green-400 text-xs mt-2 animate-pulse font-medium">{t.success_msg}</p>
                      )}
                      {status === 'error' && (
                        <p className="text-red-400 text-xs mt-2 font-medium">{t.error_msg}</p>
                      )}
                  </form>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </>
  );
};

export default SalePage;