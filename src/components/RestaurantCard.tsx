// src/components/RestaurantCard/RestaurantCard.tsx
import React from "react";
import { Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { IRestaurant } from "../interfaces/Restaurant.interface";

interface RestaurantCardProps {
  restaurant: IRestaurant;
  onEdit: (restaurant: IRestaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
}) => {
  return (
    <Card
      hoverable
      cover={<img alt={restaurant.name} src={restaurant.image} />}
      actions={[
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event from triggering
            onEdit(restaurant);
          }}
        >
          Edit
        </Button>,
      ]}
    >
      <Card.Meta title={restaurant.name} description={restaurant.description} />
      <div>Rating: {restaurant.rating}</div>
    </Card>
  );
};

export default RestaurantCard;
