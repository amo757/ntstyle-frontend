import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // შეცვალე შენი ბექენდის რეალური URL-ით თუ საჭიროა
                const { data } = await axios.get(`https://ntstyle-api.onrender.com/api/orders/${orderId}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <div className="p-10 text-center">იტვირთება...</div>;
    if (error) return <div className="p-10 text-center text-red-500">შეცდომა: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">შეკვეთა #{order._id.slice(-6)}</h1>
            
            <div className="bg-white shadow-md rounded-lg p-6 border">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">სტატუსი:</h2>
                    {order.isPaid ? (
                        <p className="text-green-600 font-bold text-xl">✅ გადახდილია ({new Date(order.paidAt).toLocaleString()})</p>
                    ) : (
                        <p className="text-red-500 font-bold">❌ გადახდა არ ფიქსირდება</p>
                    )}
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-2">ნივთები:</h2>
                    {order.orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between py-2 border-b last:border-0">
                            <span>{item.name} x {item.quantity}</span>
                            <span>{item.price * item.quantity} GEL</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded">
                    <span className="text-xl font-bold">ჯამური თანხა:</span>
                    <span className="text-xl font-bold text-blue-600">{order.totalPrice} GEL</span>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link to="/" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
                    მთავარ გვერდზე დაბრუნება
                </Link>
            </div>
        </div>
    );
};

export default OrderScreen;