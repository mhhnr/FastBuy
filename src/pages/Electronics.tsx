import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Electronics.scss';

const ElectronicsProducts = [
  {
    id: 101,
    name: "Samsung 55\" 4K QLED Smart TV",
    category: "TVs",
    reviews: 345,
    price: 699.99,
    discountedPrice: 599.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Samsung",
    features: ["4K UHD", "QLED Display", "Smart TV Features", "Voice Control"]
  },
  {
    id: 102,
    name: "Apple MacBook Air 13\" M2",
    category: "Laptops",
    reviews: 412,
    price: 999.99,
    discountedPrice: 899.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Apple",
    features: ["M2 Chip", "13-inch Retina Display", "16GB RAM", "512GB SSD"]
  },
  {
    id: 103,
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    category: "Audio",
    reviews: 278,
    price: 349.99,
    discountedPrice: 299.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Sony",
    features: ["Noise Cancellation", "30-hour Battery", "Touch Controls", "Hi-Res Audio"]
  },
  {
    id: 104,
    name: "Google Nest Smart Home Hub",
    category: "Smart Home",
    reviews: 189,
    price: 129.99,
    discountedPrice: 99.99,
    image: "https://cdn.mos.cms.futurecdn.net/LysibXqbRQTYp2ajPrga54.jpg",
    brand: "Google",
    features: ["Voice Assistant", "Smart Home Control", "Video Calling", "Weather Updates"]
  },
  {
    id: 105,
    name: "Canon EOS R7 Mirrorless Camera",
    category: "Cameras",
    reviews: 156,
    price: 1499.99,
    discountedPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Canon",
    features: ["32.5MP Sensor", "4K Video", "In-body Stabilization", "RF Lens Mount"]
  },
  {
    id: 106,
    name: "Xbox Series X Console",
    category: "Gaming",
    reviews: 302,
    price: 499.99,
    discountedPrice: 469.99,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Microsoft",
    features: ["4K Gaming", "120 FPS", "1TB SSD", "Ray Tracing"]
  }
];

const ElectronicsDeals = [
  {
    id: 201,
    name: "Dell XPS 15 Laptop",
    category: "Laptops",
    reviews: 245,
    price: 1799.99,
    discountedPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Dell",
    features: ["Intel i9", "32GB RAM", "1TB SSD", "NVIDIA RTX 3050Ti"]
  },
  {
    id: 202,
    name: "LG C2 65\" OLED TV",
    category: "TVs",
    reviews: 198,
    price: 2499.99,
    discountedPrice: 1999.99,
    image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "LG",
    features: ["4K OLED", "120Hz", "Dolby Vision", "WebOS"]
  },
  {
    id: 203,
    name: "Bose QuietComfort Earbuds",
    category: "Audio",
    reviews: 167,
    price: 279.99,
    discountedPrice: 229.99,
    image: "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Bose",
    features: ["Noise Cancelling", "Wireless", "Water Resistant", "Touch Controls"]
  },
  {
    id: 204,
    name: "ASUS ROG Gaming Monitor",
    category: "Monitors",
    reviews: 132,
    price: 899.99,
    discountedPrice: 749.99,
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "ASUS",
    features: ["32-inch", "4K UHD", "144Hz", "1ms Response"]
  }
];

const TrendingProducts = [
  {
    id: 301,
    name: "Samsung Galaxy S23 Ultra",
    category: "Smartphones",
    reviews: 356,
    price: 1199.99,
    discountedPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Samsung",
    features: ["200MP Camera", "Snapdragon 8 Gen 2", "5000mAh Battery", "S-Pen"]
  },
  {
    id: 302,
    name: "iPad Pro 12.9\" M2",
    category: "Tablets",
    reviews: 213,
    price: 1099.99,
    discountedPrice: 999.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Apple",
    features: ["M2 Chip", "12.9-inch XDR Display", "ProMotion", "Apple Pencil Support"]
  },
  {
    id: 303,
    name: "DJI Mavic 3 Pro Drone",
    category: "Drones",
    reviews: 98,
    price: 1599.99,
    discountedPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "DJI",
    features: ["4/3 CMOS Sensor", "46 Min Flight Time", "15km Video Transmission", "4K/120fps"]
  },
  {
    id: 304,
    name: "Dyson V15 Detect Vacuum",
    category: "Home Appliances",
    reviews: 189,
    price: 749.99,
    discountedPrice: 649.99,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Dyson",
    features: ["Laser Dust Detection", "60-min Runtime", "LCD Screen", "HEPA Filtration"]
  }
];

const ElectronicsCategories = [
  {
    id: 1,
    title: "TVs",
    icon: "bi-tv",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics/tvs"
  },
  {
    id: 2,
    title: "Laptops",
    icon: "bi-laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics/laptops"
  },
  {
    id: 3,
    title: "Audio",
    icon: "bi-headphones",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics/audio"
  },
  {
    id: 4,
    title: "Smart Home",
    icon: "bi-house-door",
    image: "https://i.pcmag.com/imagery/articles/06wLZC8lRWWcZnYbR2XQnKn-45.jpg",
    link: "/electronics/smart-home"
  },
  {
    id: 5,
    title: "Cameras",
    icon: "bi-camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics/cameras"
  },
  {
    id: 6,
    title: "Gaming",
    icon: "bi-controller",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics/gaming"
  },
  {
    id: 7,
    title: "Smartphones",
    icon: "bi-phone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics/smartphones"
  },
  {
    id: 8,
    title: "Accessories",
    icon: "bi-headset",
    image: "https://c.pxhere.com/images/dd/fb/32f6e4c9eff8c290ca3466946ce7-1595236.jpg!d",
    link: "/electronics/accessories"
  }
];

const Electronics = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [cartAnimatingProduct, setCartAnimatingProduct] = useState(null);
  
  const handleProductClick = (product: any) => {
    // Create a URL-friendly version of the product name
    const productSlug = product.name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')  // Remove special characters
      .replace(/\s+/g, '-');    // Replace spaces with hyphens
    
    // Navigate using product name instead of ID
    navigate(`/product/${productSlug}`, { 
      state: { 
        product,
        category: 'electronics'
      } 
    });
  };

  const navigateToCategory = (category: string) => {
    navigate(category);
  };

  const handleAddToCart = (e: any, product: any) => {
    e.stopPropagation();
    
    // Add to cart
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.discountedPrice || product.price,
      image: product.image,
      quantity: 1
    });
    
    // Set animation
    setCartAnimatingProduct(product.id);
    setIsCartAnimating(true);
    
    // Reset animation after delay
    setTimeout(() => {
      setIsCartAnimating(false);
      setCartAnimatingProduct(null);
    }, 1000);
  };

  return (
    <div className="electronics-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Electronics Banner"
          className="hero-image"
        />
        <div className="banner-content">
          <div className="banner-text">
            <h1>Electronics</h1>
            <h2>The latest in tech at unbeatable prices</h2>
            
            <div className="promo-badge">Limited Time Offer</div>
            
            <div className="offer-banner">
              <h3>Save up to $500</h3>
              <p>on select TVs, laptops, and smart home devices</p>
              <div className="button-container">
                <button className="shop-now-btn" onClick={() => navigate('/electronics/deals')}>
                  Shop Deals Now
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Circles */}
      <div className="container">
        <h2 className="section-title">Browse Categories</h2>
        <div className="category-circles">
          {ElectronicsCategories.map((category) => (
            <div 
              key={category.id} 
              className="category-circle"
              onClick={() => navigateToCategory(category.link)}
            >
              <div className="circle-image">
                <img src={category.image} alt={category.title} />
                <div className="circle-overlay">
                  <i className={`bi ${category.icon}`}></i>
                </div>
              </div>
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Deals */}
      <div className="container">
        <div className="deals-banner">
          <div className="deals-content">
            <div className="deals-badge">Hot Deals</div>
            <h2>Limited Time Offers</h2>
            <p>Save big on these top electronics. Hurry, offers end soon!</p>
            <button className="view-all-btn" onClick={() => navigate('/electronics/deals')}>
              View All Deals
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="deals-image">
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Electronics Deals" />
          </div>
        </div>
      </div>
      
      {/* Special Deals */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Special Deals</h2>
          <button className="view-all-products" onClick={() => navigate('/electronics/special-offers')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {ElectronicsDeals.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className={`card-inner ${isCartAnimating && cartAnimatingProduct === product.id ? 'animate-to-cart' : ''}`}>
                <div className="product-image">
                  <div className="discount-tag">
                    -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                  </div>
                  <div className="product-badge">Deal</div>
                  <img src={product.image} alt={product.name} />
                  <div className="quick-actions">
                    <button 
                      className="quick-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className="quick-add"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <div className="reviews">
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </div>
                      <span>{product.reviews} Reviews</span>
                    </div>
                  </div>
                  <div className="product-features">
                    <ul>
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="product-price">
                    <span className="original-price">${product.price.toFixed(2)}</span>
                    <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                    <span className="savings-badge">Save ${(product.price - product.discountedPrice).toFixed(2)}</span>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                    <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Electronics</h2>
          <button className="view-all-products" onClick={() => navigate('/electronics/all')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {ElectronicsProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className={`card-inner ${isCartAnimating && cartAnimatingProduct === product.id ? 'animate-to-cart' : ''}`}>
                <div className="product-image">
                  {product.discountedPrice && (
                    <div className="discount-tag">
                      -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </div>
                  )}
                  <div className="product-badge">Featured</div>
                  <img src={product.image} alt={product.name} />
                  <div className="quick-actions">
                    <button 
                      className="quick-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className="quick-add"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <div className="reviews">
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </div>
                      <span>{product.reviews} Reviews</span>
                    </div>
                  </div>
                  <div className="product-features">
                    <ul>
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="product-price">
                    {product.discountedPrice ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>
                        <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                        <span className="savings-badge">Save ${(product.price - product.discountedPrice).toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="current-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                    <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products Banner */}
      <div className="container">
        <div className="trending-banner">
          <div className="trending-content">
            <div className="trending-badge">Trending Now</div>
            <h2>Tech That's Making Waves</h2>
            <p>Discover the most popular electronics everyone's talking about in 2025.</p>
            <button className="trending-btn" onClick={() => navigate('/electronics/trending')}>
              Explore Trending
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <button className="view-all-products" onClick={() => navigate('/electronics/trending')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid trending-grid">
          {TrendingProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card trending-card"
              onClick={() => handleProductClick(product)}
            >
              <div className={`card-inner ${isCartAnimating && cartAnimatingProduct === product.id ? 'animate-to-cart' : ''}`}>
                <div className="product-image">
                  {product.discountedPrice && (
                    <div className="discount-tag">
                      -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </div>
                  )}
                  <div className="product-badge trending-badge">Trending</div>
                  <img src={product.image} alt={product.name} />
                  <div className="quick-actions">
                    <button 
                      className="quick-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className="quick-add"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <div className="reviews">
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </div>
                      <span>{product.reviews} Reviews</span>
                    </div>
                    <div className="trending-icon">
                      <i className="bi bi-graph-up-arrow"></i>
                      <span>Popular</span>
                    </div>
                  </div>
                  <div className="product-features">
                    <ul>
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="product-price">
                    {product.discountedPrice ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>
                        <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                        <span className="savings-badge">Save ${(product.price - product.discountedPrice).toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="current-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                    <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h2>Stay Updated on Latest Tech</h2>
              <p>Subscribe to our newsletter for exclusive deals, new product announcements, and tech tips.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button>Subscribe <i className="bi bi-send"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Brands */}
      <div className="container">
        <h2 className="section-title">Top Tech Brands</h2>
        <div className="brands-container">
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" alt="Sony" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg" alt="LG" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;