import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext'; // დამატებულია

// --- TRANSLATIONS ---
const translations = {
  ge: {
    title: "ტანსაცმელი",
    subtitle: "შექმენი შენი ოცნების გარდერობი ორიგინალური არჩევანით.",
    filter_btn: "ფილტრი",
    results: "შედეგები",
    
    // Sort Options
    sort_recommended: "სორტირება",
    sort_new: "ახლები",
    sort_price_low: "ფასი კლებადობით",
    sort_price_high: "ფასი ზრდადობით",
    
    // Sidebar Titles
    designer_title: "დიზაინერი", // ან DESIGNER თუ ინგლისურად გინდათ დარჩეს
    size_title: "ტანსაცმლის ზომა",
    price_title: "ფასი",
    
    // Controls
    unselect_all: "ყველას გაუქმება",
    clear_all: "გასუფთავება",
    
    // Price Ranges
    range_under_500: "500 ლარამდე",
    range_500_1000: "500 ლარიდან - 1,000 ლარამდე",
    range_1000_2000: "1,000 ლარიდან - 2,000 ლარამდე",
    range_over_2000: "2,000 ლარზე მეტი",
    
    // Product Card
    new_season: "ახალი სეზონი",
    currency: "ლარი",
    
    // Pagination
    prev: "წინა",
    next: "შემდეგი",
    page: "გვერდი",
    from: "-დან" // "50-დან"
  },
  en: {
    title: "Clothing",
    subtitle: "Create your dream wardrobe with original choices.",
    filter_btn: "Filter",
    results: "Results",
    
    sort_recommended: "Recommended",
    sort_new: "New In",
    sort_price_low: "Price: Low to High",
    sort_price_high: "Price: High to Low",
    
    designer_title: "Designer",
    size_title: "Clothing Size",
    price_title: "Price",
    
    unselect_all: "Unselect all",
    clear_all: "Clear all",
    
    range_under_500: "Under 500 GEL",
    range_500_1000: "500 GEL - 1,000 GEL",
    range_1000_2000: "1,000 GEL - 2,000 GEL",
    range_over_2000: "Over 2,000 GEL",
    
    new_season: "New Season",
    currency: "GEL",
    
    prev: "Previous",
    next: "Next",
    page: "Page",
    from: "of"
  }
};

// --- CONSTANTS ---
const ITEMS_PER_PAGE = 50;
const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

// --- ICONS ---
const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <path d="M8 12H16" strokeWidth="1.5" />
    </svg>
);

const HeartIcon = ({ filled, onClick }) => (
    <button
        onClick={onClick}
        // 👇 აი აქ დაემატა ახალი კლასები: bg-white/80, p-2, rounded-full, hover:bg-white
        className="absolute top-3 right-3 z-20 focus:outline-none transform transition duration-200 active:scale-90 bg-white/80 p-2 rounded-full hover:bg-white shadow-sm"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={filled ? "black" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            // 👇 აქედან hover:text-black ამოვიღეთ, რადგან ახლა მთლიანად ღილაკი რეაგირებს
            className={`w-5 h-5 transition duration-300 ${filled ? 'text-black' : 'text-gray-600'}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
    </button>
);

// --- COMPONENTS ---
const Checkbox = ({ label, checked, onChange }) => (
    <div onClick={onChange} className="flex items-center space-x-3 cursor-pointer group py-1">
        <div className={`w-4 h-4 border border-gray-300 flex items-center justify-center transition ${checked ? 'bg-black border-black' : 'bg-white group-hover:border-gray-500'}`}>
            {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className={`text-[13px] select-none ${checked ? 'font-bold text-black' : 'text-gray-600 group-hover:text-black'}`}>{label}</span>
    </div>
);

const FilterSection = ({ title, isOpen, toggle, children, onClear, hasSelection, clearText }) => (
    <div className="border-b border-gray-200 py-5">
        <button onClick={toggle} className="flex justify-between items-center w-full text-left group mb-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-black">{title}</span>
            <span className={`transform transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {hasSelection && (
                <button onClick={onClear} className="text-[11px] text-gray-400 underline decoration-gray-300 hover:text-gray-600 mb-3 block w-full text-left">
                    {clearText}
                </button>
            )}
            <div className="pb-2">
                {children}
            </div>
        </div>
    </div>
);

const ProductSkeleton = () => (
    <div className="flex flex-col animate-pulse">
        <div className="w-full aspect-[3/4] bg-[#F5F5F5] flex items-center justify-center mb-4">
            <span className="text-gray-300 font-serif tracking-[0.2em] text-xs uppercase">N.T. STYLE</span>
        </div>
        <div className="h-2 bg-[#F5F5F5] w-2/3 mb-2"></div>
        <div className="h-2 bg-[#F5F5F5] w-full mb-2"></div>
    </div>
);

const ClothingScreen = () => {
    const { language } = useLanguage();
    const t = translations[language];

    // Moved PRICE_RANGES inside component to use translations
    const PRICE_RANGES = [
        { label: t.range_under_500, min: 0, max: 500 },
        { label: t.range_500_1000, min: 500, max: 1000 },
        { label: t.range_1000_2000, min: 1000, max: 2000 },
        { label: t.range_over_2000, min: 2000, max: Infinity },
    ];

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // States
    const [initialLoading, setInitialLoading] = useState(true);
    const [isSorting, setIsSorting] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter States
    const [openSections, setOpenSections] = useState({ category: false, designer: true, size: true, price: true });
    const [selectedDesigners, setSelectedDesigners] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const [currentSort, setCurrentSort] = useState(t.sort_recommended);
    const { toggleWishlist, isInWishlist } = useWishlist();

    // 1. DATA FETCHING
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('https://ntstyle-api.onrender.com/api/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setTimeout(() => setInitialLoading(false), 1000);
            }
        };
        fetchProducts();
    }, []);

    // Update currentSort label when language changes
    useEffect(() => {
        setCurrentSort(t.sort_recommended);
    }, [language, t.sort_recommended]);

    // 2. SORTING HANDLER
    const handleSortChange = (sortOption) => {
        if (sortOption === currentSort) { setIsSortOpen(false); return; }
        setIsSortOpen(false);
        setIsSorting(true);
        setCurrentSort(sortOption);
        setTimeout(() => setIsSorting(false), 800);
    };

    // 3. FILTER & SORT LOGIC
    useEffect(() => {
        let result = [...products];

        if (selectedDesigners.length > 0) {
            result = result.filter(p => p.designer && selectedDesigners.includes(p.designer));
        }
        if (selectedPrices.length > 0) {
            result = result.filter(p => selectedPrices.some(label => {
                const range = PRICE_RANGES.find(r => r.label === label);
                return range && p.price >= range.min && p.price <= range.max;
            }));
        }
        if (selectedSizes.length > 0) {
             // ლოგიკა ზომებზე (თუ API აბრუნებს ზომებს) - კოდი იგივე დავტოვე
             // result = result.filter... 
             // შენიშვნა: ორიგინალ კოდში ზომის ფილტრაციის ლოგიკა არ იყო რეალიზებული `useEffect`-ში, 
             // მხოლოდ `selectedSizes` ივსებოდა. მე დავტოვე ზუსტად ისე, როგორც იყო.
        }

        // Sorting Logic using Translation Keys
        if (currentSort === t.sort_price_low) result.sort((a, b) => a.price - b.price);
        else if (currentSort === t.sort_price_high) result.sort((a, b) => b.price - a.price);
        else if (currentSort === t.sort_new) result.reverse();

        setFilteredProducts(result);
        setCurrentPage(1);
    }, [selectedDesigners, selectedPrices, selectedSizes, products, currentSort, t, PRICE_RANGES]);

    // 4. PAGINATION LOGIC
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // UI Handlers
    const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    const handleDesignerChange = (d) => setSelectedDesigners(prev => prev.includes(d) ? prev.filter(i => i !== d) : [...prev, d]);
    const handlePriceChange = (p) => setSelectedPrices(prev => prev.includes(p) ? prev.filter(i => i !== p) : [...prev, p]);
    const handleSizeChange = (s) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s]);

    const removeFilter = (type, value) => {
        if (type === 'designer') setSelectedDesigners(prev => prev.filter(d => d !== value));
        if (type === 'price') setSelectedPrices(prev => prev.filter(p => p !== value));
        if (type === 'size') setSelectedSizes(prev => prev.filter(s => s !== value));
    };

    const clearAllFilters = () => {
        setSelectedDesigners([]);
        setSelectedPrices([]);
        setSelectedSizes([]);
    };

    const uniqueDesigners = [...new Set(products.map(p => p.designer).filter(Boolean))];

    return (
        <div className="bg-white min-h-screen w-full font-sans">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}
            </style>

            {/* HEADER */}
            <div className="w-full flex flex-col items-center justify-center pt-12 pb-10 px-4">
                <h1 className="text-[32px] md:text-[40px] mb-4 text-black" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {t.title}
                </h1>
                <p className="text-[13px] md:text-[14px] text-gray-800 leading-relaxed max-w-2xl text-center font-light tracking-wide">
                    {t.subtitle}
                </p>
            </div>

            {/* MAIN CONTAINER */}
            <div className="w-full px-6 md:px-10 pb-0 border-t border-gray-200">

                {/* CONTROL BAR */}
                <div className="flex justify-between items-center py-6 bg-white sticky top-0 z-30">
                    <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex items-center px-5 py-3 transition bg-white border ${isFilterOpen ? 'border-black' : 'border-gray-300 hover:border-black'}`}>
                        <FilterIcon />
                        <span className="ml-3 mr-3 text-[12px] font-bold uppercase tracking-[0.1em]">{t.filter_btn}</span>
                        <span className="text-gray-300 mr-3 font-light">|</span>
                        <span className="text-[12px] text-gray-500 font-medium">{filteredProducts.length} {t.results}</span>
                    </button>

                    <div className="relative">
                        <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center justify-between border border-gray-300 px-4 py-3 hover:border-black transition bg-white min-w-[200px]">
                            <span className="text-[12px] font-medium uppercase tracking-wider">{currentSort}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                        </button>
                        {isSortOpen && (
                            <div className="absolute right-0 top-full mt-[-1px] w-64 bg-white border border-black shadow-none z-40">
                                {[t.sort_recommended, t.sort_new, t.sort_price_low, t.sort_price_high].map((option) => (
                                    <button key={option} onClick={() => handleSortChange(option)} className={`block w-full text-left px-4 py-3 text-[12px] hover:bg-gray-50 transition ${currentSort === option ? 'font-bold text-black' : 'text-gray-600'}`}>{option}</button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex items-start relative transition-all duration-500 min-h-[600px]">

                    {/* SIDEBAR */}
                    <div className={`flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${isFilterOpen ? 'w-64 opacity-100 mr-12' : 'w-0 opacity-0 mr-0'}`}>
                        <div className="w-64 pt-2 border-t border-gray-200">
                            <div className="sticky top-32">
                                <FilterSection 
                                    title={t.designer_title}
                                    isOpen={openSections.designer} 
                                    toggle={() => toggleSection('designer')} 
                                    onClear={() => setSelectedDesigners([])} 
                                    hasSelection={selectedDesigners.length > 0}
                                    clearText={t.unselect_all}
                                >
                                    <div className="max-h-60 overflow-y-auto scrollbar-thin pr-2 space-y-1">
                                        {uniqueDesigners.map(designer => (
                                            <Checkbox key={designer} label={designer} checked={selectedDesigners.includes(designer)} onChange={() => handleDesignerChange(designer)} />
                                        ))}
                                    </div>
                                </FilterSection>
                                <FilterSection 
                                    title={t.size_title}
                                    isOpen={openSections.size} 
                                    toggle={() => toggleSection('size')} 
                                    onClear={() => setSelectedSizes([])} 
                                    hasSelection={selectedSizes.length > 0}
                                    clearText={t.unselect_all}
                                >
                                    <div className="grid grid-cols-2 gap-1">
                                        {SIZES.map(size => (<Checkbox key={size} label={size} checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} />))}
                                    </div>
                                </FilterSection>
                                <FilterSection 
                                    title={t.price_title}
                                    isOpen={openSections.price} 
                                    toggle={() => toggleSection('price')} 
                                    onClear={() => setSelectedPrices([])} 
                                    hasSelection={selectedPrices.length > 0}
                                    clearText={t.unselect_all}
                                >
                                    <div className="space-y-1">
                                        {PRICE_RANGES.map((range) => (<Checkbox key={range.label} label={range.label} checked={selectedPrices.includes(range.label)} onChange={() => handlePriceChange(range.label)} />))}
                                    </div>
                                </FilterSection>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="flex-grow min-w-0 transition-all duration-300 ease-in-out pt-2">

                        {/* ACTIVE FILTERS */}
                        {(selectedDesigners.length > 0 || selectedPrices.length > 0 || selectedSizes.length > 0) && (
                            <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                {[...selectedDesigners, ...selectedPrices, ...selectedSizes].map(item => (
                                    <button key={item} onClick={() => { removeFilter('designer', item); removeFilter('price', item); removeFilter('size', item); }} className="flex items-center justify-between border border-gray-300 hover:border-black bg-white px-4 py-3 transition group min-w-[120px]">
                                        <span className="text-[13px] text-gray-800 group-hover:text-black">{item}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 text-gray-500 ml-3 group-hover:text-black"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                ))}
                                <button onClick={clearAllFilters} className="text-[12px] underline text-gray-500 hover:text-black underline-offset-4 ml-2">{t.clear_all}</button>
                            </div>
                        )}

                        {/* GRID */}
                        {(initialLoading || isSorting) ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
                                {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
                                {currentItems.map((product) => (
                                    <div key={product._id} className="group flex flex-col relative cursor-pointer">
                                        <div className="relative w-full overflow-hidden bg-[#F9F9F9] mb-4 aspect-[3/4.1]">
                                            <Link to={`/product/${product.slug}`} className="block w-full h-full">
                                                <img src={product.images?.[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                                                {product.images?.[1] && (
                                                    <img src={product.images[1]} alt={product.name} className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100" />
                                                )}
                                            </Link>
                                            <HeartIcon filled={isInWishlist(product._id)} onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} />
                                        </div>
                                        <div className="flex flex-col items-start pl-0.5">
                                            <Link to={`/product/${product.slug}`} className="text-[11px] font-bold uppercase tracking-[0.05em] text-gray-900 mb-1 hover:underline">{product.designer}</Link>
                                            <Link to={`/product/${product.slug}`} className="text-[13px] text-gray-600 font-light leading-snug hover:text-black transition-colors">{product.name}</Link>
                                            <p className="text-[13px] font-medium mt-1.5">{product.price} {t.currency}</p>

                                            {/* ✅ COLORS */}
                                            {product.colors && product.colors.length > 0 && (
                                                <div className="flex gap-1.5 mt-2">
                                                    {product.colors.map((color, index) => (
                                                        <div
                                                            key={index}
                                                            className={`w-3 h-3 rounded-full border ${index === 0 ? 'border-black' : 'border-gray-300'}`}
                                                            style={{ backgroundColor: color.hex }}
                                                            title={color.name}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}

                                            {product.isFeatured && <span className="text-[9px] text-[#A10000] font-bold uppercase tracking-widest mt-1.5">{t.new_season}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* PAGINATION FOOTER */}
                <div className="mt-28 w-full">
                    <div className="flex justify-center mb-10">
                        <button onClick={scrollToTop} className="rounded-full border border-gray-300 p-3 hover:border-black transition group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-gray-600 group-hover:text-black"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                        </button>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center py-6 text-[13px] text-gray-500 font-medium">
                        <button onClick={goToPrevPage} disabled={currentPage === 1} className={`flex items-center gap-4 transition ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                                <span>{t.prev}</span>
                            </div>
                        </button>
                        <span className="text-black">{t.page} {currentPage} &nbsp;{t.from} 50</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`flex items-center gap-4 transition ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}>
                            <div className="flex items-center">
                                <span>{t.next}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                        </button>
                    </div>
                    <hr className="border-gray-200" />
                </div>

            </div>
        </div>
    );
};

export default ClothingScreen;