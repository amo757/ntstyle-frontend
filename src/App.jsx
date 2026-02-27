import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // 👈 დამატებულია ანიმაციისთვის

// კომპონენტები
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import AnimatedPage from './components/AnimatedPage'; // 👈 დამატებულია

// სქრინები
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ClothingScreen from './screens/ClothingScreen';
import WishlistScreen from './screens/WishlistScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import CompleteScreen from './screens/CompleteScreen';
import OrderScreen from './screens/OrderScreen'; 

import CookiePage from './screens/CookiePage';
import ShippingInfoPage from './screens/ShippingInfoPage';
import PaymentInfoPage from './screens/PaymentInfoPage';
import ContactPage from './screens/ContactPage';
import TermsPage from './screens/TermsPage';
import RefundPage from './screens/RefundPage';
import PrivacyPage from './screens/PrivacyPage';
import AboutNT from './screens/AboutNT';
import SalePage from './screens/SalePage';
import ShopByScreen from './screens/ShopByScreen';

function App() {
  const location = useLocation(); // 👈 გვჭირდება, რომ AnimatePresence-მა იცოდეს როდის იცვლება გვერდი
  
  // განვაახლოთ ლოგიკა, რომ ჰედერი არ გამოჩნდეს გადახდის პროცესში
  const isCheckoutPage = ['/shipping', '/payment', '/complete'].includes(location.pathname) || location.pathname.startsWith('/order/');
  const PAGE_ID = "100063700802010";

  return (
    <>
      <ScrollToTop />

      {!isCheckoutPage && <TopBar />}
      {!isCheckoutPage && <Header />}

      <main className={!isCheckoutPage ? "min-h-[80vh]" : ""}>
        {/* AnimatePresence მართავს გვერდების ანიმაციას */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
               {/* ყველა გვერდი გახვეულია AnimatedPage-ში */}
               <Route path="/" element={<AnimatedPage><HomeScreen /></AnimatedPage>} />
               <Route path="/category/clothing" element={<AnimatedPage><ClothingScreen /></AnimatedPage>} />
               <Route path="/wishlist" element={<AnimatedPage><WishlistScreen /></AnimatedPage>} />
               <Route path="/product/:slug" element={<AnimatedPage><ProductScreen /></AnimatedPage>} />
               <Route path="/cart" element={<AnimatedPage><CartScreen /></AnimatedPage>} />
               <Route path="/login" element={<AnimatedPage><LoginScreen /></AnimatedPage>} />
               <Route path="/register" element={<AnimatedPage><RegisterScreen /></AnimatedPage>} />
               
               {/* Checkout გვერდებზე ანიმაცია შეგვიძლია დავტოვოთ, ან მოვხსნათ თუ არ გვინდა. აქ დატოვებულია */}
               <Route path="/shipping" element={<AnimatedPage><ShippingScreen /></AnimatedPage>} />
               <Route path="/payment" element={<AnimatedPage><PaymentScreen /></AnimatedPage>} />
               <Route path="/complete" element={<AnimatedPage><CompleteScreen /></AnimatedPage>} />
               <Route path="/order/:id" element={<AnimatedPage><OrderScreen /></AnimatedPage>} />

               <Route path="/category/salepage" element={<AnimatedPage><SalePage /></AnimatedPage>} />
               <Route path="/cookies" element={<AnimatedPage><CookiePage /></AnimatedPage>} />
               <Route path="/shipping-info" element={<AnimatedPage><ShippingInfoPage /></AnimatedPage>} />
               <Route path="/payment-info" element={<AnimatedPage><PaymentInfoPage /></AnimatedPage>} />
               <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
               <Route path="/terms" element={<AnimatedPage><TermsPage /></AnimatedPage>} />
               <Route path="/refund-policy" element={<AnimatedPage><RefundPage /></AnimatedPage>} />
               <Route path="/privacy" element={<AnimatedPage><PrivacyPage /></AnimatedPage>} />
               <Route path="/category/aboutNT" element={<AnimatedPage><AboutNT /></AnimatedPage>} />
               <Route path="/category/shop" element={<AnimatedPage><ShopByScreen /></AnimatedPage>} />

               <Route path="*" element={<AnimatedPage><NotFoundScreen /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isCheckoutPage && <Footer />}

      {/* Messenger Button */}
      <a
        href={`https://m.me/${PAGE_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          backgroundColor: '#0084FF',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.03 2 11C2 13.66 3.39 16.04 5.55 17.59V21L9.18 19C10.09 19.25 11.03 19.38 12 19.38C17.52 19.38 22 15.35 22 10.38C22 5.41 17.52 2 12 2ZM13.88 13.92L11.53 11.42L6.96 13.92L11.96 8.58L14.47 11.08L19.04 8.58L13.88 13.92Z" />
        </svg>
      </a>
    </>
  );
}

export default App;