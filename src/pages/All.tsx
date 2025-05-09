import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './All.scss';

// Import product data from other components
// Top products from each category
const FeaturedProducts = [
  // Electronics
  {
    id: 101,
    name: "Samsung 55\" 4K QLED Smart TV",
    category: "Electronics",
    subCategory: "TVs",
    reviews: 345,
    price: 699.99,
    discountedPrice: 599.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Samsung"
  },
  {
    id: 102,
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    category: "Electronics",
    subCategory: "Audio",
    reviews: 278,
    price: 349.99,
    discountedPrice: 299.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Sony"
  },
  
  // Clothing
  {
    id: 201,
    name: "Men's Classic Fit Crew Neck T-Shirt",
    category: "Clothing",
    subCategory: "Men",
    reviews: 189,
    price: 29.99,
    discountedPrice: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "FashionBrand"
  },
  {
    id: 202,
    name: "Women's Slim Fit Distressed Jeans",
    category: "Clothing",
    subCategory: "Women",
    reviews: 243,
    price: 79.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "DenimCo"
  },
  
  // Pet Supplies
  {
    id: 301,
    name: "Premium Organic Dog Food",
    category: "Pet Supplies",
    subCategory: "Dog Food",
    reviews: 345,
    price: 69.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Pawsome Nutrition"
  },
  {
    id: 302,
    name: "Deluxe Cat Tree with Scratching Posts",
    category: "Pet Supplies",
    subCategory: "Cat Furniture",
    reviews: 412,
    price: 129.99,
    discountedPrice: 99.99,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "FurryComfort"
  }
];

// Popular/Trending products
const TrendingProducts = [
  // Electronics
  {
    id: 401,
    name: "Samsung Galaxy S23 Ultra",
    category: "Electronics",
    subCategory: "Smartphones",
    reviews: 356,
    price: 1199.99,
    discountedPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Samsung"
  },
  
  // Clothing
  {
    id: 402,
    name: "Designer Denim Jacket",
    category: "Clothing",
    subCategory: "Men",
    reviews: 167,
    price: 129.99,
    discountedPrice: 89.99,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "DenimCo"
  },
  
  // Pet Supplies
  {
    id: 403,
    name: "GPS Pet Tracker Collar Attachment",
    category: "Pet Supplies",
    subCategory: "Tech Accessories",
    reviews: 356,
    price: 89.99,
    discountedPrice: 79.99,
    image: "https://images.unsplash.com/photo-1566677914817-56426959ae9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "PetTracker"
  }
];

// Hot deals products
const DealsProducts = [
  // Electronics
  {
    id: 501,
    name: "Dell XPS 15 Laptop",
    category: "Electronics",
    subCategory: "Laptops",
    reviews: 245,
    price: 1799.99,
    discountedPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "Dell",
    discount: 17
  },
  
  // Clothing
  {
    id: 502,
    name: "Luxury Leather Handbag",
    category: "Clothing",
    subCategory: "Accessories",
    reviews: 154,
    price: 199.99,
    discountedPrice: 139.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "LuxFashion",
    discount: 30
  },
  
  // Pet Supplies
  {
    id: 503,
    name: "Complete Dog Grooming Kit",
    category: "Pet Supplies",
    subCategory: "Grooming",
    reviews: 132,
    price: 79.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    brand: "GroomPro",
    discount: 25
  }
];

// Category shortcuts
const CategoryShortcuts = [
  {
    id: 1,
    title: "Electronics",
    icon: "bi-laptop",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/electronics"
  },
  {
    id: 2,
    title: "Clothing",
    icon: "bi-bag",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing"
  },
  {
    id: 3,
    title: "Pet Supplies",
    icon: "bi-heart",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/pet-supplies"
  }
];

// Footer links
const footerLinks = {
  customerService: [
    { title: "Help Center", link: "/help" },
    { title: "Track Your Order", link: "/track-order" },
    { title: "Returns & Refunds", link: "/returns" },
    { title: "Shipping Information", link: "/shipping" },
    { title: "Size Guides", link: "/size-guides" }
  ],
  aboutUs: [
    { title: "About Our Store", link: "/about" },
    { title: "Careers", link: "/careers" },
    { title: "News & Blog", link: "/blog" },
    { title: "Sustainability", link: "/sustainability" },
    { title: "Store Locations", link: "/stores" }
  ],
  legal: [
    { title: "Terms & Conditions", link: "/terms" },
    { title: "Privacy Policy", link: "/privacy" },
    { title: "Cookie Policy", link: "/cookies" },
    { title: "Accessibility", link: "/accessibility" },
    { title: "CA Supply Chain Act", link: "/supply-chain" }
  ]
};

const All = () => {
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
        category: product.category.toLowerCase().replace(/\s+/g, '-')
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

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'electronics':
        return 'electronics-category';
      case 'clothing':
        return 'clothing-category';
      case 'pet supplies':
        return 'pet-supplies-category';
      default:
        return '';
    }
  };

  return (
    <div className="all-products-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="All Products Banner"
          className="hero-image"
        />
        <div className="banner-content">
          <div className="banner-text">
            <h1>All Products</h1>
            <h2>Discover our complete collection</h2>
            
            <div className="promo-badge">Limited Time</div>
            
            <div className="offer-banner">
              <h3>Special Savings</h3>
              <p>Shop across all categories and save up to 70% on selected items</p>
              <div className="button-container">
                <button className="shop-now-btn" onClick={() => navigate('/deals')}>
                  Shop All Deals
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Shortcuts */}
      <div className="container">
        <h2 className="section-title">Browse Categories</h2>
        <div className="category-shortcuts">
          {CategoryShortcuts.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => navigateToCategory(category.link)}
            >
              <div className="category-image">
                <img src={category.image} alt={category.title} />
                <div className="category-overlay">
                  <i className={`bi ${category.icon}`}></i>
                  <h3>{category.title}</h3>
                  <button className="browse-btn">
                    Browse Now
                    <i className="bi bi-arrow-right"></i>
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
          <h2 className="section-title">Featured Products</h2>
          <div className="filters">
            <button className="active">All</button>
            <button>Electronics</button>
            <button>Clothing</button>
            <button>Pet Supplies</button>
          </div>
          <button className="view-all-products" onClick={() => navigate('/featured')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid featured-grid">
          {FeaturedProducts.map((product) => (
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
                  <div className={`product-category ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </div>
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
                  <div className="product-subcategory">{product.subCategory}</div>
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
      
      {/* Hot Deals Banner */}
      <div className="container">
        <div className="deals-banner">
          <div className="deals-content">
            <div className="deals-badge">Hot Deals</div>
            <h2>Limited Time Offers</h2>
            <p>Save big on these top products. Hurry, offers end soon!</p>
            <button className="view-all-btn" onClick={() => navigate('/deals')}>
              View All Deals
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="deals-image">
            <img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Hot Deals" />
          </div>
        </div>
      </div>
      
      {/* Hot Deals Products */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Hot Deals</h2>
          <button className="view-all-products" onClick={() => navigate('/deals')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid deals-grid">
          {DealsProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card deals-card"
              onClick={() => handleProductClick(product)}
            >
              <div className={`card-inner ${isCartAnimating && cartAnimatingProduct === product.id ? 'animate-to-cart' : ''}`}>
                <div className="product-image">
                  <div className="discount-tag">
                    -{product.discount}%
                  </div>
                  <div className={`product-category ${getCategoryColor(product.category)}`}>
                    {product.category}
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
                  <div className="product-subcategory">{product.subCategory}</div>
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
      
      {/* Trending Banner */}
      <div className="container">
        <div className="trending-banner">
          <div className="trending-content">
            <div className="trending-badge">Trending Now</div>
            <h2>Popular Products</h2>
            <p>Discover what everyone's buying this season.</p>
            <button className="trending-btn" onClick={() => navigate('/trending')}>
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
          <button className="view-all-products" onClick={() => navigate('/trending')}>
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
                  <div className={`product-category ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </div>
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
                  <div className="product-subcategory">{product.subCategory}</div>
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
              <h2>Stay Updated on Latest Products</h2>
              <p>Subscribe to our newsletter for exclusive deals, new product announcements, and more.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button>Subscribe <i className="bi bi-send"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      
    </div>
  );
};

export default All;