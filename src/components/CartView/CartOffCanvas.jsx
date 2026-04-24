import React, { useState, useEffect } from 'react';
import { Offcanvas, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';
import { removeFromCart } from '../../services/CartServices';
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import './CartOffCanvas.css'

function CartOffCanvas({ show, setShow }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const handleClose = () => setShow(false);

  
  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const userRef = doc(db, "users", currentUser.uid);
    
  
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setCartItems(userData.cart || []);
      } else {
        setCartItems([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching cart:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  
  const handleRemoveFromCart = async (productId) => {
    if (!currentUser) return;
    
    setUpdating(true);
    try {
      await removeFromCart(currentUser.uid, productId);
  
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove item from cart");
    } finally {
      setUpdating(false);
    }
  };

  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  
  const formatPrice = (price) => {
    return `R ${price?.toFixed(2) || '0.00'}`;
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" size="lg">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-5">
            <p>Your cart is empty</p>
            <Button variant="primary" onClick={handleClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ListGroup variant="flush" className="cart-items-list">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={item.id || index} className="cart-item">
                  <div className="cart-item-image">
                    {item.imageURL && (
                      <img 
                        src={item.imageURL} 
                        alt={item.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => e.target.src = '/placeholder-image.jpg'}
                      />
                    )}
                  </div>
                  
                  <div className="cart-item-details flex-grow-1">
                    <h6 className="cart-item-name">{item.name}</h6>
                    <p className="cart-item-category text-muted small">{item.category}</p>
                    <div className="cart-item-price">
                      {formatPrice(item.price)}
                    </div>
                    
  
                    {item.quantity && (
                      <div className="cart-item-quantity mt-2">
                        <small>Quantity: {item.quantity}</small>
                      </div>
                    )}
                  </div>
                  
                  <div className="cart-item-actions">
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                      disabled={updating}
                      className="delete-btn"
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            
  
            <div className="cart-summary mt-4 pt-3 border-top">
              <div className="d-flex justify-content-between mb-3">
                <strong>Subtotal:</strong>
                <strong>{formatPrice(calculateTotal())}</strong>
              </div>
              
              <div className="d-flex justify-content-between mb-2 text-muted small">
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3 text-muted small">
                <span>Tax:</span>
                <span>Included</span>
              </div>
              
              <Button variant="success" className="w-100 mb-2" size="lg">
                Proceed to Checkout
              </Button>
              
              <Button variant="outline-secondary" className="w-100" onClick={handleClose}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartOffCanvas;