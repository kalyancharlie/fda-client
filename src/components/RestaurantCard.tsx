import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

import { IRestaurant } from "../interfaces/Restaurant.interface";

interface RestaurantCardProps {
  restaurant: IRestaurant;
  onEdit: (restaurant: IRestaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
}) => {
  const { id, image, name, description, rating, operating_hours } = restaurant;

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt={`${name} Image`}
          src={
            "https://dev.konekbuhay.com/static/media/web-bento-gamification.10f12df0803ac948f652.png"
          }
        />
      }
      actions={[
        <EditOutlined
          key="edit"
          onClick={(event) => {
            event.stopPropagation();
            onEdit(restaurant);
          }}
        />,
      ]}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Meta
        avatar={<Avatar src={image} />}
        title={name}
        description={description}
      />
    </Card>
  );
};

export default RestaurantCard;
