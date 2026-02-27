import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx'; 

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false); // 👈 წესებზე დათანხმების State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { register, user } = useUser();
    const navigate = useNavigate();

    // თუ მომხმარებელი უკვე შესულია, გადამისამართება
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        // 👈 ვამოწმებთ, დაეთანხმა თუ არა წესებს
        if (!agreeTerms) {
            setError('რეგისტრაციისთვის გთხოვთ, დაეთანხმოთ წესებს და პირობებს');
            return;
        }

        setLoading(true);
        setError(null);

        // Context-ის register ფუნქციის გამოძახება
        const result = await register(name, email, password);

        if (!result.success) {
            // თუ წარმატება არ არის, ვაჩვენებთ შეცდომას
            setError(result.error);
        } else {
            // წარმატების შემთხვევაში, Context-ი უკვე აკეთებს navigate('/')-ს
            // navigate('/'); 
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center py-16">
            <div className="w-full max-w-md p-8 border border-gray-200 shadow-xl">
                <h1 className="text-3xl font-serif mb-6 text-center">რეგისტრაცია</h1>
                <p className="text-center text-sm text-gray-600 mb-8">
                    შექმენით თქვენი ანგარიში, რომ დაიწყოთ შოპინგი.
                </p>

                {/* შეცდომის ჩვენება */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                            სახელი
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                            ელექტრონული ფოსტა
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                            პაროლი
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* 👈 ჩეკბოქსი წესებისთვის */}
                    <div className="flex items-center">
                        <input
                            id="agreeTerms"
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                            ვეთანხმები <Link to="/terms" className="underline hover:text-black">წესებს და პირობებს</Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white uppercase tracking-widest font-bold text-sm hover:bg-gray-800 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'იტვირთება...' : 'რეგისტრაცია'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p>
                        უკვე გაქვთ ანგარიში?{' '}
                        <Link to="/login" className="font-medium text-black hover:underline">
                            შესვლა
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;