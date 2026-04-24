// Sidebar.jsx
import React from 'react';
import './Sidebar.css';

function Sidebar({ selectedCategory, onCategoryChange }) {
  const categories = ['all', 'Hoodies', 'T-Shirts', 'Jackets', 'Pants'];
  
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category}>
            <button
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;