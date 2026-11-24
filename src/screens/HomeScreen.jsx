import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const IMAGE_URL = "/blackfriday2026.jpg"; 

// --- საწყისი (გადახაზული) ფასის გამოთვლა 30%-იანი ფასდაკლების მიხედვით ---
const getOriginalPrice = (priceStr) => {
  if (!priceStr) return '';
  const numericValue = parseFloat(priceStr.replace(/[^\d.]/g, ''));
  if (isNaN(numericValue)) return '';
  const original = Math.round(numericValue / 0.7);
  return `${original} ₾`;
};

// --- თარგმანები და სრული მონაცემები ---
const translations = {
  ge: {
    menuHome: "მთავარი",
    menuClothing: "ტანსაცმელი",
    menuAbout: "ბრენდის შესახებ",
    heroTitle: "დღესასწაულები იწყება N.T. STYLE-თან ერთად",
    heroDesc: "დროა შექმნათ თქვენი სადღესასწაულო გარდერობი, შთამბეჭდავი კაბებიდან დაწყებული გამორჩეული აქსესუარებით დამთავრებული.",
    heroBtn: "იხილეთ წვეულების კოლექცია",
    newProductsCount: "11 ახალი პროდუქტი",
    newInTitle: "ახალი დამატებული",
    newInDesc: "ახალი პროდუქცია – აღმოაჩინეთ უახლესი მოდელები ორშაბათიდან პარასკევის ჩათვლით.",
    newInBtn: "იხილეთ სიახლეები",
    products: [
      { name: 'ბეწვის ქურთუკი', description: 'ყავისფერი', slug: 'white-cardigan', image: '/clothes/good/1 17 ბეწვიანი.jpg', price: '229 ₾' },
      { name: 'ყვავილებიანი მოსაცმელი', description: 'თეთრი', slug: 'dark-cardigan', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', price: '129 ₾' },
      { name: 'კოპლებიანი მოსაცმელი', description: 'შავი', slug: 'white-cardigan-2', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', price: '289 ₾' },
      { name: 'ბეწვის ქურთუკი', description: 'შავი', slug: 'leather-ankle', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', price: '229 ₾' },
      { name: 'პალტო', description: 'კრემისფერი', slug: 'new-style', image: '/clothes/good/5 15 პალტო.jpg', price: '229 ₾' },
      { name: 'ბეწვიანი ჟილეტი', description: 'შავი', slug: 'white-cardigan', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', price: '159 ₾' },
      { name: 'ვარდიანი კოსტუმი', description: 'შავი', slug: 'dark-cardigan', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', price: '289 ₾' },
      { name: 'ვარდიანი კოსტუმი', description: 'თეთრი', slug: 'white-cardigan-2', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', price: '289 ₾' },
      { name: 'ბეწვის ქურთუკი', description: 'სერი', slug: 'leather-ankle', image: '/clothes/good/9 ბეწვიანი სერი.jpg', price: '229 ₾' },
      { name: 'ბეწვის ქურთუკი', description: 'შავი', slug: 'new-style', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', price: '229 ₾' },
      { name: 'კოპლებიანი მოსაცმელი', description: 'შავი', slug: 'leather-ankle', image: '/clothes/good/11 16 კოპლებიანი.jpg', price: '289 ₾' },
      { name: 'ბეწვიანი ჟილეტი', description: 'შავი', slug: 'leather-ankle', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg', price: '159 ₾' },
    ],
    coatsTitle: "სეზონის მოდელები",
    shoesTitle: "სიახლეები",
    viewCollection: "იხილეთ კოლექცია",
    viewAll: "იხილეთ სრულად",
    wardrobeTitle: "განაახლეთ თქვენი გარდერობი",
    wardrobeDesc: "შეხვდით ცივ ამინდებს ელეგანტურად: მოდური მოსაცმელები, თბილი ქსოვილები და ყველგანმავალი ჩექმები.",
    knitwearTitle: "ბეწვის ქურთუკი",
    knitwearDesc: "გამორჩეული ბეწვის ქურთუკი – არ გამოტოვოთ სეზონის ტრენდული მოდელები.",
    knitwearBtn: "შეიძინეთ ქსოვილები",
    heelsTitle: "სამეული",
    heelsDesc: "კოსტუმი, შარვალთან და კოპლიან აბრეშუმის ზედასთან ერთად",
    heelsBtn: "შეიძინეთ ახალი კოლექცია",
    statementCoatTitle: "ხელოვნური ბეწვის ჟილეტი",
    statementCoatDesc: "როცა უბრალოება საკმარისი არ არის, აირჩიეთ მოცულობითი ხელოვნური ბეწვი.",
    statementCoatBtn: "შეიძინეთ პალტოები",
    designerTitle: "ნათია თხელიძე: N.T. STYLE-ის სული",
    designerDesc: "ქართველი დიზაინერი, რომელმაც შექმნა ბრენდი საკუთარი ხედვით. ნათია თხელიძე საუბრობს შთაგონებაზე, ელეგანტურობასა და იმაზე, თუ როგორ უნდა დარჩე საკუთარი თავის ერთგული მოდის სამყაროში.",
    designerBtn: "გაიცანით დიზაინერი და ბრენდის ისტორია",
    liveTitle: "N.T. STYLE Live",
    liveDesc: "ნახეთ, რას ყიდულობენ ახლა ყველაზე გემოვნებიანი ქალები მსოფლიოში",
    topStoriesTitle: "მთავარი სიახლეები N.T. STYLE-ზე",
    liveProducts: [
      { brand: 'N.T.style', name: 'ბეწვის ქურთუკი', location: 'თბილისი, GE', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/product/1', price: '229 ₾' },
      { brand: 'N.T.style', name: 'პერანგი', location: 'თბილისი, GE', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', link: '/product/2', price: '129 ₾' },
      { brand: 'N.T.style', name: 'სამეული', location: 'თბილისი, GE', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', link: '/product/3', price: '289 ₾' },
      { brand: 'N.T.style', name: 'ბეწვის ქურთუკი', location: 'თბილისი, GE', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', link: '/product/4', price: '229 ₾' },
      { brand: 'N.T.style', name: 'პალტო', location: 'თბილისი, GE', image: '/clothes/good/5 15 პალტო.jpg', link: '/product/5', price: '229 ₾' },
      { brand: 'N.T.style', name: 'ბეწვიანი ჟილეტი', location: 'თბილისი, GE', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', link: '/product/6', price: '159 ₾' },
      { brand: 'N.T.style', name: 'ვარდიანი კოსტუმი', location: 'თბილისი, GE', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/product/7', price: '289 ₾' }, 
    ],
    topStories: [
      { category: 'შავი', title: 'ვარდიანი კოსტუმი', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/story/1', price: '289 ₾' },
      { category: 'თეთრი', title: 'ვარდიანი კოსტუმი', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', link: '/story/2', price: '289 ₾' },
      { category: 'სერი', title: 'ბეწვის ქურთუკი', image: '/clothes/good/9 ბეწვიანი სერი.jpg', link: '/story/3', price: '229 ₾' },
      { category: 'შავი', title: 'ბეწვის ქურთუკი', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', link: '/story/4', price: '229 ₾' },
      { category: 'სამეული', title: 'კოპლებიანი მოსაცმელი', image: '/clothes/good/11 16 კოპლებიანი.jpg', link: '/story/5', price: '289 ₾' },
    ]
  },
  en: {
    menuHome: "Home",
    menuClothing: "Clothing",
    menuAbout: "About N.T. Style",
    heroTitle: "HOLIDAYS START WITH N.T. STYLE",
    heroDesc: "Time to build your holiday wardrobe, from impressive dresses to standout accessories.",
    heroBtn: "VIEW PARTY EDIT",
    newProductsCount: "11 NEW PRODUCTS",
    newInTitle: "JUST IN",
    newInDesc: "New products – discover the latest models from Monday to Friday.",
    newInBtn: "VIEW WHAT'S NEW",
    products: [
      { name: 'Fur Coat', description: 'Brown', slug: 'white-cardigan', image: '/clothes/good/1 17 ბეწვიანი.jpg', price: '229 ₾' },
      { name: 'Floral Cardigan', description: 'White', slug: 'dark-cardigan', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', price: '129 ₾' },
      { name: 'Polka Dot Cardigan', description: 'Black', slug: 'white-cardigan-2', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', price: '289 ₾' },
      { name: 'Fur Coat', description: 'Black', slug: 'leather-ankle', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', price: '229 ₾' },
      { name: 'Coat', description: 'Beige', slug: 'new-style', image: '/clothes/good/5 15 პალტო.jpg', price: '229 ₾' },
      { name: 'Fur Vest', description: 'Black', slug: 'white-cardigan', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', price: '159 ₾' },
      { name: 'Rose Suit', description: 'Black', slug: 'dark-cardigan', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', price: '289 ₾' },
      { name: 'Rose Suit', description: 'White', slug: 'white-cardigan-2', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', price: '289 ₾' },
      { name: 'Fur Coat', description: 'Grey', slug: 'leather-ankle', image: '/clothes/good/9 ბეწვიანი სერი.jpg', price: '229 ₾' },
      { name: 'Fur Coat', description: 'Black', slug: 'new-style', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', price: '229 ₾' },
      { name: 'Polka Dot Cardigan', description: 'Black', slug: 'leather-ankle', image: '/clothes/good/11 16 კოპლებიანი.jpg', price: '289 ₾' },
      { name: 'Fur Vest', description: 'Black', slug: 'leather-ankle', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg', price: '159 ₾' },
    ],
    coatsTitle: "SEASON'S MODELS",
    shoesTitle: "NEW ARRIVALS",
    viewCollection: "VIEW COLLECTION",
    viewAll: "VIEW ALL",
    wardrobeTitle: "REFRESH YOUR WARDROBE",
    wardrobeDesc: "Face the cold weather elegantly: stylish outerwear, warm knits, and all-terrain boots.",
    knitwearTitle: "FUR COAT",
    knitwearDesc: "Standout fur coat – don't miss this season's trending models.",
    knitwearBtn: "SHOP KNITWEAR",
    heelsTitle: "THREE-PIECE SET",
    heelsDesc: "Blazer paired with trousers and a polka-dot silk top",
    heelsBtn: "SHOP NEW COLLECTION",
    statementCoatTitle: "FAUX FUR VEST",
    statementCoatDesc: "When simplicity simply won't do, reach for voluminous faux fur.",
    statementCoatBtn: "SHOP COATS",
    designerTitle: "NATIA TKHELIDZE: THE SOUL OF N.T. STYLE",
    designerDesc: "The Georgian designer who built the brand with her unique vision. Natia Tkhelidze talks about inspiration, elegance, and staying true to oneself in the world of fashion.",
    designerBtn: "MEET THE DESIGNER AND BRAND STORY",
    liveTitle: "N.T. STYLE Live",
    liveDesc: "See what the world's most stylish women are buying right now",
    topStoriesTitle: "TOP STORIES ON N.T. STYLE",
    liveProducts: [
      { brand: 'N.T.style', name: 'Fur Coat', location: 'Tbilisi, GE', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/product/1', price: '229 ₾' },
      { brand: 'N.T.style', name: 'Shirt', location: 'Tbilisi, GE', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', link: '/product/2', price: '129 ₾' },
      { brand: 'N.T.style', name: 'Three-Piece Set', location: 'Tbilisi, GE', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', link: '/product/3', price: '289 ₾' },
      { brand: 'N.T.style', name: 'Fur Coat', location: 'Tbilisi, GE', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', link: '/product/4', price: '229 ₾' },
      { brand: 'N.T.style', name: 'Coat', location: 'Tbilisi, GE', image: '/clothes/good/5 15 პალტო.jpg', link: '/product/5', price: '229 ₾' },
      { brand: 'N.T.style', name: 'Fur Vest', location: 'Tbilisi, GE', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', link: '/product/6', price: '159 ₾' },
      { brand: 'N.T.style', name: 'Rose Suit', location: 'Tbilisi, GE', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/product/7', price: '289 ₾' },
    ],
    topStories: [
      { category: 'BLACK', title: 'Rose Suit', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/story/1', price: '289 ₾' },
      { category: 'WHITE', title: 'Rose Suit', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', link: '/story/2', price: '289 ₾' },
      { category: 'GREY', title: 'Fur Coat', image: '/clothes/good/9 ბეწვიანი სერი.jpg', link: '/story/3', price: '229 ₾' },
      { category: 'BLACK', title: 'Fur Coat', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', link: '/story/4', price: '229 ₾' },
      { category: 'THREE-PIECE SET', title: 'Polka Dot Cardigan', image: '/clothes/good/11 16 კოპლებიანი.jpg', link: '/story/5', price: '289 ₾' },
    ]
  },
  ru: {
    menuHome: "Главная",
    menuClothing: "Одежда",
    menuAbout: "О бренде",
    heroTitle: "ПРАЗДНИКИ НАЧИНАЮТСЯ С N.T. STYLE",
    heroDesc: "Время создать свой праздничный гардероб, от впечатляющих платьев до выдающихся аксессуаров.",
    heroBtn: "СМОТРЕТЬ ВЕЧЕРНЮЮ КОЛЛЕКЦИЮ",
    newProductsCount: "11 НОВЫХ ТОВАРОВ",
    newInTitle: "НОВЫЕ ПОСТУПЛЕНИЯ",
    newInDesc: "Новые товары – открывайте для себя новейшие модели с понедельника по пятницу.",
    newInBtn: "СМОТРЕТЬ НОВИНКИ",
    products: [
      { name: 'Шуба', description: 'Коричневый', slug: 'white-cardigan', image: '/clothes/good/1 17 ბეწვიანი.jpg', price: '229 ₾' },
      { name: 'Цветочный кардиган', description: 'Белый', slug: 'dark-cardigan', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', price: '129 ₾' },
      { name: 'Кардиган в горошек', description: 'Черный', slug: 'white-cardigan-2', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', price: '289 ₾' },
      { name: 'Шуба', description: 'Черный', slug: 'leather-ankle', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', price: '229 ₾' },
      { name: 'Пальто', description: 'Бежевый', slug: 'new-style', image: '/clothes/good/5 15 პალტო.jpg', price: '229 ₾' },
      { name: 'Меховой жилет', description: 'Черный', slug: 'white-cardigan', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', price: '159 ₾' },
      { name: 'Костюм с розами', description: 'Черный', slug: 'dark-cardigan', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', price: '289 ₾' },
      { name: 'Костюм с розами', description: 'Белый', slug: 'white-cardigan-2', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', price: '289 ₾' },
      { name: 'Шуба', description: 'Серый', slug: 'leather-ankle', image: '/clothes/good/9 ბეწვიანი სერი.jpg', price: '229 ₾' },
      { name: 'Шуба', description: 'Черный', slug: 'new-style', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', price: '229 ₾' },
      { name: 'Кардиган в горошек', description: 'Черный', slug: 'leather-ankle', image: '/clothes/good/11 16 კოპლებიანი.jpg', price: '289 ₾' },
      { name: 'Меховой жилет', description: 'Черный', slug: 'leather-ankle', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg', price: '159 ₾' },
    ],
    coatsTitle: "МОДЕЛИ СЕЗОНА",
    shoesTitle: "НОВИНКИ",
    viewCollection: "СМОТРЕТЬ КОЛЛЕКЦИЮ",
    viewAll: "СМОТРЕТЬ ВСЕ",
    wardrobeTitle: "ОБНОВИТЕ СВОЙ ГАРДЕРОБ",
    wardrobeDesc: "Встречайте холодную погоду элегантно: стильная верхняя одежда, теплый трикотаж и вездеходные ботинки.",
    knitwearTitle: "ШУБА",
    knitwearDesc: "Эксклюзивная шуба – не пропустите трендовые модели этого сезона.",
    knitwearBtn: "КУПИТЬ ТРИКОТАЖ",
    heelsTitle: "КОСТЮМ-ТРОЙКА",
    heelsDesc: "Пиджак в сочетании с брюками и шелковым топом в горошек",
    heelsBtn: "КУПИТЬ НОВУЮ КОЛЛЕКЦИЮ",
    statementCoatTitle: "ЖИЛЕТ ИЗ ИСКУССТВЕННОГО МЕХА",
    statementCoatDesc: "Когда простоты недостаточно, выбирайте объемный искусственный мех.",
    statementCoatBtn: "КУПИТЬ ПАЛЬТО",
    designerTitle: "НАТИЯ ТХЕЛИДЗЕ: ДУША N.T. STYLE",
    designerDesc: "Грузинский дизайнер, создавший бренд со своим уникальным видением. Натия Тхелидзе рассказывает о вдохновении, элегантности и о том, как оставаться верной себе в мире моды.",
    designerBtn: "ПОЗНАКОМЬТЕСЬ С ДИЗАЙНЕРОМ И ИСТОРИЕЙ БРЕНДА",
    liveTitle: "N.T. STYLE Live",
    liveDesc: "Посмотрите, что сейчас покупают самые стильные женщины мира",
    topStoriesTitle: "ГЛАВНЫЕ НОВОСТИ НА N.T. STYLE",
    liveProducts: [
      { brand: 'N.T.style', name: 'Шуба', location: 'Тбилиси, GE', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/product/1', price: '229 ₾' },
      { brand: 'N.T.style', name: 'Рубашка', location: 'Тбилиси, GE', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', link: '/product/2', price: '129 ₾' },
      { brand: 'N.T.style', name: 'Костюм-тройка', location: 'Тбилиси, GE', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', link: '/product/3', price: '289 ₾' },
      { brand: 'N.T.style', name: 'Шуба', location: 'Тбилиси, GE', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', link: '/product/4', price: '229 ₾' },
      { brand: 'N.T.style', name: 'Пальто', location: 'Тбилиси, GE', image: '/clothes/good/5 15 პალტო.jpg', link: '/product/5', price: '229 ₾' },
      { brand: 'N.T.style', name: 'Меховой жилет', location: 'Тбилиси, GE', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', link: '/product/6', price: '159 ₾' },
      { brand: 'N.T.style', name: 'Костюм с розами', location: 'Тбилиси, GE', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/product/7', price: '289 ₾' },
    ],
    topStories: [
      { category: 'ЧЕРНЫЙ', title: 'Костюм с розами', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/story/1', price: '289 ₾' },
      { category: 'БЕЛЫЙ', title: 'Костюм с розами', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', link: '/story/2', price: '289 ₾' },
      { category: 'СЕРЫЙ', title: 'Шуба', image: '/clothes/good/9 ბეწვიანი სერი.jpg', link: '/story/3', price: '229 ₾' },
      { category: 'ЧЕРНЫЙ', title: 'Шуба', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', link: '/story/4', price: '229 ₾' },
      { category: 'КОСТЮМ-ТРОЙКА', title: 'Кардиган в горошек', image: '/clothes/good/11 16 კოპლებიანი.jpg', link: '/story/5', price: '289 ₾' },
    ]
  }
};

const porterStories = [
  { id: 1, image: '/clothes/good/1 17 ბეწვიანი.jpg', title: 'Summer Vibes' },
  { id: 2, image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', title: 'Autumn Collection' },
  { id: 3, image: '/clothes/good/3 16-2 კოპლებიანი.jpg', title: 'Winter Essentials' },
  { id: 4, image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', title: 'Elegant Style' },
];

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

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

// --- Custom Smooth Scroll Function ---
const smoothScrollTo = (element, targetScrollLeft, duration) => {
  const startScrollLeft = element.scrollLeft;
  const distance = targetScrollLeft - startScrollLeft;
  let startTime = null;

  const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    element.scrollLeft = startScrollLeft + distance * easeInOutQuad(progress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
};

const HomeScreen = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['ge'];

  const scrollContainerRef = useRef(null);
  const liveScrollRef = useRef(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const editorialData = [
    {
      title: t.knitwearTitle,
      description: t.knitwearDesc,
      linkText: t.knitwearBtn,
      image: "/clothes/good/10 17 ბეწვიანი შავი.jpg",
      link: "/category/knitwear"
    },
    {
      title: t.heelsTitle,
      description: t.heelsDesc,
      linkText: t.heelsBtn,
      image: "/clothes/good/11 16 კოპლებიანი.jpg",
      link: "/category/heels"
    },
    {
      title: t.statementCoatTitle,
      description: t.statementCoatDesc,
      linkText: t.statementCoatBtn,
      image: "/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg",
      link: "/category/coats"
    }
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 50) {
        smoothScrollTo(el, 0, 1500); 
      } else {
        smoothScrollTo(el, el.scrollLeft + 300, 1500); 
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const liveElement = liveScrollRef.current;

    const intervalId = setInterval(() => {
      const elements = [liveElement];
      
      elements.forEach(el => {
        if (!el) return;
        
        const visibleItems = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 4 : window.innerWidth >= 640 ? 3 : 2;
        const scrollAmount = el.offsetWidth / visibleItems; 

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0; 
          requestAnimationFrame(() => {
            smoothScrollTo(el, scrollAmount, 1500); 
          });
        } else {
          smoothScrollTo(el, el.scrollLeft + scrollAmount, 1500);
        }
      });
    }, 3000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* --- მობილური ჰედერი ბურგერ მენიუთი (მხოლოდ მობილურზე) --- */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          className="text-black p-1 focus:outline-none"
        >
          <BurgerIcon />
        </button>
        <Link to="/" className="text-lg font-serif tracking-widest uppercase text-black">
          N.T. STYLE
        </Link>
        <div className="w-8" />
      </div>

      {/* --- მობილური ბურგერ მენიუს პანელი (Drawer) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col p-6 z-10">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <span className="text-lg font-serif tracking-widest uppercase text-black">
                N.T. STYLE
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="text-black p-1"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col space-y-5">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-semibold text-gray-900 hover:text-gray-500"
              >
                {t.menuHome}
              </Link>
              <Link
                to="/category/clothing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-bold text-black border-b border-gray-100 pb-3 hover:text-gray-600"
              >
                {t.menuClothing}
              </Link>
              <Link
                to="/category/aboutNT"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-semibold text-gray-900 hover:text-gray-500"
              >
                {t.menuAbout}
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* --- 1. Hero Section --- */}
      <section className="relative h-[75vh] md:h-[calc(100vh-160px)] w-full overflow-hidden bg-black">
        <img
          src={IMAGE_URL}
          alt="Black Friday Offer"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
          style={{ filter: 'brightness(0.8)' }}
        />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 text-white">
          <div className="inline-block max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif uppercase tracking-wider leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-3 md:mt-4 text-xs sm:text-sm">
              {t.heroDesc}
            </p>
            <div className="mt-6 md:mt-8 flex space-x-4">
              <Link to="/category/clothing" className="bg-white text-black uppercase tracking-widest font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 hover:bg-gray-200 transition duration-300">
                {t.heroBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. "New In" Carousel (-30% Sale) --- */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/4 flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">{t.newProductsCount}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif my-3 md:my-4 uppercase" dangerouslySetInnerHTML={{ __html: t.newInTitle.replace(' ', '<br/>') }}></h2>
            <p className="text-sm text-gray-700 mb-6 md:mb-8 leading-relaxed">
              {t.newInDesc}
            </p>
            <Link to="/category/clothing" className="inline-block bg-black text-white uppercase tracking-widest font-bold text-xs px-8 py-4 hover:bg-gray-800 transition duration-300 w-fit">
              {t.newInBtn}
            </Link>
          </div>
          <div className="w-full lg:w-3/4 relative group">
            <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 md:gap-6 scrollbar-hide pb-4">
              {t.products.map((product, index) => (
                <Link to={`/product/${product.slug}`} key={index} className="group/item cursor-pointer block text-center w-[70%] sm:w-[40%] lg:w-[22%] flex-shrink-0">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[11px] font-bold tracking-wider px-2.5 py-1 shadow-sm">
                      -30%
                    </span>
                    <img src={product.image} alt={product.name} className="w-full h-[280px] sm:h-[320px] md:h-[350px] object-cover object-top transition duration-700 group-hover/item:scale-105" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                  {product.price && (
                    <div className="flex items-center justify-center gap-2 mt-1.5">
                      <span className="text-xs text-gray-400 line-through">
                        {getOriginalPrice(product.price)}
                      </span>
                      <span className="text-sm font-bold text-red-600">
                        {product.price}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <button onClick={scrollRight} className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-white">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* --- 3. Large Banners --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white mb-16 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link to="/category/clothing" className="relative h-[450px] sm:h-[550px] lg:h-[700px] w-full overflow-hidden group">
            <img src="/clothes/8.jpg" alt="Coats" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-8 left-6 md:bottom-16 md:left-10 p-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif uppercase tracking-wider drop-shadow-md ">{t.coatsTitle}</h3>
              <p className="text-xs sm:text-sm uppercase tracking-widest mt-2 hover:underline drop-shadow-md">{t.viewCollection}</p>
            </div>
          </Link>
          <Link to="/category/clothing" className="relative h-[450px] sm:h-[550px] lg:h-[700px] w-full overflow-hidden group">
            <img src="/clothes/9.jpg" alt="Shoes" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-8 left-6 md:bottom-16 md:left-10 p-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif uppercase tracking-wider drop-shadow-md">{t.shoesTitle}</h3>
              <p className="text-xs sm:text-sm uppercase tracking-widest mt-2 hover:underline drop-shadow-md">{t.viewAll}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* --- 4. Full Width Banner --- */}
      <section className="w-full h-[500px] md:h-[800px] relative mb-16 md:mb-32 overflow-hidden group">
        <img
          src="/clothes/12.jpg"
          alt="Full Width Banner"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 p-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 md:mb-6 tracking-wide drop-shadow-lg uppercase">
            {t.wardrobeTitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mb-6 md:mb-8 drop-shadow-md">
            {t.wardrobeDesc}
          </p>
          <Link to="/category/clothing" className="bg-white text-black uppercase tracking-widest font-bold text-xs sm:text-sm px-8 sm:px-10 py-3 sm:py-4 hover:bg-gray-200 transition duration-300">
            {t.viewCollection}
          </Link>
        </div>
      </section>

      {/* --- 5. Editorial Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editorialData.map((item, index) => (
            <Link to={item.link} key={index} className="group cursor-pointer block">
              <div className="relative overflow-hidden mb-4 md:mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[380px] sm:h-[450px] md:h-[500px] object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-medium mb-2 md:mb-3 group-hover:text-gray-700 transition uppercase">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {item.description}
              </p>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
                {item.linkText}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- 6. 5-Images Accordion --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative mt-20 md:mt-40">
        <div className="absolute -top-10 sm:-top-16 md:-top-24 left-4 md:left-15 z-20 pointer-events-none flex justify-start">
          <h2 className="text-[3.5rem] sm:text-[5rem] md:text-[10rem] font-serif leading-none text-gray-200">
            N.T.Style
          </h2>
        </div>
        <div className="flex flex-col md:flex-row w-full h-[550px] md:h-[600px] gap-0 overflow-hidden relative z-10">
          {porterStories.map((story, index) => (
            <div
              key={story.id}
              className={`relative w-full md:h-full transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
                        ${activeStoryIndex === index ? 'flex-[3]' : 'flex-[1]'}
                      `}
              onMouseEnter={() => setActiveStoryIndex(index)}
              onClick={() => setActiveStoryIndex(index)}
            >
              <img
                src={story.image}
                alt={story.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className={`absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white transition-opacity duration-500 ${activeStoryIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <p className="tracking-widest text-xs md:text-sm mb-1 md:mb-2 drop-shadow-md">N.T.Style</p>
                <h3 className="text-xl md:text-3xl font-serif drop-shadow-md uppercase">{story.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start mt-8 md:mt-12 border-t border-gray-200 pt-6 md:pt-8 gap-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 md:mb-4 uppercase">
              {t.designerTitle}
            </h2>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-base md:text-lg text-gray-700 font-serif leading-relaxed mb-6">
              {t.designerDesc}
            </p>
            <Link to="/category/aboutNT" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
              {t.designerBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* --- 7. Live & Top Stories (-30% Sale Section) --- */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-serif tracking-wide uppercase">
              {t.liveTitle}
            </h2>
            <p className="text-[11px] md:text-xs uppercase tracking-widest text-gray-500 mt-2 md:mt-3">
              {t.liveDesc}
            </p>
          </div>

          <div 
            ref={liveScrollRef} 
            className="flex overflow-x-hidden whitespace-nowrap -mx-2 mb-12 md:mb-16 scrollbar-hide"
          >
            {[...t.liveProducts, ...t.liveProducts, ...t.liveProducts].map((item, idx) => (
              <Link to={item.link} key={`live-${idx}`} className="group cursor-pointer inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex-shrink-0 px-2 sm:px-4 text-center relative">
                
                <div className="relative mb-3 md:mb-4 flex justify-center items-center h-48 sm:h-56 md:h-64 overflow-hidden bg-white">
                  <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] sm:text-[11px] font-bold tracking-wider px-2 sm:px-2.5 py-1 shadow-sm">
                    -30%
                  </span>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-contain mix-blend-multiply transition-opacity duration-700 group-hover:opacity-75" 
                  />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-gray-900">{item.brand}</p>
                <p className="text-xs sm:text-sm font-serif mb-1 text-gray-800 whitespace-normal">{item.name}</p>
                
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 line-through">
                    {getOriginalPrice(item.price)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-red-600">
                    {item.price}
                  </span>
                </div>

                {item.action && <p className="text-[11px] italic text-gray-500 mb-1">{item.action}</p>}
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{item.location}</p>
              </Link>
            ))}
          </div>

          <div className="w-full border-t border-gray-200 my-10 md:my-16"></div>

          <div className="mb-8 md:mb-10">
            <h3 className="text-[11px] tracking-[0.2em] text-gray-800 uppercase font-semibold text-center sm:text-left">
              {t.topStoriesTitle}
            </h3>
          </div>

          <div className="flex overflow-x-auto whitespace-nowrap -mx-2 scrollbar-hide">
            {[...t.topStories, ...t.topStories, ...t.topStories].map((story, idx) => (
              <Link to={story.link} key={`story-${idx}`} className="inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex-shrink-0 px-2 sm:px-4 cursor-pointer group">
                <div className="relative overflow-hidden mb-3 md:mb-4 aspect-[3/4] w-full">
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-600 text-white text-[10px] sm:text-[11px] font-bold tracking-wider px-2 sm:px-2.5 py-1 shadow-sm">
                    -30%
                  </span>
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-75" 
                  />
                </div>
                <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1 font-semibold">
                  {story.category}
                </p>
                <h4 className="text-[13px] sm:text-[14px] font-serif text-gray-900 leading-snug whitespace-normal mb-1.5">
                  {story.title}
                </h4>
                {story.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 line-through">
                      {getOriginalPrice(story.price)}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-red-600">
                      {story.price}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeScreen;