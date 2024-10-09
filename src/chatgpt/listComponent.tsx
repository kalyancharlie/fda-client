import React from 'react';
import { Row, Col } from 'antd';
import ProductItem from './parentcomponent';
import './ProductList.css';

interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
