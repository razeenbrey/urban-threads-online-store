import ProductCard from './ProductCard';
import HeroProducts from './/HeroProducts.jpg';
import Sidebar from './Sidebar';
import ProductModal from './ProductModal';
import LoginModal from '../../components/LoginModal';

// import { getAllProducts } from '../../services/productService';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../services/AuthContext';
import { addToCart } from '../../services/CartServices';

function Products(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const { currentUser } = useAuth(); // get user detaiks

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        document.body.style.overflow = 'auto';
    };

    const handleAddToCart = (product) => {
        if (!currentUser) {
            setPendingProduct(product);
            setIsLoginModalOpen(true);
            return false;
        }
        // addToCart(product)
        addToCart(currentUser.id, product.id)
        alert("Added to cart!")
        return true; // user signed in, proceed with add to cart
    };

    // after login, add pending item to cart.
    const handleLoginSucess = () => {
        if (pendingProduct) {
            // addToCart(pendingProduct)
            addToCart(currentUser.id, pendingProduct.id)
            alert("Added to cart!")
            setPendingProduct(null);
        }
    };

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;
    if (products.length === 0) return <div>No products available.</div>;

    return(
        <div className="Products">

            <div className="card text-bg-dark">
            <div style={{ maxWidth: '6720px', height: '250px', objectFit:"cover", objectPosition:'top' }} className="mx-auto border overflow-hidden">
                <img src={HeroProducts} style={{ objectPosition:'bottom' }} className="card-img" alt="..."/>
            </div>
            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center z-1">
                <h1 className="card-title">Our hoodies</h1>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            </div>
            
            <div class="d-flex justify-content-between flex-column">
                <div class="row">
                    <div class="col">
                        1 of 3
                    </div>
                    <div className="products-grid">
                        
                        {products.map(product => (<ProductCard key={product.id}
                                                                product={product}
                                                                onProductClick={() => openModal(product)} />
                    ))}

                    </div>
                    <div class="col">
                        3 of 3
                    </div>
                </div>
            </div>
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddToCart = {handleAddToCart}
            />

            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => {
                    setIsLoginModalOpen(false);
                    setPendingProduct(null);
                }}
            />

            
        </div>
    )
}

export default Products;