// Context აპლიკაციის მასშტაბით მომხმარებლის სტატუსის სამართავად (შესული/გამოსული)
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const USER_INFO_STORAGE = 'userInfo';

const BASE_URL = 'https://ntstyle-api.onrender.com';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Local Storage-დან მომხმარებლის მონაცემების ჩატვირთვა
    useEffect(() => {
        const userInfo = localStorage.getItem(USER_INFO_STORAGE);
        if (userInfo) {
            try {
                const parsedUser = JSON.parse(userInfo);
                setUser(parsedUser);
            } catch (e) {
                console.error("Error parsing user info from localStorage", e);
                localStorage.removeItem(USER_INFO_STORAGE);
            }
        }
        setLoading(false);
    }, []);

    // შესვლის ლოგიკა (Login)
    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
            
            // პირდაპირ ვიყენებთ ბექენდიდან წამოსულ მონაცემს
            setUser(data);
            localStorage.setItem(USER_INFO_STORAGE, JSON.stringify(data));
            
            navigate('/');
            return { success: true };

        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message 
                : 'შესვლა ვერ მოხერხდა. შეამოწმეთ Backend.';
            return { success: false, error: message };
        }
    };

    // რეგისტრაციის ლოგიკა (Register)
    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/users`, { name, email, password });
            
            // პირდაპირ ვიყენებთ ბექენდიდან წამოსულ მონაცემს
            setUser(data);
            localStorage.setItem(USER_INFO_STORAGE, JSON.stringify(data));
            
            navigate('/');
            return { success: true };

        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message 
                : 'რეგისტრაცია ვერ მოხერხდა.';
            return { success: false, error: message };
        }
    };
    
    // გამოსვლის ლოგიკა (Logout)
    const logout = () => {
        setUser(null);
        localStorage.removeItem(USER_INFO_STORAGE);
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, loading }}>
            {loading ? (
                <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', letterSpacing: '2px', fontFamily: 'serif' }}>
                    იტვირთება...
                </div>
            ) : (
                children 
            )}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);