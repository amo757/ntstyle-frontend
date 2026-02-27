import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ... (ProductCard და ProductList ფუნქციები იგივე რჩება) ...
// ... (Your existing ProductCard and ProductList component code) ...

const ProductCard = ({ product }) => (
    <Link to={`/product/${product.slug}`} className="group cursor-pointer block">
        <div className="relative overflow-hidden mb-3">
            <img 
                src={product.images[0] || `https://placehold.co/400x550/F8F8F8/333333?text=${product.name.replace(/\s/g, '+')}`} 
                alt={product.name} 
                className="w-full h-auto object-cover transition duration-500 group-hover:scale-[1.03]"
            />
        </div>
        <div className="text-center mt-2">
            <p className="text-xs text-gray-500 uppercase font-serif">{product.designerNotes}</p>
            <p className="text-sm font-semibold uppercase tracking-wider mt-1 hover:underline">{product.name}</p>
            <p className="text-sm text-secondary mt-1">{product.price} GEL</p>
        </div>
    </Link>
);


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products'); 
                
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts(mockProducts);
                }
                setLoading(false);

            } catch (err) {
                setError('პროდუქტების ჩატვირთვა ვერ მოხერხდა. ვიყენებთ საცდელ მონაცემებს.');
                setLoading(false);
                setProducts(mockProducts);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-lg font-serif tracking-widest uppercase">იტვირთება...</div>;
    }

    if (error && (!products || products.length === 0)) {
        return <div className="text-center py-20 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.isArray(products) && products.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
            ))}
        </div>
    );
};

export default ProductList;

// 🛑 განახლებული Mock მონაცემები (ინგლისურად)
const mockProducts = [
    { _id: '1', name: 'Black Evening Gown', price: 1800, slug: 'black-evening-gown', designerNotes: 'Gucci Style', images: [] },
    { _id: '2', name: 'Satin Robe', price: 750, slug: 'satin-robe', designerNotes: 'Chanel Style', images: [] },
    { _id: '3', name: 'Silk Wide Pants', price: 900, slug: 'silk-wide-pants', designerNotes: 'Minimalism', images: [] },
    { _id: '4', name: 'Embroidered Top', price: 550, slug: 'embroidered-top', designerNotes: 'Handmade Detail', images: [] },
];

