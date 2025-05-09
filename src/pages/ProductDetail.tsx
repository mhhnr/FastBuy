import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import './ProductDetail.scss';

// Define the product data structure
const productData = [
  {
    id: 'dell-xps-15-laptop',
    name: "Dell XPS 15 Laptop",
    description: "Premium 15-inch laptop with Intel Core i9 processor",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    category: "electronics",
    reviews: 128
  },
  {
    id: 'luxury-leather-handbag',
    name: "Luxury Leather Handbag",
    description: "Handcrafted genuine leather handbag with gold accents",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    category: "clothing",
    reviews: 89
  },
  {
    id: 'premium-cat-litter-box-with-hood',
    name: "Premium Cat Litter Box with Hood",
    description: "Large covered litter box with odor control",
    price: 89.99,
    image: "https://m.media-amazon.com/images/I/31hiAtjwQZL.jpg",
    category: "petsupplies",
    reviews: 256
  }
];

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  
  const product = productData.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);

  // Set breadcrumbs based on product category
  const breadcrumbs = product ? [product.category.charAt(0).toUpperCase() + product.category.slice(1), product.name] : [];

  // Redirect if product not found
  useEffect(() => {
    if (!product && productId) {
      navigate('/');
    }
  }, [product, productId, navigate]);

  if (!product) {
    return <div style={{padding: 40, fontSize: 24, color: 'red'}}>Product not found for id: {productId}</div>;
  }

  return (
    <div className="product-detail-page">
      {/* Top Promo Banner */}
      <div className="promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9* ›</a>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span>{crumb}</span>
            {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="product-container">
        {/* Left Column - Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
            <span className="zoom-hint">Hover over image to zoom in</span>
          </div>
          <div className="thumbnail-list">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="thumbnail">
                <img src={product.image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <button className="favorite-btn">♡</button>
          </div>

          <div className="brand">
            <span>Item #{product.id}</span>
            <div className="reviews">
              <span className="stars">★★★★½</span>
              <span className="count">{Math.abs(product.reviews)} reviews</span>
            </div>
          </div>

          <div className="price-section">
            <div className="price">${product.price}</div>
            <div className="afterpay">
              or 4 interest-free payments of ${(product.price / 4).toFixed(2)} with <span className="afterpay-logo">afterpay</span> ⓘ
            </div>
          </div>

          <div className="product-options">
            <div className="flavor">
              <h3>Flavor:</h3>
              <div className="option">Salmon & Rice</div>
            </div>

            <div className="size">
              <h3>Size: {selectedSize}</h3>
              <div className="size-options">
                {['6 Lb', '18 Lb', '34 Lb'].map((size) => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pickup-section">
              <h3>Pick up in store</h3>
              <p>Most orders ready within 2 hours</p>
              <div className="store-info">
                <p>In stock at <strong>Melbourne</strong></p>
                <a href="#">Change store</a>
              </div>

              <div className="quantity-selector">
                <label>Quantity</label>
                <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="points-earned">
                <span className="icon">🏷️</span>
                Estimated {quantity * 599} points earned
              </div>

            </div>
          </div>

          <div className="button-group">
            <button 
              className="add-to-cart-btn" 
              onClick={() => addToCart({...product, quantity})}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '14px 28px',
                background: '#0055a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 85, 166, 0.25)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = '#004485';
                btn.style.boxShadow = '0 4px 12px rgba(0, 85, 166, 0.35)';
                btn.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = '#0055a6';
                btn.style.boxShadow = '0 2px 8px rgba(0, 85, 166, 0.25)';
                btn.style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => {
                const btn = e.currentTarget;
                btn.style.transform = 'translateY(1px)';
                btn.style.boxShadow = '0 2px 6px rgba(0, 85, 166, 0.2)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🛒</span>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 