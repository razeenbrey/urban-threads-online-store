// Products.jsx - Updated version
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import HeroProducts from './HeroProducts.jpg';
import Sidebar from './Sidebar';
import ProductModal from './ProductModal';
import LoginModal from '../../components/LoginModal';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../services/AuthContext';
import { addToCart } from '../../services/CartServices';
import './Products.css'; // Import the CSS

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { currentUser } = useAuth();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
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
    addToCart(currentUser.uid, product);
    alert(`${product.name} added to cart!`);
    return true;
  };

  const handleLoginSuccess = () => {
    if (pendingProduct && currentUser) {
      addToCart(currentUser.uid, pendingProduct);
      alert(`${pendingProduct.name} added to cart!`);
      setPendingProduct(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading products</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="products">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={HeroProducts} alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Our Collection</h1>
          <p className="hero-subtitle">
            Discover our premium hoodies, designed for comfort and style
          </p>
        </div>
      </div>

      {/* Products Layout with Sidebar */}
      <div className="products-layout">
        {/* Sidebar for filtering */}
        <div className="sidebar">
          <Sidebar 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Main Products Grid */}
        <div className="main-content">
          <div className="products-info">
            <p>{filteredProducts.length} products found</p>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onProductClick={() => openModal(product)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddToCart={handleAddToCart}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingProduct(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default Products;