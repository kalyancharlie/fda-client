import React from "react";

import { IRestaurant } from "../../interfaces/Restaurant.interface";
import RestaurantCard from "../RestaurantCard";
import "./RestaurantsList.css";

export interface IRestaurantsListProps {
  restaurants: IRestaurant[];
  updateRestaurant: (restaurant: IRestaurant) => void;
}
const RestaurantsList: React.FC<IRestaurantsListProps> = ({
  restaurants,
  updateRestaurant,
}) => {
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantsList;
