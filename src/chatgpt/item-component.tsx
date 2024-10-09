import React from 'react';
import { Card, Button, Rate } from 'antd';
import './ProductItem.css';

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    discountedPrice: number;
    image: string;
    rating: number;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card
      className="product-item"
      cover={<img alt={product.name} src={product.image} className="product-image" />}
    >
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-pricing">
          <span className="discounted-price">${product.discountedPrice}</span>
          <span className="original-price">${product.price}</span>
        </div>
        <Rate className="product-rating" value={product.rating} disabled />
        <Button type="primary" className="add-to-cart">Add to Cart</Button>
      </div>
    </Card>
  );
};

export default ProductItem;
