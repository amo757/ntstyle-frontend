import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext'; // დარწმუნდი, რომ მისამართი სწორია

// --- თარგმანები ---
const translations = {
  ge: {
    meta_title: "კონფიდენციალურობის პოლიტიკა | N.T.Style",
    meta_desc: "N.T.Style-ის კონფიდენციალურობის პოლიტიკა და მონაცემთა დაცვის სტანდარტები.",
    page_title: "კონფიდენციალურობის პოლიტიკა",
    last_update: "ბოლო განახლება",
    year_text: "წელი",
    
    intro_text: "კომპანია N.T.Style (შემდგომში „ჩვენ“, „კომპანია“) დიდ მნიშვნელობას ანიჭებს თქვენი პერსონალური მონაცემების დაცვას. წინამდებარე პოლიტიკა განმარტავს, თუ რა სახის ინფორმაციას ვაგროვებთ, როგორ ვიყენებთ მას და რა უფლებები გაქვთ თქვენ. ვებ-გვერდის გამოყენებით თქვენ ეთანხმებით ამ პირობებს.",
    
    sec1_title: "1. ინფორმაციის შეგროვება",
    sec1_desc: "ჩვენ ვაგროვებთ ინფორმაციას, რომელიც აუცილებელია მომსახურების სრულყოფილად გაწევისთვის. მონაცემები იყოფა ორ კატეგორიად:",
    sec1_li1_strong: "პერსონალური ინფორმაცია:",
    sec1_li1_text: "შეკვეთის გაფორმებისას ან რეგისტრაციისას (სახელი, გვარი, მიწოდების მისამართი, ტელეფონი, ელ-ფოსტა).",
    sec1_li2_strong: "ავტომატური მონაცემები:",
    sec1_li2_text: "IP მისამართი, ბრაუზერის ტიპი და საიტზე გატარებული დრო (სტატისტიკური მიზნებისთვის).",

    sec2_title: "2. მონაცემთა გამოყენების მიზნები",
    sec2_desc: "თქვენს მიერ მოწოდებული ინფორმაცია გამოიყენება შემდეგი მიზნებისთვის:",
    sec2_li1: "შეკვეთის დამუშავება და პროდუქციის მოწოდება;",
    sec2_li2: "კომუნიკაცია შეკვეთის სტატუსის შესახებ;",
    sec2_li3: "სერვისის გაუმჯობესება და ტექნიკური მხარდაჭერა;",
    sec2_li4: "სიახლეებისა და აქციების შეტყობინება (მხოლოდ თქვენი თანხმობის შემთხვევაში).",

    sec3_title: "3. უსაფრთხოება და გადახდები",
    sec3_important: "მნიშვნელოვანია:",
    sec3_text_part1: "თქვენი საბანკო ბარათის მონაცემები ჩვენს ვებ-გვერდზე",
    sec3_text_bold: "არ ინახება",
    sec3_text_part2: ". გადახდის პროცესი სრულად ხორციელდება ბანკის დაცულ გვერდზე, უსაფრთხოების საერთაშორისო სტანდარტების დაცვით. ჩვენ არ გვაქვს წვდომა თქვენს საბანკო რეკვიზიტებზე.",

    sec4_title: "4. ინფორმაციის გაზიარება",
    sec4_desc: "ჩვენ არ ვყიდით და არ ვაქირავებთ თქვენს პერსონალურ მონაცემებს. ინფორმაცია მესამე პირებს გადაეცემათ მხოლოდ აუცილებლობის შემთხვევაში:",
    sec4_li1_strong: "საკურიერო კომპანიები:",
    sec4_li1_text: "ამანათის ჩასაბარებლად.",
    sec4_li2_strong: "კანონმდებლობა:",
    sec4_li2_text: "თუ ამას მოითხოვს საქართველოს კანონმდებლობა.",

    sec5_title: "5. Cookie (ქუქი) ფაილები",
    sec5_desc: "ჩვენი ვებ-გვერდი იყენებს \"Cookie\" ფაილებს მომხმარებლის გამოცდილების გასაუმჯობესებლად (მაგალითად, კალათში ნივთების დამახსოვრება). თქვენ შეგიძლიათ ბრაუზერის პარამეტრებიდან შეზღუდოთ მათი გამოყენება.",

    sec6_title: "6. თქვენი უფლებები",
    sec6_desc: "თქვენ უფლება გაქვთ მოითხოვოთ ინფორმაცია ჩვენს ხელთ არსებულ მონაცემებზე, მოითხოვოთ მათი შესწორება ან წაშლა (თუ ეს არ ეწინააღმდეგება კანონს).",

    contact_title: "დაგვიკავშირდით",
    contact_desc: "კითხვების შემთხვევაში, გთხოვთ მოგვწეროთ:",
    email_label: "ელ-ფოსტა:"
  },
  en: {
    meta_title: "Privacy Policy | N.T.Style",
    meta_desc: "Privacy Policy and data protection standards of N.T.Style.",
    page_title: "Privacy Policy",
    last_update: "Last updated",
    year_text: "",
    
    intro_text: "Company N.T.Style (hereinafter \"we\", \"the Company\") places great importance on protecting your personal data. This policy explains what information we collect, how we use it, and what rights you have. By using the website, you agree to these terms.",
    
    sec1_title: "1. Information Collection",
    sec1_desc: "We collect information necessary to provide full service. Data is divided into two categories:",
    sec1_li1_strong: "Personal Information:",
    sec1_li1_text: "Upon ordering or registration (Name, surname, delivery address, phone, email).",
    sec1_li2_strong: "Automatic Data:",
    sec1_li2_text: "IP address, browser type, and time spent on the site (for statistical purposes).",

    sec2_title: "2. Purpose of Data Use",
    sec2_desc: "The information provided by you is used for the following purposes:",
    sec2_li1: "Processing orders and delivering products;",
    sec2_li2: "Communication regarding order status;",
    sec2_li3: "Service improvement and technical support;",
    sec2_li4: "Notification of news and promotions (only with your consent).",

    sec3_title: "3. Security & Payments",
    sec3_important: "Important:",
    sec3_text_part1: "Your bank card details are",
    sec3_text_bold: "NOT stored",
    sec3_text_part2: "on our website. The payment process is fully conducted on the bank's secure page, following international security standards. We do not have access to your banking details.",

    sec4_title: "4. Information Sharing",
    sec4_desc: "We do not sell or rent your personal data. Information is shared with third parties only when necessary:",
    sec4_li1_strong: "Courier Companies:",
    sec4_li1_text: "To deliver the parcel.",
    sec4_li2_strong: "Legislation:",
    sec4_li2_text: "If required by Georgian law.",

    sec5_title: "5. Cookie Files",
    sec5_desc: "Our website uses \"Cookie\" files to improve user experience (e.g., remembering items in the cart). You can restrict their use from your browser settings.",

    sec6_title: "6. Your Rights",
    sec6_desc: "You have the right to request information about the data we hold, request its correction or deletion (unless it contradicts legal obligations).",

    contact_title: "Contact Us",
    contact_desc: "If you have any questions, please contact us:",
    email_label: "Email:"
  },
  ru: {
    meta_title: "Политика конфиденциальности | N.T.Style",
    meta_desc: "Политика конфиденциальности и стандарты защиты данных N.T.Style.",
    page_title: "Политика конфиденциальности",
    last_update: "Последнее обновление",
    year_text: "год",
    
    intro_text: "Компания N.T.Style (далее «мы», «Компания») придает большое значение защите ваших персональных данных. Настоящая политика разъясняет, какую информацию мы собираем, как ее используем и какими правами вы обладаете. Используя веб-сайт, вы соглашаетесь с этими условиями.",
    
    sec1_title: "1. Сбор информации",
    sec1_desc: "Мы собираем информацию, необходимую для полноценного предоставления услуг. Данные делятся на две категории:",
    sec1_li1_strong: "Персональная информация:",
    sec1_li1_text: "При оформлении заказа или регистрации (имя, фамилия, адрес доставки, телефон, эл. почта).",
    sec1_li2_strong: "Автоматические данные:",
    sec1_li2_text: "IP-адрес, тип браузера и время, проведенное на сайте (для статистических целей).",

    sec2_title: "2. Цели использования данных",
    sec2_desc: "Предоставленная вами информация используется для следующих целей:",
    sec2_li1: "Обработка заказов и доставка продукции;",
    sec2_li2: "Коммуникация о статусе заказа;",
    sec2_li3: "Улучшение сервиса и техническая поддержка;",
    sec2_li4: "Уведомление о новостях и акциях (только с вашего согласия).",

    sec3_title: "3. Безопасность и платежи",
    sec3_important: "Важно:",
    sec3_text_part1: "Данные вашей банковской карты",
    sec3_text_bold: "не хранятся",
    sec3_text_part2: "на нашем веб-сайте. Процесс оплаты полностью осуществляется на защищенной странице банка с соблюдением международных стандартов безопасности. У нас нет доступа к вашим банковским реквизитам.",

    sec4_title: "4. Передача информации",
    sec4_desc: "Мы не продаем и не сдаем в аренду ваши персональные данные. Информация передается третьим лицам только в случае необходимости:",
    sec4_li1_strong: "Курьерские компании:",
    sec4_li1_text: "Для доставки посылки.",
    sec4_li2_strong: "Законодательство:",
    sec4_li2_text: "Если этого требует законодательство Грузии.",

    sec5_title: "5. Файлы Cookie",
    sec5_desc: "Наш веб-сайт использует файлы «Cookie» для улучшения пользовательского опыта (например, запоминание товаров в корзине). Вы можете ограничить их использование в настройках браузера.",

    sec6_title: "6. Ваши права",
    sec6_desc: "Вы имеете право запросить информацию об имеющихся у нас данных, потребовать их исправления или удаления (если это не противоречит закону).",

    contact_title: "Свяжитесь с нами",
    contact_desc: "Если у вас есть вопросы, пожалуйста, напишите нам:",
    email_label: "Эл. почта:"
  }
};

const PrivacyPage = () => {
  const { language } = useLanguage();
  // თუ ენა ვერ იპოვა, ინგლისურს გამოიყენებს (Fallback)
  const t = translations[language] || translations['en'];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      <Helmet>
        <title>{t.meta_title}</title>
        <meta name="description" content={t.meta_desc} />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* --- სათაური --- */}
        <div className="text-center mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black tracking-wide uppercase">
            {t.page_title}
          </h1>
          <p className="text-sm text-gray-500">
            {t.last_update}: {new Date().getFullYear()} {t.year_text}
          </p>
        </div>
        
        {/* --- ძირითადი ტექსტი --- */}
        <div className="space-y-10 leading-relaxed">
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <p>{t.intro_text}</p>
          </div>

          {/* 1. ინფორმაციის შეგროვება */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              {t.sec1_title}
            </h2>
            <p className="mb-4">{t.sec1_desc}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <span className="font-semibold text-gray-900">{t.sec1_li1_strong}</span> {t.sec1_li1_text}
              </li>
              <li>
                <span className="font-semibold text-gray-900">{t.sec1_li2_strong}</span> {t.sec1_li2_text}
              </li>
            </ul>
          </section>

          {/* 2. მონაცემთა გამოყენება */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4">
              {t.sec2_title}
            </h2>
            <p className="mb-3">{t.sec2_desc}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t.sec2_li1}</li>
              <li>{t.sec2_li2}</li>
              <li>{t.sec2_li3}</li>
              <li>{t.sec2_li4}</li>
            </ul>
          </section>

          {/* 3. უსაფრთხოება */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4">
              {t.sec3_title}
            </h2>
            <div className="border-l-4 border-black pl-4 py-1 bg-gray-50">
              <p className="font-medium text-gray-900 mb-2">{t.sec3_important}</p>
              <p>
                {t.sec3_text_part1} <strong>{t.sec3_text_bold}</strong> {t.sec3_text_part2}
              </p>
            </div>
          </section>

          {/* 4. მესამე პირები */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4">
              {t.sec4_title}
            </h2>
            <p>{t.sec4_desc}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
              <li><strong>{t.sec4_li1_strong}</strong> {t.sec4_li1_text}</li>
              <li><strong>{t.sec4_li2_strong}</strong> {t.sec4_li2_text}</li>
            </ul>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4">
              {t.sec5_title}
            </h2>
            <p>{t.sec5_desc}</p>
          </section>

          {/* 6. უფლებები */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4">
              {t.sec6_title}
            </h2>
            <p>{t.sec6_desc}</p>
          </section>

           {/* 7. კონტაქტი */}
           <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-black mb-4">
              {t.contact_title}
            </h2>
            <p className="mb-2">{t.contact_desc}</p>
            <p className="font-medium text-black">
              {t.email_label} <a href="mailto:natiatkhelidze.n.t.style@gmail.com" className="hover:underline">natiatkhelidze.n.t.style@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;