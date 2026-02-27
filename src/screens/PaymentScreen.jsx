import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

// --- ICONS ---
const RadioButton = ({ selected, onClick }) => (
    <div onClick={onClick} className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer transition ${selected ? 'border-black' : 'border-gray-400'}`}>
        {selected && <div className="w-2 h-2 bg-black rounded-full"></div>}
    </div>
);

const PaymentScreen = () => {
    const { cartItems, cartTotals, clearCart, promoDiscount } = useCart();
    const { user } = useUser();
    const navigate = useNavigate();

    // --- STATES ---
    const [shippingData, setShippingData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('tbc');
    const [isProcessing, setIsProcessing] = useState(false);

    // ფასდაკლების შემდეგ დარჩენილი თანხა
    const finalTotal = cartTotals.totalPrice - (promoDiscount || 0);

    // მონაცემების ჩატვირთვა
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('shippingAddress'));
        if (!data) {
            navigate('/shipping');
        } else {
            setShippingData(data);
        }
    }, [navigate]);

    const handlePlaceOrder = async () => {
        if (!user || !user._id) {
            alert("გთხოვთ გაიაროთ ავტორიზაცია.");
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        try {
            const formattedAddress = {
                fullName: `${shippingData.firstName} ${shippingData.lastName}`,
                phoneNumber: shippingData.phone,
                address: shippingData.address,
                city: shippingData.city,
                postalCode: shippingData.zip,
                country: shippingData.country
            };

            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity, 
                    price: item.price,
                    image: item.images?.[0] || '',
                    size: item.size
                })),
                shippingAddress: formattedAddress,
                paymentMethod: paymentMethod === 'tbc' ? 'TBC Bank' : 'Cash On Delivery',
                itemsPrice: cartTotals.itemsPrice || cartTotals.totalPrice,
                totalPrice: finalTotal,
                shippingPrice: 0,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // 1. შეკვეთის შექმნა ბაზაში
            const { data: createdOrder } = await axios.post('https://ntstyle-api.onrender.com/api/orders', orderData, config);

            // 2. თუ გადახდა ბარათითაა, ვიძახებთ Flitt-ს
            if (paymentMethod === 'tbc') {
                try {
                    // სწორი მისამართი (payment მხოლობითში)
                    const paymentUrl = 'https://ntstyle-api.onrender.com/api/payment/create-payment';
                    
                    console.log("ვაგზავნით მოთხოვნას აქ:", paymentUrl);

                    const { data: paymentData } = await axios.post(
                        paymentUrl, 
                        {
                            orderId: createdOrder._id, 
                            amount: finalTotal 
                        },
                        config
                    );

                    console.log("ბანკიდან მივიღეთ პასუხი:", paymentData);

                    // ვამოწმებთ success და checkoutUrl (camelCase)
                    if (paymentData.success && paymentData.checkoutUrl) {
                        // კალათის გასუფთავება გადამისამართებამდე
                        clearCart();
                        localStorage.removeItem('cartItems');
                        
                        // გადაყვანა ბანკის საიტზე
                        window.location.href = paymentData.checkoutUrl;
                        return;
                    } else {
                        throw new Error(paymentData.message || "ვერ მოხერხდა ლინკის გენერაცია");
                    }
                } catch (payErr) {
                    console.error("❌ TBC/Flitt Error:", payErr);
                    alert("ბანკთან დაკავშირება ვერ მოხერხდა. შეკვეთა გაფორმებულია, შეგიძლიათ მოგვიანებით გადაიხადოთ.");
                    navigate(`/order/${createdOrder._id}`);
                    return;
                }
            }

            // 3. თუ Cash On Delivery-ა
            clearCart();
            localStorage.removeItem('cartItems');
            navigate('/complete');

        } catch (error) {
            console.error("Order Error:", error);
            const errorMsg = error.response?.data?.message || error.message;
            alert(`შეცდომა: ${errorMsg}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans relative">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>

            {/* HEADER */}
            <div className="bg-black text-white h-20 w-full px-8 fixed top-0 left-0 z-50 shadow-md flex items-center justify-between">
                <div className="flex-grow flex items-center justify-center relative lg:pr-[380px]">
                    <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 hidden md:block">
                        Secure Checkout
                    </span>
                    <Link to="/" className="text-2xl md:text-3xl font-serif tracking-widest text-white whitespace-nowrap z-10 mx-auto lg:translate-x-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                        N.T.Style
                    </Link>
                </div>
                <div className="hidden lg:flex w-[380px] flex-shrink-0 items-center justify-end px-8 border-l border-gray-800/30">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span className="tracking-widest">SECURE PAYMENT</span>
                    </div>
                </div>
            </div>

            <div className="flex w-full">
                {/* --- LEFT SIDE: FORM --- */}
                <div className="flex-grow min-h-screen pr-0 lg:pr-[380px] pt-28 bg-white">
                    <div className="max-w-[600px] mx-auto px-6 pb-20">

                        {/* Progress Bar */}
                        <div className="flex justify-center items-center mb-16">
                            <div className="flex flex-col items-center relative z-10 cursor-pointer" onClick={() => navigate('/shipping')}>
                                <div className="w-8 h-8 rounded-full border border-black bg-white text-black flex items-center justify-center mb-2 text-[13px] font-serif">
                                    <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 absolute -bottom-6 w-32 text-center">Shipping</span>
                            </div>
                            <div className="w-32 h-[1px] bg-black mx-2 -mt-6"></div>

                            <div className="flex flex-col items-center relative z-10">
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-white text-black flex items-center justify-center mb-2 text-[13px] font-serif">2</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black absolute -bottom-6 w-32 text-center">Payment</span>
                            </div>
                            <div className="w-32 h-[1px] bg-gray-200 mx-2 -mt-6"></div>

                            <div className="flex flex-col items-center relative z-10 opacity-40">
                                <div className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center mb-2 text-[13px] font-serif">3</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 w-32 text-center">Complete</span>
                            </div>
                        </div>

                        {/* Shipping Summary */}
                        <h2 className="text-xl font-serif mb-4 border-b border-gray-200 pb-2">Shipping Details</h2>
                        <div className="flex justify-between mb-10 text-[13px] text-gray-700">
                            <div className="w-1/2 pr-4">
                                <p className="font-bold text-[10px] uppercase tracking-widest mb-2 text-black">Ship To</p>
                                {shippingData && (
                                    <>
                                        <p>{shippingData.firstName} {shippingData.lastName}</p>
                                        <p>{shippingData.address}, {shippingData.city}</p>
                                        <p>{shippingData.country}, {shippingData.zip}</p>
                                        <p>{shippingData.phone}</p>
                                    </>
                                )}
                                <p className="underline mt-2 cursor-pointer hover:text-black" onClick={() => navigate('/shipping')}>Change</p>
                            </div>
                        </div>

                        {/* Payment Selection */}
                        <h2 className="text-xl font-serif mb-4 border-b border-gray-200 pb-2">Payment Method</h2>

                        <div className="border-b border-gray-200 py-6">
                            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setPaymentMethod('tbc')}>
                                <RadioButton selected={paymentMethod === 'tbc'} />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Credit / Debit Card (TBC Bank)</span>
                                    <span className="text-[11px] text-gray-500">Secure payment via TBC Bank gateway</span>
                                </div>
                                <div className="ml-auto flex gap-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                                </div>
                            </div>
                            {paymentMethod === 'tbc' && (
                                <div className="mt-4 ml-8 p-4 bg-blue-50 text-blue-800 text-[12px] border border-blue-100">
                                    <p>თქვენ გადამისამართდებით TBC ბანკის დაცულ გვერდზე გადახდის დასასრულებლად.</p>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-200 py-6">
                            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setPaymentMethod('cod')}>
                                <RadioButton selected={paymentMethod === 'cod'} />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Cash on Delivery</span>
                                    <span className="text-[11px] text-gray-500">Pay when you receive the order</span>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="mt-8 pt-6">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className={`w-full bg-black text-white py-4 uppercase text-[12px] font-bold tracking-[0.2em] transition ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                            >
                                {isProcessing ? 'Processing...' : `Place Order • ${finalTotal.toFixed(2)} GEL`}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: SUMMARY --- */}
                <div className="hidden lg:block w-[380px] bg-[#F5F5F5] border-l border-gray-200 h-screen fixed right-0 top-0 z-[60]">
                    <div className="pt-28 px-10 pb-10">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Order Summary</h3>
                            <Link to="/cart" className="text-[11px] underline text-gray-500 hover:text-black">Edit</Link>
                        </div>

                        <div className="space-y-6 mb-10 overflow-y-auto max-h-[50vh]">
                            {cartItems.map((item) => (
                                <div key={item._id + item.size} className="flex gap-4">
                                    <div className="w-20 h-28 flex-shrink-0 bg-white border border-gray-200">
                                        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover object-top" />
                                    </div>
                                    <div className="flex-grow pt-1">
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1">{item.designer}</h4>
                                        <p className="text-[12px] text-gray-600 leading-tight mb-1 line-clamp-2">{item.name}</p>
                                        <p className="text-[10px] text-gray-500 mb-2">{item.size} | Qty: {item.quantity}</p>
                                        <p className="text-[11px] font-bold mt-1">{item.price} GEL</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-300 pt-6 text-[13px] text-gray-800">
                            <div className="flex justify-between mb-3">
                                <span>Subtotal</span>
                                <span>{cartTotals.totalPrice.toFixed(2)} GEL</span>
                            </div>
                            {promoDiscount > 0 && (
                                <div className="flex justify-between mb-3 text-green-700">
                                    <span>Discount</span>
                                    <span>- {promoDiscount.toFixed(2)} GEL</span>
                                </div>
                            )}
                            <div className="flex justify-between mb-5">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between font-bold text-[16px] mt-4 pt-4 border-t border-gray-300">
                                <span>Total to pay</span>
                                <span>{finalTotal.toFixed(2)} GEL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentScreen;