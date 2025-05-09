import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Clothing.scss';

const ClothingProducts = [
  {
    id: 201,
    name: "Men's Classic Fit Crew Neck T-Shirt",
    category: "Men",
    reviews: 189,
    price: 29.99,
    discountedPrice: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 202,
    name: "Women's Slim Fit Distressed Jeans",
    category: "Women",
    reviews: 243,
    price: 79.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 203,
    name: "Kids' Colorblock Hoodie",
    category: "Kids",
    reviews: 126,
    price: 39.99,
    discountedPrice: 29.99,
    image: "https://m.media-amazon.com/images/I/61CtUJ+y5dL._AC_SR736,920_.jpg"
  },
  {
    id: 204,
    name: "Genuine Leather Belt",
    category: "Accessories",
    reviews: 98,
    price: 49.99,
    discountedPrice: 39.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/81UulR5ci5L._UL1500_.jpg"
  },
  {
    id: 205,
    name: "Athletic Performance Sneakers",
    category: "Footwear",
    reviews: 215,
    price: 129.99,
    discountedPrice: 99.99,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 206,
    name: "Summer Floral Print Dress",
    category: "Women",
    reviews: 178,
    price: 69.99,
    discountedPrice: 49.99,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  }
];

const ClothingDeals = [
  {
    id: 301,
    name: "Designer Denim Jacket",
    category: "Men",
    reviews: 167,
    price: 129.99,
    discountedPrice: 89.99,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    discount: 30
  },
  {
    id: 302,
    name: "Premium Cotton Sweater",
    category: "Women",
    reviews: 203,
    price: 89.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    discount: 33
  },
  {
    id: 303,
    name: "Luxury Leather Handbag",
    category: "Accessories",
    reviews: 154,
    price: 199.99,
    discountedPrice: 139.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    discount: 30
  },
  {
    id: 304,
    name: "Casual Summer Shorts",
    category: "Men",
    reviews: 112,
    price: 49.99,
    discountedPrice: 34.99,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    discount: 30
  }
];

const AdditionalClothingItems = [
  {
    id: 401,
    name: "Casual Button-Down Oxford Shirt",
    category: "Men",
    reviews: 145,
    price: 59.99,
    discountedPrice: 44.99,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 402,
    name: "Knit Cardigan Sweater",
    category: "Women",
    reviews: 179,
    price: 69.99,
    discountedPrice: 49.99,
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 403,
    name: "Printed Graphic T-Shirt",
    category: "Kids",
    reviews: 86,
    price: 29.99,
    discountedPrice: 19.99,
    image: "https://i.pinimg.com/originals/89/18/73/891873258890a2c918fc21cd2e66b97c.jpg"
  },
  {
    id: 404,
    name: "Slim Fit Chino Pants",
    category: "Men",
    reviews: 210,
    price: 79.99,
    discountedPrice: 59.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 405,
    name: "Casual Canvas Sneakers",
    category: "Footwear",
    reviews: 168,
    price: 69.99,
    discountedPrice: 49.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  },
  {
    id: 406,
    name: "Winter Knit Beanie",
    category: "Accessories",
    reviews: 74,
    price: 24.99,
    discountedPrice: 19.99,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
  }
];

const ClothingCategories = [
  {
    id: 1,
    title: "Men",
    icon: "bi-gender-male",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing/men"
  },
  {
    id: 2,
    title: "Women",
    icon: "bi-gender-female",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing/women"
  },
  {
    id: 3,
    title: "Footwear",
    icon: "bi-bootstrap-reboot",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing/footwear"
  },
  {
    id: 4,
    title: "Children",
    icon: "bi-people",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing/children"
  },
  {
    id: 5,
    title: "Accessories",
    icon: "bi-bag",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing/accessories"
  },
  {
    id: 6,
    title: "Sale",
    icon: "bi-tag",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/clothing/sale"
  }
];

const Clothing = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
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
        category: 'clothing'
      } 
    });
  };

  const navigateToCategory = (category: string) => {
    navigate(category);
  };

  return (
    <div className="clothing-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Clothing Banner"
          className="hero-image"
        />
        <div className="banner-content">
          <div className="banner-text">
            <h1>Clothing</h1>
            <h2>Elevate your wardrobe with the latest trends</h2>
            
            <div className="promo-badge">Season Clearance</div>
            
            <div className="offer-banner">
              <h3>Up to 70% Off</h3>
              <p>on designer clothing, shoes, and accessories</p>
              {/* Fixed button */}
              <a href="/clothing/sale" className="shop-now-btn" onClick={(e) => {
                e.preventDefault();
                navigate('/clothing/sale');
              }}>
                Shop Sale Now
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Circles */}
      <div className="container">
        <h2 className="section-title">Browse Categories</h2>
        <div className="category-circles">
          {ClothingCategories.map((category) => (
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
      
      {/* Hot Deals Section */}
      <div className="container">
        <div className="deals-banner">
          <div className="deals-content">
            <div className="deals-badge">Hot Deals</div>
            <h2>Limited Time Offers</h2>
            <p>Save big on these fashion essentials. Hurry, offers end soon!</p>
            <button className="view-all-btn" onClick={() => navigate('/clothing/deals')}>
              View All Deals
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="deals-image">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Fashion Deals" />
          </div>
        </div>
      </div>

      {/* Hot Deals Products */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Hot Deals</h2>
          <button className="view-all-products" onClick={() => navigate('/clothing/deals')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {ClothingDeals.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="card-inner">
                <div className="product-image">
                  <div className="discount-tag">
                    -{product.discount}%
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.discountedPrice || product.price,
                          image: product.image,
                          quantity: 1
                        });
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
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
                  <div className="product-price">
                    <span className="original-price">${product.price.toFixed(2)}</span>
                    <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.discountedPrice || product.price,
                        image: product.image,
                        quantity: 1
                      });
                    }}
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
      
      {/* Rest of the component remains unchanged */}
      {/* New Arrivals Banner */}
      <div className="container">
        <div className="deals-banner">
          <div className="deals-content">
            <div className="deals-badge">New Arrivals</div>
            <h2>Spring Collection 2025</h2>
            <p>Discover our fresh styles for the new season. Limited stock available.</p>
            <button className="view-all-btn" onClick={() => navigate('/clothing/new-arrivals')}>
              View Collection
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="deals-image">
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/copy-of-new-spring-collection-vertical-video-design-template-d742df95811b40ca4e4c2b51f3302f03_screen.jpg?ts=1637004365" alt="New Collection" />
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Fashion</h2>
          <button className="view-all-products" onClick={() => navigate('/clothing/all')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {ClothingProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="card-inner">
                <div className="product-image">
                  {product.discountedPrice && (
                    <div className="discount-tag">
                      -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </div>
                  )}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.discountedPrice || product.price,
                          image: product.image,
                          quantity: 1
                        });
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
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
                  <div className="product-price">
                    {product.discountedPrice ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>
                        <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="current-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.discountedPrice || product.price,
                        image: product.image,
                        quantity: 1
                      });
                    }}
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
      
      {/* Popular Items */}
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Items</h2>
          <button className="view-all-products" onClick={() => navigate('/clothing/popular')}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div className="products-grid">
          {AdditionalClothingItems.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="card-inner">
                <div className="product-image">
                  {product.discountedPrice && (
                    <div className="discount-tag">
                      -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </div>
                  )}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.discountedPrice || product.price,
                          image: product.image,
                          quantity: 1
                        });
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
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
                  <div className="product-price">
                    {product.discountedPrice ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>
                        <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="current-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.discountedPrice || product.price,
                        image: product.image,
                        quantity: 1
                      });
                    }}
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

      {/* Newsletter Signup Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h2>Stay Updated on Fashion Trends</h2>
              <p>Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button>Subscribe <i className="bi bi-send"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Fashion Brands */}
      <div className="container">
        <h2 className="section-title">Top Fashion Brands</h2>
        <div className="brands-container">
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg" alt="Louis Vuitton" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Gucci_Logo.svg" alt="Gucci" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Adidas" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg" alt="Under Armour" />
          </div>
          <div className="brand-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Levi%27s_logo.svg" alt="Levi's" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothing;