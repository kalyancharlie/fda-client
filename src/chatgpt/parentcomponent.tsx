import React from 'react';
import ProductList from './listComponent';

const products = [
  {
    id: 1,
    name: 'Cute Soft Teddybear',
    price: 345,
    discountedPrice: 285,
    image: '/images/teddy.jpg',
    rating: 4,
  },
  {
    id: 2,
    name: 'MacBook Air Pro',
    price: 900,
    discountedPrice: 650,
    image: '/images/macbook.jpg',
    rating: 5,
  },
  // Add more products here...
];

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <ProductList products={products} />
    </div>
  );
};

export default App;
