import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ControlTray.scss';

const ControlTray: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className={`control-tray ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="control-tray-header">
        <h2>Limited Time Offers</h2>
        <button 
          className="toggle-button" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="control-tray-content">
          <div className="container">
            <div className="offers-slider">
              <div className="offer-item">
                <span className="discount-badge">50% OFF</span>
                <h3>Spring Electronics Sale</h3>
                <p>Save on laptops, TVs, and smart home devices</p>
                <Link to="/electronics" className="offer-btn">Shop Now</Link>
              </div>
              
              <div className="offer-item">
                <span className="discount-badge">BOGO</span>
                <h3>Pet Food &amp; Treats</h3>
                <p>Buy one, get one 50% off on select brands</p>
                <Link to="/dog" className="offer-btn">Shop Now</Link>
              </div>
              
              <div className="offer-item">
                <span className="discount-badge">30% OFF</span>
                <h3>Spring Fashion</h3>
                <p>New arrivals for the season</p>
                <Link to="/clothing" className="offer-btn">Shop Now</Link>
              </div>
              
              <div className="offer-item">
                <span className="discount-badge">$20 OFF</span>
                <h3>FastBuy Member Exclusive</h3>
                <p>$100+ purchase when you sign up today</p>
                <Link to="/deals" className="offer-btn">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlTray;