import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const IMAGE_URL = "/blackfriday2026.jpg"; 

// --- თარგმანები და სრული მონაცემები ---
const translations = {
  ge: {
    heroTitle: "დღესასწაულები იწყება N.T. STYLE-თან ერთად",
    heroDesc: "დროა შექმნათ თქვენი სადღესასწაულო გარდერობი, შთამბეჭდავი კაბებიდან დაწყებული გამორჩეული აქსესუარებით დამთავრებული.",
    heroBtn: "იხილეთ წვეულების კოლექცია",
    newProductsCount: "11 ახალი პროდუქტი",
    newInTitle: "ახალი დამატებული",
    newInDesc: "ახალი პროდუქცია – აღმოაჩინეთ უახლესი მოდელები ორშაბათიდან პარასკევის ჩათვლით.",
    newInBtn: "იხილეთ სიახლეები",
    products: [
      { name: 'ბეწვის ქურთუკი', description: 'ყავისფერი', slug: 'white-cardigan', image: '/clothes/good/1 17 ბეწვიანი.jpg' },
      { name: 'ყვავილებიანი მოსაცმელი', description: 'თეთრი', slug: 'dark-cardigan', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg' },
      { name: 'კოპლებიანი მოსაცმელი', description: 'შავი', slug: 'white-cardigan-2', image: '/clothes/good/3 16-2 კოპლებიანი.jpg' },
      { name: 'ბეწვის ქურთუკი', description: 'შავი', slug: 'leather-ankle', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg' },
      { name: 'პალტო', description: 'კრემისფერი', slug: 'new-style', image: '/clothes/good/5 15 პალტო.jpg' },
      { name: 'ბეწვიანი ჟილეტი', description: 'შავი', slug: 'white-cardigan', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg' },
      { name: 'ვარდიანი კოსტუმი', description: 'შავი', slug: 'dark-cardigan', image: '/clothes/good/7 16 ვარდიანი შავი.jpg' },
      { name: 'ვარდიანი კოსტუმი', description: 'თეთრი', slug: 'white-cardigan-2', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg' },
      { name: 'ბეწვის ქურთუკი', description: 'სერი', slug: 'leather-ankle', image: '/clothes/good/9 ბეწვიანი სერი.jpg' },
      { name: 'ბეწვის ქურთუკი', description: 'შავი', slug: 'new-style', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg' },
      { name: 'კოპლებიანი მოსაცმელი', description: 'შავი', slug: 'leather-ankle', image: '/clothes/good/11 16 კოპლებიანი.jpg' },
      { name: 'ბეწვიანი ჟილეტი', description: 'შავი', slug: 'leather-ankle', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg' },
    ],
    coatsTitle: "სეზონის მოდელები",
    shoesTitle: "სიახლეები",
    viewCollection: "იხილეთ კოლექცია",
    viewAll: "იხილეთ სრულად",
    wardrobeTitle: "განაახლეთ თქვენი გარდერობი",
    wardrobeDesc: "შეხვდით ცივ ამინდებს ელეგანტურად: მოდური მოსაცმელები, თბილი ქსოვილები და ყველგანმავალი ჩექმები.",
    knitwearTitle: "ბეწვის ქურთუკი", /* შეცვლილი */
    knitwearDesc: "გამორჩეული ბეწვის ქურთუკი – არ გამოტოვოთ სეზონის ტრენდული მოდელები.", /* შეცვლილი */
    knitwearBtn: "შეიძინეთ ქსოვილები",
    heelsTitle: "სამეული", /* შეცვლილი */
    heelsDesc: "კოსტუმი, შარვალთან და კოპლიან აბრეშუმის ზედასთან ერთად",
    heelsBtn: "შეიძინეთ ახალი კოლექცია",
    statementCoatTitle: "ხელოვნური ბეწვის ჟილეტი", /* შეცვლილია */
    statementCoatDesc: "როცა უბრალოება საკმარისი არ არის, აირჩიეთ მოცულობითი ხელოვნური ბეწვი.",
    statementCoatBtn: "შეიძინეთ პალტოები",
    designerTitle: "ნათია თხელიძე: N.T. STYLE-ის სული",
    designerDesc: "ქართველი დიზაინერი, რომელმაც შექმნა ბრენდი საკუთარი ხედვით. ნათია თხელიძე საუბრობს შთაგონებაზე, ელეგანტურობასა და იმაზე, თუ როგორ უნდა დარჩე საკუთარი თავის ერთგული მოდის სამყაროში.",
    designerBtn: "გაიცანით დიზაინერი და ბრენდის ისტორია",
    liveTitle: "N.T. STYLE Live",
    liveDesc: "ნახეთ, რას ყიდულობენ ახლა ყველაზე გემოვნებიანი ქალები მსოფლიოში",
    topStoriesTitle: "მთავარი სიახლეები N.T. STYLE-ზე",
    liveProducts: [
      { brand: 'GOLDEN GOOSE', name: 'ჰეილი', location: 'თბილისი, GE', action: 'დაემატა სურვილებში', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/product/1', price: '₾ 250' },
      { brand: 'BALENCIAGA', name: 'ნიკოლა', location: 'ბათუმი, GE', action: 'დაემატა სურვილებში', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', link: '/product/2', price: '₾ 180' },
      { brand: 'ZIMMERMANN', name: 'ბიანკა', location: 'ქუთაისი, GE', action: 'დაემატა სურვილებში', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', link: '/product/3', price: '₾ 320' },
      { brand: 'TOTEME', name: 'ანა', location: 'რუსთავი, GE', action: 'დაემატა კალათაში', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', link: '/product/4', price: '₾ 210' },
      { brand: 'AFLALO', name: 'რაღად', location: 'გორი, GE', action: 'დაემატა კალათაში', image: '/clothes/good/5 15 პალტო.jpg', link: '/product/5', price: '₾ 450' },
      { brand: 'LIBEROWE', name: 'ლიზა', location: 'თბილისი, GE', action: 'დაემატა სურვილებში', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', link: '/product/6', price: '₾ 150' },
      { brand: 'SAINT LAURENT', name: 'მარმონტი', location: 'ბათუმი, GE', action: 'დაემატა კალათაში', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/product/7', price: '₾ 290' }, 
    ],
    topStories: [
      { category: 'მოდა', title: 'კაბების გზამკვლევი ყველა სიტუაციისთვის', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/story/1' },
      { category: 'მოდა', title: '5 დენიმის ტრენდი, რომელიც უნდა იცოდეთ', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', link: '/story/2' },
      { category: 'მოდა', title: 'ყველაზე მოთხოვნადი: ბრწყინვალების დროა', image: '/clothes/good/9 ბეწვიანი სერი.jpg', link: '/story/3' },
      { category: 'მოდა', title: 'ტრენდშია: მაღალყელიანი ჩექმები', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', link: '/story/4' },
      { category: 'მოდა', title: 'საუკეთესო საჩუქრების გზამკვლევი', image: '/clothes/good/11 16 კოპლებიანი.jpg', link: '/story/5' },
      { category: 'მოგზაურობა', title: 'ევროპის საუკეთესო სათხილამურო კურორტები', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg', link: '/story/6' },
      { category: 'მოდა', title: 'ზამთრის აქსესუარები, რომლებიც აუცილებლად უნდა გქონდეთ', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/story/7' },
    ]
  },
  en: {
    heroTitle: "HOLIDAYS START WITH N.T. STYLE",
    heroDesc: "Time to build your holiday wardrobe, from impressive dresses to standout accessories.",
    heroBtn: "VIEW PARTY EDIT",
    newProductsCount: "11 NEW PRODUCTS",
    newInTitle: "JUST IN",
    newInDesc: "New products five times a week – discover the latest models from Monday to Friday.",
    newInBtn: "VIEW WHAT'S NEW",
    products: [
      { name: 'White Cardigan', description: 'Le 5 à 7 leather shoulder', slug: 'white-cardigan', image: '/clothes/good/1 17 ბეწვიანი.jpg' },
      { name: 'Dark Cardigan', description: 'Fringed checked cashmere scarf', slug: 'dark-cardigan', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg' },
      { name: 'White Cardigan', description: 'Le 5 à 7 leather shoulder', slug: 'white-cardigan-2', image: '/clothes/good/3 16-2 კოპლებიანი.jpg' },
      { name: 'Dark Cardigan', description: 'Leather ankle boots', slug: 'leather-ankle', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg' },
      { name: 'New Style', description: 'Leather ankle boots', slug: 'new-style', image: '/clothes/good/5 15 პალტო.jpg' },
    ],
    coatsTitle: "SEASON'S COATS",
    shoesTitle: "SHOES",
    viewCollection: "VIEW COLLECTION",
    viewAll: "VIEW ALL",
    wardrobeTitle: "REFRESH YOUR WARDROBE",
    wardrobeDesc: "Face the cold weather elegantly: stylish outerwear, warm knits, and all-terrain boots.",
    knitwearTitle: "NEED-TO-KNOW KNITS",
    knitwearDesc: "Embrace knitwear with a twist – don't miss this season's exaggerated cuffs and tactile textures.",
    knitwearBtn: "SHOP KNITWEAR",
    heelsTitle: "THE HIGH-IMPACT HEEL",
    heelsDesc: "Elevate your party looks with our pick of striking slingbacks and other dancing duos.",
    heelsBtn: "SHOP HEELS",
    statementCoatTitle: "THE STATEMENT COAT",
    statementCoatDesc: "When subtlety simply won't do, reach for voluminous shearling and plush faux fur.",
    statementCoatBtn: "SHOP COATS",
    designerTitle: "NATIA TKHELIDZE: THE SOUL OF N.T. STYLE",
    designerDesc: "The Georgian designer who built the brand with her unique vision. Natia Tkhelidze talks about inspiration, elegance, and staying true to oneself in the world of fashion.",
    designerBtn: "MEET THE DESIGNER AND BRAND STORY",
    liveTitle: "N.T. STYLE Live",
    liveDesc: "Showcasing what the world's most stylish women are buying right now",
    topStoriesTitle: "TOP STORIES ON N.T. STYLE",
    liveProducts: [
      { brand: 'GOLDEN GOOSE', name: 'Hayley', location: 'CROYDON, GB', action: 'Added to Wish List', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/product/1', price: '$ 95' },
      { brand: 'BALENCIAGA', name: 'Nicola', location: 'BRISTOL, GB', action: 'Added to Wish List', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', link: '/product/2', price: '$ 75' },
      { brand: 'ZIMMERMANN', name: 'Bianca', location: 'SYDNEY, AU', action: 'Added to Wish List', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', link: '/product/3', price: '$ 120' },
      { brand: 'TOTEME', name: 'Ana', location: 'LARCHMONT, US', action: 'Added to Bag', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', link: '/product/4', price: '$ 80' },
      { brand: 'AFLALO', name: 'Raghad', location: 'KUWAIT, KW', action: 'Added to Bag', image: '/clothes/good/5 15 პალტო.jpg', link: '/product/5', price: '$ 150' },
      { brand: 'LIBEROWE', name: 'Lisa', location: 'MANCHESTER, GB', action: 'Added to Wish List', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', link: '/product/6', price: '$ 60' },
      { brand: 'SAINT LAURENT', name: 'Marmont', location: 'LONDON, GB', action: 'Added to Bag', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/product/7', price: '$ 110' },
    ],
    topStories: [
      { category: 'FASHION', title: 'The dress guide for every occasion', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/story/1' },
      { category: 'FASHION', title: '5 denim trends to know now', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', link: '/story/2' },
      { category: 'FASHION', title: 'Most Wanted: time to shine', image: '/clothes/good/9 ბეწვიანი სერი.jpg', link: '/story/3' },
      { category: 'FASHION', title: 'Trending Now: over-the-knee boots', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', link: '/story/4' },
      { category: 'FASHION', title: 'The ultimate holiday gift guide', image: '/clothes/good/11 16 კოპლებიანი.jpg', link: '/story/5' },
      { category: 'TRAVEL', title: 'In the know: Europe’s chicest ski escapes', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg', link: '/story/6' },
      { category: 'FASHION', title: 'Winter accessories you must have', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/story/7' },
    ]
  },
  ru: {
    heroTitle: "ПРАЗДНИКИ НАЧИНАЮТСЯ С N.T. STYLE",
    heroDesc: "Время создать свой праздничный гардероб, от впечатляющих платьев до выдающихся аксессуаров.",
    heroBtn: "СМОТРЕТЬ ВЕЧЕРНЮЮ КОЛЛЕКЦИЮ",
    newProductsCount: "11 НОВЫЙ ТОВАР",
    newInTitle: "ТОЛЬКО ЧТО ПОСТУПИЛО",
    newInDesc: "Новые товары пять раз в неделю – открывайте для себя новейшие модели с понедельника по пятницу.",
    newInBtn: "СМОТРЕТЬ НОВИНКИ",
    products: [
      { name: 'Белый кардиган', description: 'Кожаная сумка на плечо', slug: 'white-cardigan', image: '/clothes/good/1 17 ბეწვიანი.jpg' },
      { name: 'Темный кардиган', description: 'Кашемировый шарф в клетку', slug: 'dark-cardigan', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg' },
      { name: 'Белый кардиган', description: 'Кожаная сумка на плечо', slug: 'white-cardigan-2', image: '/clothes/good/3 16-2 კოპლებიანი.jpg' },
      { name: 'Темный кардиган', description: 'Кожаные ботильоны', slug: 'leather-ankle', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg' },
      { name: 'Новый стиль', description: 'Кожаные ботильоны', slug: 'new-style', image: '/clothes/good/5 15 პალტო.jpg' },
    ],
    coatsTitle: "ПАЛЬТО СЕЗОНА",
    shoesTitle: "ОБУВЬ",
    viewCollection: "СМОТРЕТЬ КОЛЛЕКЦИЮ",
    viewAll: "СМОТРЕТЬ ВСЕ",
    wardrobeTitle: "ОБНОВИТЕ СВОЙ ГАРДЕРОБ",
    wardrobeDesc: "Встречайте холодную погоду элегантно: стильная верхняя одежда, теплый трикотаж и вездеходные ботинки.",
    knitwearTitle: "ТРИКОТАЖ СЕЗОНА",
    knitwearDesc: "Откройте для себя необычный трикотаж – не пропустите трендовые текстуры этого сезона.",
    knitwearBtn: "КУПИТЬ ТРИКОТАЖ",
    heelsTitle: "ЭФФЕКТНЫЕ КАБЛУКИ",
    heelsDesc: "Дополните свой праздничный образ нашей подборкой потрясающих туфель.",
    heelsBtn: "КУПИТЬ ТУФЛИ",
    statementCoatTitle: "АКЦЕНТНОЕ ПАЛЬТО",
    statementCoatDesc: "Когда простоты недостаточно, выбирайте объемный искусственный мех.",
    statementCoatBtn: "КУПИТЬ ПАЛЬТО",
    designerTitle: "НАТИЯ ТХЕЛИДЗЕ: ДУША N.T. STYLE",
    designerDesc: "Грузинский дизайнер, создавший бренд со своим уникальным видением.",
    designerBtn: "ПОЗНАКОМЬТЕСЬ С ДИЗАЙНЕРОМ",
    liveTitle: "N.T. STYLE Live",
    liveDesc: "Показываем, что сейчас покупают самые стильные женщины мира",
    topStoriesTitle: "ГЛАВНЫЕ НОВОСТИ НА N.T. STYLE",
    liveProducts: [
      { brand: 'GOLDEN GOOSE', name: 'Хейли', location: 'ЛОНДОН, GB', action: 'Добавлено в избранное', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/product/1', price: '₽ 8,500' },
      { brand: 'BALENCIAGA', name: 'Никола', location: 'БРИСТОЛЬ, GB', action: 'Добавлено в избранное', image: '/clothes/good/2 10 17 ბურთულებიანი.jpg', link: '/product/2', price: '₽ 6,200' },
      { brand: 'ZIMMERMANN', name: 'Бианка', location: 'СИДНЕЙ, AU', action: 'Добавлено в избранное', image: '/clothes/good/3 16-2 კოპლებიანი.jpg', link: '/product/3', price: '₽ 10,500' },
      { brand: 'TOTEME', name: 'Ана', location: 'НЬЮ-ЙОРК, US', action: 'Добавлено в корзину', image: '/clothes/good/4 17 შავი ბეწვიანი.jpg', link: '/product/4', price: '₽ 7,100' },
      { brand: 'AFLALO', name: 'Рагад', location: 'КУВЕЙТ, KW', action: 'Добавлено в корзину', image: '/clothes/good/5 15 პალტო.jpg', link: '/product/5', price: '₽ 14,000' },
      { brand: 'LIBEROWE', name: 'Лиза', location: 'МАНЧЕСТЕР, GB', action: 'Добавлено в избранное', image: '/clothes/good/6 17 შავი ბეწვიანი ჟილეტი.jpg', link: '/product/6', price: '₽ 5,000' },
      { brand: 'SAINT LAURENT', name: 'Мармонт', location: 'ЛОНДОН, GB', action: 'Добавлено в корзину', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/product/7', price: '₽ 9,800' },
    ],
    topStories: [
      { category: 'МОДА', title: 'Гид по платьям для любого случая', image: '/clothes/good/7 16 ვარდიანი შავი.jpg', link: '/story/1' },
      { category: 'МОДА', title: '5 джинсовых трендов этого сезона', image: '/clothes/good/8 16 ვარდიანი თეთრი.jpg', link: '/story/2' },
      { category: 'МОДА', title: 'Самые желанные: время сиять', image: '/clothes/good/9 ბეწვიანი სერი.jpg', link: '/story/3' },
      { category: 'МОДА', title: 'В тренде: ботфорты', image: '/clothes/good/10 17 ბეწვიანი შავი.jpg', link: '/story/4' },
      { category: 'МОДА', title: 'Лучший гид по подаркам', image: '/clothes/good/11 16 კოპლებიანი.jpg', link: '/story/5' },
      { category: 'ПУТЕШЕСТВИЯ', title: 'Лучшие горнолыжные курорты Европы', image: '/clothes/good/12 17 ბეწვიანი ჟილეტი.jpg', link: '/story/6' },
      { category: 'МОДА', title: 'Зимние аксессуары, которые у вас должны быть', image: '/clothes/good/1 17 ბეწვიანი.jpg', link: '/story/7' },
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
      const elements = [liveElement]; // აქედან ამოვიღეთ მეორე სექცია
      
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

      {/* --- 1. Hero Section --- */}
      <section className="relative h-[calc(100vh-160px)] w-full overflow-hidden bg-black">
        <img
          src={IMAGE_URL}
          alt="Black Friday Offer"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
          style={{ filter: 'brightness(0.8)' }}
        />
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

      {/* --- 2. "New In" Carousel --- */}
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
            <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 scrollbar-hide pb-4">
              {t.products.map((product, index) => (
                <Link to={`/product/${product.slug}`} key={index} className="group/item cursor-pointer block text-center w-[60%] sm:w-[40%] lg:w-[22%] flex-shrink-0">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img src={product.image} alt={product.name} className="w-full h-[350px] object-cover object-top transition duration-700 group-hover/item:scale-105" />
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
              <h3 className="text-4xl font-serif uppercase tracking-wider drop-shadow-md ">{t.coatsTitle}</h3>
              <p className="text-sm uppercase tracking-widest mt-2 hover:underline drop-shadow-md">{t.viewCollection}</p>
            </div>
          </Link>
          <Link to="/category/clothing" className="relative h-[700px] w-full overflow-hidden group">
            <img src="/clothes/9.jpg" alt="Shoes" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
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
          src="/clothes/12.jpg"
          alt="Full Width Banner"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 p-4">
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
            <Link to={item.link} key={index} className="group cursor-pointer block">
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
              <span className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
                {item.linkText}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- 6. 5-Images Accordion --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative mt-40">
        <div className="absolute -top-24 left-15 z-20 pointer-events-none flex justify-start">
          <h2 className="text-[5rem] md:text-[10rem] font-serif leading-none text-gray-200">
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
            <Link to="/category/aboutNT" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
              {t.designerBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* --- 7. Live & Top Stories --- */}
      <section className="pt-20 pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif tracking-wide uppercase">
              {t.liveTitle}
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-3">
              {t.liveDesc}
            </p>
          </div>

          <div 
            ref={liveScrollRef} 
            className="flex overflow-x-hidden whitespace-nowrap -mx-2 mb-16 scrollbar-hide"
          >
            {[...t.liveProducts, ...t.liveProducts, ...t.liveProducts].map((item, idx) => (
              <Link to={item.link} key={`live-${idx}`} className="group cursor-pointer inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex-shrink-0 px-4 text-center relative">
                
                <div className="mb-4 flex justify-center items-center h-64 overflow-hidden bg-white">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-contain mix-blend-multiply transition-opacity duration-700 group-hover:opacity-75" 
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-gray-900">{item.brand}</p>
                <p className="text-sm font-serif mb-1 text-gray-800">{item.name}</p>
                <p className="text-sm font-bold text-gray-900 mb-1">{item.price}</p>
                <p className="text-[11px] italic text-gray-500 mb-1">{item.action}</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{item.location}</p>
              </Link>
            ))}
          </div>

          <div className="w-full border-t border-gray-200 my-16"></div>

          <div className="mb-10">
            <h3 className="text-[11px] tracking-[0.2em] text-gray-800 uppercase font-semibold text-center sm:text-left">
              {t.topStoriesTitle}
            </h3>
          </div>

          {/* აქ მოვხსენით ref, რათა აღარ ისქროლოს ავტომატურად */}
          <div className="flex overflow-x-auto whitespace-nowrap -mx-2 scrollbar-hide">
            {[...t.topStories, ...t.topStories, ...t.topStories].map((story, idx) => (
              <Link to={story.link} key={`story-${idx}`} className="inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex-shrink-0 px-4 cursor-pointer group">
                <div className="relative overflow-hidden mb-4 aspect-[3/4] w-full">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-75" 
                  />
                </div>
                <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-2 font-semibold">
                  {story.category}
                </p>
                <h4 className="text-[14px] font-serif text-gray-900 leading-snug whitespace-normal">
                  {story.title}
                </h4>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeScreen;