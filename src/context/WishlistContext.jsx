import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const WishlistContext = createContext();

// 🌐 შენი ლაივ ბექენდის მისამართი
const API_URL = "https://ntstyle-api.onrender.com";

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useUser();

    // ✅ FIX 1: Initial Fetch Runs ONLY when the user object changes
    useEffect(() => {
        if (user && user._id) {
            const fetchWishlist = async () => {
                try {
                    // 👈 დამატებულია API_URL
                    const { data } = await axios.get(`${API_URL}/api/users/${user._id}/wishlist`);
                    setWishlist(data);
                } catch (error) {
                    console.error("Failed to fetch wishlist", error);
                }
            };
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [user]);

    // ✅ FIX 2: Removal of Optimistic Update
    const toggleWishlist = async (product) => {
        if (!user) {
            alert("გთხოვთ გაიაროთ ავტორიზაცია / Please log in");
            return;
        }

        try {
            // 👈 დამატებულია API_URL
            const { data: updatedWishlist } = await axios.put(`${API_URL}/api/users/wishlist`, {
                userId: user._id,
                productId: product._id
            });

            setWishlist(updatedWishlist);

        } catch (error) {
            console.error("Error updating wishlist", error);
            alert("ვერ მოხერხდა ვიშლისტის განახლება / Failed to update wishlist");
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);