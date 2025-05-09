import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './PetSupplies.scss';

const PetSuppliesProducts = [
  {
    id: 101,
    name: "Premium Organic Dog Food",
    category: "Dog Food",
    reviews: 345,
    price: 69.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Pawsome Nutrition",
    features: ["Organic Ingredients", "Grain-Free", "High Protein", "Vet Recommended"]
  },
  {
    id: 102,
    name: "Deluxe Cat Tree with Scratching Posts",
    category: "Cat Furniture",
    reviews: 412,
    price: 129.99,
    discountedPrice: 99.99,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "FurryComfort",
    features: ["Multiple Levels", "Built-in Toys", "Plush Cushions", "Sisal Scratching Posts"]
  },
  {
    id: 103,
    name: "Automatic Pet Feeder with Timer",
    category: "Feeding Supplies",
    reviews: 278,
    price: 79.99,
    discountedPrice: 69.99,
    image: "https://i.pinimg.com/originals/6e/66/69/6e6669e8b7118363e80ca0ca9802cdd5.jpg",
    brand: "PetTech",
    features: ["Programmable Feeding", "Portion Control", "LCD Display", "Voice Recorder"]
  },
  {
    id: 104,
    name: "Cozy Pet Bed with Orthopedic Foam",
    category: "Bedding",
    reviews: 189,
    price: 89.99,
    discountedPrice: 69.99,
    image: "https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "ComfyPets",
    features: ["Memory Foam", "Washable Cover", "Non-Slip Base", "Water-Resistant"]
  },
  {
    id: 105,
    name: "Interactive Dog Puzzle Toy Set",
    category: "Toys",
    reviews: 156,
    price: 39.99,
    discountedPrice: 29.99,
    image: "https://www.petharnessleash.com/photo/pl60824644-wooden_dog_puzzle_toys_interactive_toy_customized_color.jpg",
    brand: "PawPlay",
    features: ["Mental Stimulation", "Treat Dispensing", "Durable Materials", "Multiple Difficulty Levels"]
  },
  {
    id: 106,
    name: "Adjustable Dog Harness with Reflective Strips",
    category: "Collars & Leashes",
    reviews: 302,
    price: 34.99,
    discountedPrice: 29.99,
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "SafePaws",
    features: ["No-Pull Design", "Reflective Trim", "Padded Comfort", "Adjustable Fit"]
  }
];

const PetDeals = [
  {
    id: 201,
    name: "Smart Pet Water Fountain",
    category: "Feeding Supplies",
    reviews: 245,
    price: 59.99,
    discountedPrice: 44.99,
    image: "https://i5.walmartimages.com/asr/ff606bcb-2803-4cf4-8ebe-3b11da9c18cc.31f3d77ab970169c7aaf226f2fe2da4c.jpeg",
    brand: "PetTech",
    features: ["Filtered Water", "LED Indicator", "Quiet Operation", "Large Capacity"]
  },
  {
    id: 202,
    name: "Luxury Pet Carrier Backpack",
    category: "Travel",
    reviews: 198,
    price: 89.99,
    discountedPrice: 69.99,
    image: "https://images.unsplash.com/photo-1585071550721-fdb362ae2b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "TravelPet",
    features: ["Ventilated Design", "Padded Shoulder Straps", "Multiple Pockets", "Airline Approved"]
  },
  {
    id: 203,
    name: "Premium Cat Litter Box with Hood",
    category: "Litter Boxes",
    reviews: 167,
    price: 49.99,
    discountedPrice: 39.99,
    image: "https://m.media-amazon.com/images/I/31hiAtjwQZL.jpg",
    brand: "CleanPaws",
    features: ["Odor Control", "Easy Access Door", "Carbon Filter", "Easy to Clean"]
  },
  {
    id: 204,
    name: "Complete Dog Grooming Kit",
    category: "Grooming",
    reviews: 132,
    price: 79.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "GroomPro",
    features: ["Professional Clippers", "Multiple Attachments", "Nail Trimmer", "Carrying Case"]
  }
];

const TrendingPetProducts = [
  {
    id: 301,
    name: "GPS Pet Tracker Collar Attachment",
    category: "Tech Accessories",
    reviews: 356,
    price: 89.99,
    discountedPrice: 79.99,
    image: "https://images.unsplash.com/photo-1566677914817-56426959ae9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "PetTracker",
    features: ["Real-time Tracking", "Geofencing", "Activity Monitoring", "Waterproof"]
  },
  {
    id: 302,
    name: "Automatic Laser Cat Toy",
    category: "Toys",
    reviews: 213,
    price: 39.99,
    discountedPrice: 29.99,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "PawPlay",
    features: ["Random Patterns", "Adjustable Speed", "Timer Function", "Battery Operated"]
  },
  {
    id: 303,
    name: "Calming Dog Anxiety Jacket",
    category: "Anxiety Relief",
    reviews: 178,
    price: 49.99,
    discountedPrice: 39.99,
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "ComfortPets",
    features: ["Gentle Pressure", "Soft Material", "Adjustable Fit", "Machine Washable"]
  },
  {
    id: 304,
    name: "Self-Cleaning Litter Box",
    category: "Litter Boxes",
    reviews: 189,
    price: 199.99,
    discountedPrice: 179.99,
    image: "https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2022/09/Litter-Robot-3.jpg",
    brand: "CleanPaws",
    features: ["Automatic Cleaning", "Odor Control", "Waste Separator", "Low Maintenance"]
  }
];

const PetCategories = [
  {
    id: 1,
    title: "Dogs",
    icon: "bi-heart",
    image: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/dogs"
  },
  {
    id: 2,
    title: "Cats",
    icon: "bi-heart",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/cats"
  },
  {
    id: 3,
    title: "Food",
    icon: "bi-egg-fried",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/food"
  },
  {
    id: 4,
    title: "Toys",
    icon: "bi-controller",
    image: "https://m.media-amazon.com/images/I/A1POvcLTSHL.jpg",
    link: "/pet-supplies/toys"
  },
  {
    id: 5,
    title: "Beds",
    icon: "bi-moon",
    image: "https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/beds"
  },
  {
    id: 6,
    title: "Grooming",
    icon: "bi-scissors",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/grooming"
  },
  {
    id: 7,
    title: "Travel",
    icon: "bi-car-front",
    image: "https://images.unsplash.com/photo-1585071550721-fdb362ae2b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/travel"
  },
  {
    id: 8,
    title: "Health",
    icon: "bi-heart-pulse",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies/health"
  }
];

const PetSupplies = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [cartAnimatingProduct, setCartAnimatingProduct] = useState(null);
  
  const handleProductClick = (product:any) => {
    // Create a URL-friendly version of the product name
    const productSlug = product.name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')  // Remove special characters
      .replace(/\s+/g, '-');    // Replace spaces with hyphens
    
    // Navigate using product name instead of ID
    navigate(`/product/${productSlug}`, { 
      state: { 
        product,
        category: 'pet-supplies'
      } 
    });
  };

  const navigateToCategory = (category:string) => {
    navigate(category);
  };

  const handleAddToCart = (e:any, product:any) => {
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
    <div className="pet-supplies-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Pet Supplies Banner"
          className="hero-image"
        />
        <div className="banner-content">
          <div className="banner-text">
            <h1>Pet Supplies</h1>
            <h2>Everything your furry friends deserve</h2>
            
            <div className="promo-badge">Special Offer</div>
            
            <div className="offer-banner">
              <h3>Up to 30% Off</h3>
              <p>on premium pet food, toys, and accessories</p>
              <div className="button-container">
                <button className="shop-now-btn" onClick={() => navigate('/pet-supplies/deals')}>
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
          {PetCategories.map((category) => (
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
            <p>Save big on premium pet supplies. Hurry, offers end soon!</p>
            <button className="view-all-btn" onClick={() => navigate('/pet-supplies/deals')}>
              View All Deals
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="deals-image">
            <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Pet Deals" />
          </div>
        </div>
      </div>
      
      {/* Special Deals */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Special Deals</h2>
          <button className="view-all-products" onClick={() => navigate('/pet-supplies/special-offers')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {PetDeals.map((product) => (
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
          <h2 className="section-title">Featured Pet Supplies</h2>
          <button className="view-all-products" onClick={() => navigate('/pet-supplies/all')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {PetSuppliesProducts.map((product) => (
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
            <h2>Pet Care Innovations</h2>
            <p>Discover cutting-edge products to make pet care easier and more enjoyable.</p>
            <button className="trending-btn" onClick={() => navigate('/pet-supplies/trending')}>
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
          <button className="view-all-products" onClick={() => navigate('/pet-supplies/trending')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid trending-grid">
          {TrendingPetProducts.map((product) => (
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
              <h2>Get Pet Care Tips & Exclusive Offers</h2>
              <p>Subscribe to our newsletter for pet care advice, new product announcements, and exclusive deals.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button>Subscribe <i className="bi bi-send"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pet Brands */}
      <div className="container">
        <h2 className="section-title">Top Pet Brands</h2>
        <div className="brands-container">
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Purina_logo.svg" alt="Purina" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Royal_Canin_logo.svg" alt="Royal Canin" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Hill%27s_Pet_Nutrition_logo.svg" alt="Hill's" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Pedigree_dog_food_logo.svg" alt="Pedigree" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Friskies_logo.svg" alt="Friskies" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Kong_Company_logo.svg" alt="Kong" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSupplies;