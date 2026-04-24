// ProductCard.jsx
import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onProductClick }) {
  return (
    <div className="product-card" onClick={onProductClick}>
      <div className="product-card-image">
        <img 
          src={product.imageURL} 
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        {product.category && (
          <span className="product-category-badge">{product.category}</span>
        )}
      </div>
      
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">
          {product.description?.substring(0, 60)}
          {product.description?.length > 60 ? '...' : ''}
        </p>
        <div className="product-card-footer">
          <span className="product-card-price">
            R {product.price?.toFixed(2)}
          </span>
          <button className="product-card-btn">Quick View</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;