import React, { useCallback, useState } from "react";
import { Typography } from "antd";
const { Title } = Typography;

import RestaurantsList from "../../components/RestaurantsList";
import { IRestaurant } from "../../interfaces/Restaurant.interface";
import VendorDashboard from "../../components/VendorDashBoard";
import MenuDashboard from "../../components/MenuDashboard";

export type UpdateRestaurantFuncType = (params: {
  restaurantId: string;
  updateProps: Partial<IRestaurant>;
}) => void;

const VendorHomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([
    { name: "KFC", id: "1" },
    { name: "Dominos", id: "2" },
  ]);

  const updateRestaurant: UpdateRestaurantFuncType = useCallback(
    ({
      restaurantId,
      updateProps,
    }: {
      restaurantId: string;
      updateProps: Partial<IRestaurant>;
    }) => {
      setRestaurants((prev) => {
        return prev.map((val) => {
          if (val.id === restaurantId) {
            return {
              ...val,
              ...updateProps,
            };
          }
          return val;
        });
      });
    },
    []
  );

  return (
    <div>
      <Title level={3}>Restaurants</Title>
      <RestaurantsList
        restaurants={restaurants}
        updateRestaurant={updateRestaurant}
      />
    </div>
  );
};

export default VendorHomePage;
