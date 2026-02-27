import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Cookie პოლიტიკა | N.T.Style</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">Cookie (ქუქი) ფაილების პოლიტიკა</h1>
      <div className="space-y-4 text-gray-700">
        <p>ჩვენი ვებ-გვერდი იყენებს Cookie ფაილებს მომსახურების გასაუმჯობესებლად.</p>
        <h3 className="text-xl font-semibold">რა არის Cookie?</h3>
        <p>ეს არის მცირე ზომის ტექსტური ფაილები, რომლებიც ინახება თქვენს მოწყობილობაში საიტზე სტუმრობისას. ისინი გვეხმარება დავიმახსოვროთ თქვენი არჩევანი (მაგალითად: ენა, კალათის შიგთავსი).</p>
        <h3 className="text-xl font-semibold">როგორ ვმართოთ ისინი?</h3>
        <p>თქვენ შეგიძლიათ ნებისმიერ დროს წაშალოთ ან დაბლოკოთ ქუქი ფაილები თქვენი ბრაუზერის პარამეტრებიდან, თუმცა ამან შესაძლოა შეაფერხოს საიტის გამართული მუშაობა.</p>
      </div>
    </div>
  );
};

export default CookiePage;