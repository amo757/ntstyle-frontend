import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// 👇 1. ეს იმპორტი დაამატეთ აუცილებლად!
import { HelmetProvider } from 'react-helmet-async'; 

import App from './App.jsx';
import './index.css';

// Context-ების იმპორტი
import { UserProvider } from './context/UserContext.jsx'; 
import { CartProvider } from './context/CartContext.jsx'; 
import { WishlistProvider } from './context/WishlistContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 👇 2. HelmetProvider-მა უნდა შეფუთოს ყველაფერი (ან BrowserRouter-ის გარშემო იყოს) */}
    <HelmetProvider>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <LanguageProvider>
                
                <App /> 

              </LanguageProvider>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);