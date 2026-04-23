import React, { useEffect, useState } from 'react';
import { addToCart } from '../../services/CartServices';
import { useAuth } from '../../services/AuthContext';

import LoginModal from '../../components/LoginModal';

import './ProductModal.css';

function ProductModal({ product, isOpen, onClose }) {

    const { currentUser } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        if (!currentUser) {
            setIsLoginModalOpen(true);
        } else {
            addToCart(currentUser.uid, product);
            alert("Added to cart!");
        }
    };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-content">
          <div className="modal-image-section">
            <img 
              src={product.imageURL} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
          
          <div className="modal-info-section">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="modal-price">
              R {product.price.toFixed(2)}
            </div>
            
            <div className="modal-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="modal-actions">
              <button className="add-to-cart-btn"
                onClick={
                    () => {
                        if (!currentUser) {
                            // Not logged in - show login modal
                            setIsLoginModalOpen(true);
                            } else {
                            // Logged in - add to cart
                            addToCart(currentUser.uid, product);
                        }
                    }
                }
              >
                Add to Cart
              </button>

            </div>
            
            <div className="modal-details">
              <h4>Product Details</h4>
              <ul>
                <li>Category: {product.category}</li>
                <li>SKU: #{product.id}</li>
                <li>Free shipping on orders R500+</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;