import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Rate } from "antd";
const { Meta } = Card;

import { IRestaurant } from "../../interfaces/Restaurant.interface";
import "./RestaurantCard.css";
import { DUMMY_IMG_URL } from "../../constants/assets";

interface RestaurantCardProps {
  restaurant: IRestaurant;
  onEdit: (restaurant: IRestaurant) => void;
  onClick: (restaurant: IRestaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onClick,
}) => {
  const { id, image, name, description, rating } = restaurant;

  return (
    <Card
      hoverable
      style={{ width: 250 }}
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
        onClick(restaurant);
      }}
    >
      <Meta
        avatar={<Avatar src={image} />}
        title={name}
        // description={description}
      />
    </Card>
  );
};

export default RestaurantCard;
