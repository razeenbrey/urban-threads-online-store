import { useState } from 'react';
import { useAuth } from '../services/AuthContext';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';

import LoginModal from './LoginModal';
import CartOffCanvas from './CartView/CartOffCanvas';

function Navbar() {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => setShowCart(true);

  const handleProfileClick = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
    } else {
      if (window.confirm(`Logout ${currentUser.email}?`)) {
        logout();
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">🧵 Urban Threads</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/products">Products</a>
              </li>
            </ul>
            
            <div className="d-flex align-items-center gap-3">

                <IconButton onClick={handleShowCart} sx={{ p: 0 }}>
                    <ShoppingCartIcon color='primary' sx={{ fontSize: 40 }} />
                </IconButton>

                
              <div style={{ cursor: 'pointer' }} onClick={handleProfileClick}>
                <AccountCircleIcon color="primary" sx={{ fontSize: 40 }} />
              </div>
              
              {currentUser ? (
                <div className="text-end">
                  <div className="fw-bold">
                    {userData?.displayName || currentUser.email}
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger mt-1" 
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-outline-success p-2" 
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      <CartOffCanvas show={showCart} setShow={setShowCart}/>
    </>
  );
}

export default Navbar;