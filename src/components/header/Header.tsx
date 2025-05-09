import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from '../../contexts/CartContext';
import './Header.scss';

export const Header = () => {
  const location = useLocation();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
  const { items } = useCart();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="main-header">
      <div className="top-banner">
        <div className="container">
          <p>SPRING SALE: Up to 50% OFF select items! Limited time only.</p>
        </div>
      </div>
      
      <div className="header-main container">
        <div className="logo-container">
          <Link to="/" className="fast-buy-logo">
            <div className="logo-icon">FB</div>
            <span className="logo-text">FAST<span className="logo-highlight">BUY</span></span>
          </Link>
        </div>
        
        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="action-btn">
                <i className="bi bi-person-fill"></i>
                <span>Account</span>
              </Link>
              <Link to="/personalized" className="action-btn">
                <i className="bi bi-stars"></i>
                <span>Personalized</span>
              </Link>
              <button 
                className="action-btn"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <button 
              className="action-btn"
              onClick={() => loginWithPopup()}
            >
              <i className="bi bi-person"></i>
              <span>Sign In</span>
            </button>
          )}
          
          <Link to="/cart" className="action-btn">
            <i className="bi bi-cart3"></i>
            <span>Cart</span>
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </Link>
        </div>
      </div>
      
      <nav className="main-nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/electronics" 
                className={location.pathname === '/electronics' ? 'active' : ''}
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link 
                to="/clothing"
                className={location.pathname === '/clothing' ? 'active' : ''}
              >
                Clothing
              </Link>
            </li>
            <li>
              <Link 
                to="/petsupplies"
                className={location.pathname === '/petsupplies' ? 'active' : ''}
              >
                Pet Supplies
              </Link>
            </li>
            
            <li>
              <Link 
                to="/instore"
                className={location.pathname === '/instore' ? 'active' : ''}
              >
                Services
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;