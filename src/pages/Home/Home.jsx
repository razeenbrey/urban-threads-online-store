import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { seedProducts } from '../../services/seed';

import LocalImage from './local.jpg';

function Home() {
  // TEMP SEED BLOCK (DELETE AFTER RUNNING `npm start` ONCE)
  useEffect(() => {
    seedProducts()
      .then((message) => {
        console.log('[SEED SUCCESS]', message);
      })
      .catch((error) => {
        console.error('[SEED ERROR]', error);
      });
  }, []);
  // END TEMP SEED BLOCK

  return (
    <div className="home">
      

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Urban Threads</h1>
          <p>Streetwear for the modern soul</p>
          <Link to="/products" className="shop-btn">Shop Now</Link>
        </div>
      </section>


      <section className="about">
        <div className="container">
          <h2>Who We Are</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Urban Threads was born in 2024 with a simple mission - create comfortable, 
                stylish streetwear that doesn't cost the earth. Based in Cape Town, 
                we're a small team of designers who love what we do.
              </p>
            </div>
            <div className="about-image">
              <img src={LocalImage} alt="Local manufacturing" />
            </div>
          </div>
        </div>
      </section>


      <section className="what-we-do">
        <div className="container">
          <h2>What We Do</h2>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>Sustainably Sourced</h3>
              <p>All our cotton is ethically sourced from local farmers</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🧵</div>
              <h3>Locally Made</h3>
              <p>Designed and manufactured right here in South Africa</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💪</div>
              <h3>Built to Last</h3>
              <p>Quality materials that survive daily wear and tear</p>
            </div>
          </div>
        </div>
      </section>


      <section className="reviews">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="review-cards">
            <div className="review">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Best hoodie I've ever owned. Super comfortable and fits perfectly."</p>
              <h4>- Thando M.</h4>
            </div>
            <div className="review">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Love that it's locally made. The quality is amazing for the price."</p>
              <h4>- Sarah K.</h4>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;