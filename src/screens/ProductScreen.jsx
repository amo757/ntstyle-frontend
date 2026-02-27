import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Link დავამატეთ
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// --- ICONS ---
const HeartIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "black" : "none"} viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

// --- ACCORDION ---
const AccordionItem = ({ title, children, isOpen, onClick }) => (
    <div className="border-t border-gray-200">
        <button onClick={onClick} className="flex justify-between items-center w-full py-4 text-left group">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-900">{title}</span>
            <span className={`transform transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
            <div className="text-[13px] text-gray-600 leading-relaxed font-light">{children}</div>
        </div>
    </div>
);

const ProductScreen = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Selections
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [accordionState, setAccordionState] = useState({ notes: true, size: false, details: false });

    // ✅ Notification State
    const [showNotification, setShowNotification] = useState(false);

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`https://ntstyle-api.onrender.com/api/products/${slug}`);
                setProduct(data);
                if (data.colors && data.colors.length > 0) {
                    setSelectedColor(data.colors[0]);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!selectedSize) { 
            alert('Please select a size.'); 
            return; 
        }
        
        addToCart({ ...product, selectedColor }, selectedSize, 1);
        
        // ✅ Show Notification
        setShowNotification(true);

        // ავტომატურად გაქრეს 4 წამში (სურვილისამებრ)
        setTimeout(() => {
            setShowNotification(false);
        }, 4000);
    };

    const toggleAccordion = (key) => setAccordionState(prev => ({ ...prev, [key]: !prev[key] }));

    if (loading) return <div className="h-screen flex justify-center items-center font-serif tracking-widest">LOADING...</div>;
    if (!product) return <div className="h-screen flex justify-center items-center">Product not found</div>;

    return (
        <div className="bg-white min-h-screen font-sans pb-20 relative">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');`}</style>

            {/* ✅ NOTIFICATION POPUP (Fixed Position) */}
            <div 
                className={`fixed top-24 right-6 z-50 w-[380px] bg-white shadow-2xl border border-gray-100 transform transition-all duration-500 ease-in-out 
                ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}
            >
                <div className="p-5 flex items-start gap-4">
                    {/* პატარა სურათი */}
                    <div className="w-20 h-28 flex-shrink-0 bg-gray-100">
                        <img src={product.images?.[0]} alt="Product" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* ტექსტი */}
                    <div className="flex-grow">
                        <h4 className="text-[13px] font-bold mb-1 text-black">This article was added to your shopping bag.</h4>
                        <p className="text-[11px] text-gray-500 mb-4 leading-tight">
                            Please note that your items are not reserved.
                        </p>
                        
                        {/* ღილაკი */}
                        <Link 
                            to="/cart"
                            className="block w-full bg-black text-white text-center py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                        >
                            Go to Bag
                        </Link>
                    </div>

                    {/* დახურვის ღილაკი (X) */}
                    <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>


            {/* MAIN CONTENT */}
            <div className="max-w-[1920px] mx-auto">
                <div className="flex flex-col lg:flex-row">
                    
                    {/* --- LEFT COLUMN: IMAGES --- */}
                    <div className="w-full lg:w-[65%] bg-white">
                        <div className="grid grid-cols-1 gap-1 pb-10">
                            {product.images && product.images.map((img, index) => (
                                <div key={index} className="w-full">
                                    <img src={img} alt={`${product.name} ${index}`} className="w-full h-auto object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: DETAILS --- */}
                    <div className="w-full lg:w-[35%] px-6 md:px-12 lg:px-16 pt-10 lg:pt-24 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto scrollbar-hide">
                        
                        {/* Header Info */}
                        <div className="mb-8">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 mb-3 block">NET SUSTAIN</span>
                            <h1 className="text-[32px] font-normal text-black mb-1 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                                {product.designer}
                            </h1>
                            <p className="text-[14px] text-gray-600 font-light mb-4">{product.name}</p>
                            <p className="text-[16px] font-bold text-black">{product.price} GEL</p>
                        </div>

                        {/* COLOR SELECTION */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-8">
                                <p className="text-[11px] font-bold uppercase tracking-widest mb-3">
                                    Color: <span className="font-normal text-gray-600 capitalize">{selectedColor ? selectedColor.name : ''}</span>
                                </p>
                                <div className="flex space-x-3">
                                    {product.colors.map((color) => (
                                        <div
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border cursor-pointer transition-all duration-200 relative flex items-center justify-center
                                                ${selectedColor?.name === color.name ? 'border-black ring-1 ring-black ring-offset-2' : 'border-transparent hover:border-gray-300'}
                                            `}
                                            style={{ backgroundColor: color.hex }} 
                                            title={color.name}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-3">
                                <p className="text-[11px] font-bold uppercase tracking-widest">Size</p>
                                <span className="text-[11px] text-gray-500 underline cursor-pointer hover:text-black">View size guide</span>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {SIZES.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-2.5 text-[11px] uppercase font-bold border transition duration-200
                                            ${selectedSize === size 
                                                ? 'border-black bg-black text-white' 
                                                : 'border-gray-300 text-gray-700 hover:border-black'
                                            }
                                        `}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3 mb-10">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-3.5 uppercase text-[11px] font-bold tracking-[0.15em] hover:bg-gray-800 transition"
                            >
                                Add to Bag
                            </button>
                            <button 
                                onClick={() => toggleWishlist(product)}
                                className="w-full border border-gray-300 text-black py-3.5 uppercase text-[11px] font-bold tracking-[0.15em] hover:border-black transition flex items-center justify-center gap-2"
                            >
                                <HeartIcon filled={isInWishlist(product._id)} />
                                {isInWishlist(product._id) ? 'Remove from Wish List' : 'Add to Wish List'}
                            </button>
                        </div>

                        {/* Accordions */}
                        <div className="border-b border-gray-200">
                            <AccordionItem title="Editors' Notes" isOpen={accordionState.notes} onClick={() => toggleAccordion('notes')}>
                                <p>{product.description}</p>
                            </AccordionItem>
                            <AccordionItem title="Size & Fit" isOpen={accordionState.size} onClick={() => toggleAccordion('size')}>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Fits true to size, take your normal size</li>
                                    <li>Designed for a slightly loose fit</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title="Details & Care" isOpen={accordionState.details} onClick={() => toggleAccordion('details')}>
                                <p>Material: {product.material || 'Unknown'}</p>
                                <p className="mt-1">Care: Dry clean only.</p>
                            </AccordionItem>
                        </div>

                        <div className="text-[10px] text-gray-400 mt-6">
                            Product Code: {product._id.substring(0, 10).toUpperCase()}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;