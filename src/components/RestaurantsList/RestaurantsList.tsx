import React from "react";
import { useNavigate } from "react-router-dom";

import { IRestaurant } from "../../interfaces/Restaurant.interface";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { getVendorRestaurantPageRoute } from "../../routes/route-constants";
import "./RestaurantsList.css";

export interface IRestaurantsListProps {
  restaurants: IRestaurant[];
  updateRestaurant: (restaurant: IRestaurant) => void;
}
const RestaurantsList: React.FC<IRestaurantsListProps> = ({
  restaurants,
  updateRestaurant,
}) => {
  const navigate = useNavigate();
  const navigateToRestaurantPage = (restaurant: IRestaurant) => {
    navigate(getVendorRestaurantPageRoute(restaurant.id), {
      state: restaurant,
    });
  };

  return (
    <div className="card-container">
      {restaurants.map((restaurant, ind) => {
        return (
          <div key={ind} className="card-item">
            <RestaurantCard
              restaurant={restaurant}
              key={ind}
              onEdit={(rest) => {
                updateRestaurant(rest);
              }}
              onClick={navigateToRestaurantPage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantsList;
