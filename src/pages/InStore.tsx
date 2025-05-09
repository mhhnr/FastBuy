import React, { useState } from 'react';
import './InStore.scss';

interface Product {
  id: number;
  name: string;
  image: string;
  link: string;
  aisle: string;
  location: string;
  description: string;
}

const clothingProducts: Product[] = [
  {
    id: 303,
    name: "Luxury Leather Handbag",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "/product/luxury-leather-handbag",
    aisle: "Aisle 12 - Accessories",
    location: "Section B, Shelf 3",
    description: "Premium leather handbag with multiple compartments"
  },
  {
    id: 201,
    name: "Men's Classic Fit Crew Neck T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "#",
    aisle: "Aisle 8 - Men's Clothing",
    location: "Section A, Shelf 2",
    description: "Comfortable cotton t-shirt in classic fit"
  },
  {
    id: 202,
    name: "Women's Slim Fit Distressed Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "#",
    aisle: "Aisle 9 - Women's Clothing",
    location: "Section C, Shelf 1",
    description: "Stylish distressed jeans with slim fit"
  },
  {
    id: 204,
    name: "Genuine Leather Belt",
    image: "https://images-na.ssl-images-amazon.com/images/I/81UulR5ci5L._UL1500_.jpg",
    link: "#",
    aisle: "Aisle 12 - Accessories",
    location: "Section B, Shelf 4",
    description: "Classic leather belt with silver buckle"
  },
  {
    id: 205,
    name: "Athletic Performance Sneakers",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    link: "#",
    aisle: "Aisle 10 - Footwear",
    location: "Section D, Shelf 2",
    description: "Lightweight sneakers for optimal performance"
  }
];

export default function InStore() {
  const [showBag, setShowBag] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleShowBag = () => {
    setShowBag(true);
    setSelectedProduct(clothingProducts[0]);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="instore-page">
      <div className="container">
        <h1>In-Store Shopping</h1>
        
        {!showBag && (
          <div className="instore-blank">
            <p>Welcome to the store. Ask for a product to see its location and recommendations.</p>
            <button className="show-bag-btn" onClick={handleShowBag}>
              Ask what you are looking for!
            </button>
          </div>
        )}

        {showBag && (
          <div className="instore-content">
            {selectedProduct && (
              <div className="selected-product">
                <div className="product-details">
                  <h2>{selectedProduct.name}</h2>
                  <div className="location-info">
                    <div className="aisle-info">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{selectedProduct.aisle}</span>
                    </div>
                    <div className="shelf-info">
                      <i className="fas fa-layer-group"></i>
                      <span>{selectedProduct.location}</span>
                    </div>
                  </div>
                  <p className="product-description">{selectedProduct.description}</p>
                  <div className="navigation-guide">
                    <h3>How to find this item:</h3>
                    <ol>
                      <li>Enter through the main entrance</li>
                      <li>Follow signs to {selectedProduct.aisle.split(' - ')[1]}</li>
                      <li>Look for {selectedProduct.aisle}</li>
                      <li>Find {selectedProduct.location}</li>
                    </ol>
                  </div>
                </div>
                <div className="product-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
              </div>
            )}

            <div className="recommendations">
              <h3>Recommended Items</h3>
              <div className="products-grid">
                {clothingProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <div className="location-badge">
                        <i className="fas fa-map-marker-alt"></i>
                        {product.aisle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
