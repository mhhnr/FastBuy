import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Deals.scss';

const DealsOffers = [
  // Electronics Deals
  {
    id: "samsung-4k-qled-tv",
    name: "Samsung 55\" 4K QLED Smart TV",
    category: "Electronics",
    originalPrice: 799.99,
    discountedPrice: 599.99,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "3 days",
    path: "samsung-55-4k-qled-smart-tv"
  },
  {
    id: "macbook-air-m2",
    name: "Apple MacBook Air 13\" M2",
    category: "Electronics",
    originalPrice: 1199.99,
    discountedPrice: 899.99,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "5 days",
    path: "apple-macbook-air-13-m2"
  },
  {
    id: "sony-noise-cancelling-headphones",
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    category: "Electronics",
    originalPrice: 349.99,
    discountedPrice: 279.99,
    discountPercent: 20,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "7 days",
    path: "sony-wh-1000xm5-headphones"
  },
  
  // Clothing Deals
  {
    id: "mens-crew-neck-tshirt",
    name: "Men's Classic Fit Crew Neck T-Shirt",
    category: "Clothing",
    originalPrice: 29.99,
    discountedPrice: 19.99,
    discountPercent: 33,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "2 days",
    path: "mens-classic-fit-crew-neck-tshirt"
  },
  {
    id: "womens-slim-jeans",
    name: "Women's Slim Fit Distressed Jeans",
    category: "Clothing",
    originalPrice: 79.99,
    discountedPrice: 59.99,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "4 days",
    path: "womens-slim-fit-distressed-jeans"
  },
  {
    id: "designer-denim-jacket",
    name: "Designer Denim Jacket",
    category: "Clothing",
    originalPrice: 129.99,
    discountedPrice: 89.99,
    discountPercent: 31,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "6 days",
    path: "designer-denim-jacket"
  },
  
  // Pet Supplies Deals
  {
    id: "premium-dog-food",
    name: "Premium Organic Dog Food",
    category: "Pet Supplies",
    originalPrice: 69.99,
    discountedPrice: 54.99,
    discountPercent: 21,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "3 days",
    path: "premium-organic-dog-food"
  },
  {
    id: "cat-tree-with-posts",
    name: "Deluxe Cat Tree with Scratching Posts",
    category: "Pet Supplies",
    originalPrice: 129.99,
    discountedPrice: 89.99,
    discountPercent: 31,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "5 days",
    path: "deluxe-cat-tree-with-scratching-posts"
  },
  {
    id: "dog-grooming-kit",
    name: "Complete Dog Grooming Kit",
    category: "Pet Supplies",
    originalPrice: 79.99,
    discountedPrice: 59.99,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    expiresIn: "7 days",
    path: "complete-dog-grooming-kit"
  }
];

const DealsCategories = [
  {
    title: "Electronics Deals",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    discount: "Up to 40% OFF",
    route: "/electronics"
  },
  {
    title: "Clothing Deals",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    discount: "Up to 50% OFF",
    route: "/clothing"
  },
  {
    title: "Pet Supplies Deals",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    discount: "Buy 1 Get 1 50% OFF",
    route: "/pet-supplies"
  }
];

const Deals = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = (deal: any) => {
    navigate(`/product/${deal.path}`, {
      state: {
        product: {
          id: deal.id,
          name: deal.name,
          price: deal.originalPrice,
          discountedPrice: deal.discountedPrice,
          image: deal.image,
          category: deal.category
        },
        category: deal.category.toLowerCase().replace(/\s+/g, '-')
      }
    });
  };

  const handleAddToCart = (e: React.MouseEvent, deal: any) => {
    e.stopPropagation();
    addToCart({
      id: deal.id,
      name: deal.name,
      price: deal.discountedPrice,
      image: deal.image,
      quantity: 1
    });
  };

  return (
    <div className="deals-page">
      <div className="hero-banner">
        <img 
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Deals Banner"
        />
        <div className="banner-content">
          <div className="sale-label">Limited Time</div>
          <h1>SPRING MEGA SALE</h1>
          <h2>Up to 50% off storewide</h2>
          <p>Hurry! Deals end soon</p>
        </div>
      </div>
      
      <div className="deals-categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {DealsCategories.map((category, index) => (
              <div 
                key={index} 
                className="category-card"
                onClick={() => navigate(category.route)}
              >
                <div className="discount-label">{category.discount}</div>
                <img src={category.image} alt={category.title} />
                <h3>{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="hot-deals">
        <div className="container">
          <h2>Hot Deals</h2>
          <p className="subtitle">Limited time offers - Don't miss out!</p>
          
          <div className="deals-grid">
            {DealsOffers.map((deal) => (
              <div 
                key={deal.id} 
                className="deal-card"
                onClick={() => handleProductClick(deal)}
              >
                <div className="deal-image">
                  <div className="discount-badge">-{deal.discountPercent}%</div>
                  <div className="expiry-badge">Ends in {deal.expiresIn}</div>
                  <img src={deal.image} alt={deal.name} />
                </div>
                <div className="deal-info">
                  <div className="deal-category">{deal.category}</div>
                  <h3>{deal.name}</h3>
                  <div className="deal-pricing">
                    <span className="original-price">${deal.originalPrice.toFixed(2)}</span>
                    <span className="discounted-price">${deal.discountedPrice.toFixed(2)}</span>
                  </div>
                  <div className="deal-actions">
                    <button 
                      className="view-details"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(deal);
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      className="add-to-cart"
                      onClick={(e) => handleAddToCart(e, deal)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <h2>Join FastBuy Rewards</h2>
            <p>Sign up today and get $20 off your next purchase over $100</p>
            <button className="join-now-btn">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;