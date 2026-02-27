import React, { createContext, useReducer, useContext, useEffect } from 'react';

// 1. Local Storage-ის გასაღები
const CART_STORAGE_KEY = 'cartItems';

// 2. Context-ის შექმნა
const CartContext = createContext({}); 

// 3. Reducer-ის ფუნქცია
const cartReducer = (state, action) => {
    const items = state.cartItems || []; 

    switch (action.type) {
        case 'ADD_TO_CART': {
            const item = action.payload;
            const existItem = items.find((x) => x.slug === item.slug && x.size === item.size);
            let newItems;

            if (existItem) {
                newItems = items.map((x) =>
                        x.slug === existItem.slug && x.size === existItem.size ? item : x
                    );
            } else {
                newItems = [...items, item];
            }
            // როცა კალათა იცვლება, ფასდაკლებას ვაუქმებთ (უსაფრთხოებისთვის) ან ვტოვებთ.
            // ამ შემთხვევაში ვტოვებთ ძველ discount-ს, მაგრამ ვაახლებთ ტოტალებს.
            return cartReducer({...state, cartItems: newItems}, { type: 'UPDATE_TOTALS' }); 
        }

        case 'REMOVE_ITEM':
            const filteredItems = items.filter((x) => x.slug !== action.payload.slug || x.size !== action.payload.size);
            // თუ კალათა დაცარიელდა, ფასდაკლებაც უნდა განულდეს
            if (filteredItems.length === 0) {
                 return {
                    cartItems: [],
                    cartTotals: { totalItems: 0, totalPrice: 0 },
                    promoDiscount: 0 // ✅ განულება
                };
            }
            return cartReducer({...state, cartItems: filteredItems}, { type: 'UPDATE_TOTALS' });
            
        case 'UPDATE_QUANTITY': {
            const { slug, size, quantity } = action.payload;
            const updatedItems = items.map((x) => x.slug === slug && x.size === size ? { ...x, quantity: quantity } : x );
            return cartReducer({...state, cartItems: updatedItems}, { type: 'UPDATE_TOTALS' });
        }

        case 'CLEAR_CART':
            return {
                cartItems: [],
                cartTotals: { totalItems: 0, totalPrice: 0 },
                promoDiscount: 0, // ✅ კალათის გასუფთავებისას ფასდაკლებაც ნულდება
            };

        // ✅ ახალი CASE ფასდაკლებისთვის
        case 'SET_PROMO_DISCOUNT':
            return {
                ...state,
                promoDiscount: action.payload
            };

        case 'SET_INITIAL_STATE':
            return action.payload;
        
        case 'UPDATE_TOTALS':
            const totalItems = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
            const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
            return {
                ...state,
                cartTotals: { totalItems, totalPrice: parseFloat(totalPrice.toFixed(2)) },
            };
        default:
            return state;
    }
};

// 4. Cart Provider კომპონენტი
export const CartProvider = ({ children }) => {
    // ამოვიღოთ ლოკალ სტორეჯიდან ან შევქმნათ დეფოლტი
    const storedData = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    
    const initialCartState = storedData || {
        cartItems: [],
        cartTotals: { totalItems: 0, totalPrice: 0 },
        promoDiscount: 0, // ✅ საწყისი მნიშვნელობა
    };

    // თუ ძველ ლოკალ სტორეჯში promoDiscount არ ეწერა, დავამატოთ ხელით (უსაფრთხოებისთვის)
    if (storedData && typeof storedData.promoDiscount === 'undefined') {
        initialCartState.promoDiscount = 0;
    }

    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        // ვინახავთ მთლიან სთეითს (მათ შორის ფასდაკლებასაც)
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }, [state]); 

    // ფუნქციები
    const addToCart = (product, size, quantity) => {
        const newItem = {
            ...product,
            size: size,
            quantity: quantity,
        };
        dispatch({ type: 'ADD_TO_CART', payload: newItem });
    };

    const removeItem = (slug, size) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { slug, size } });
    };
    
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    // ✅ ახალი ფუნქცია გარეთ გასატანად
    const setPromoDiscount = (amount) => {
        dispatch({ type: 'SET_PROMO_DISCOUNT', payload: amount });
    };

    const value = {
        cartItems: state.cartItems,
        cartTotals: state.cartTotals,
        promoDiscount: state.promoDiscount || 0, // ✅ გავიტანეთ
        addToCart,
        removeItem,
        clearCart,
        setPromoDiscount, // ✅ გავიტანეთ
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// 5. Custom Hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        return { 
            cartTotals: { totalItems: 0, totalPrice: 0 }, 
            cartItems: [],
            promoDiscount: 0,
            addToCart: () => {},
            removeItem: () => {},
            clearCart: () => {},
            setPromoDiscount: () => {},
        };
    }
    return context;
};