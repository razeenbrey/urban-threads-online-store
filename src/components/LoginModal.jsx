import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";

function LoginModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, signup, error: authError } = useAuth();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      setEmail("");
      setPassword("");
      setDisplayName("");
      setLocalError("");
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    try {
      if (isLogin) {
        
        await login(email, password);
      } else {
        
        await signup(email, password, displayName);
      }
      onClose(); 
    } catch (err) {
      setLocalError(authError || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={onClose}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {(localError || authError) && (
                <div className="alert alert-danger" role="alert">
                  {localError || authError}
                </div>
              )}
              
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="displayName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {isLogin && (
                  <div className="form-text">
                    <button 
                      type="button" 
                      className="btn btn-link p-0 mt-1"
                      onClick={() => {}}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <button 
                  type="button" 
                  className="btn btn-link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setLocalError("");
                  }}
                >
                  {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                </button>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                Close
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;