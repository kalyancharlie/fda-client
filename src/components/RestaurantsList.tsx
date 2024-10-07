import React from "react";
import { IRestaurant } from "../interfaces/Restaurant.interface";
import { UpdateRestaurantFuncType } from "../pages/Vendor/VendorHomePage";

export interface IRestaurantsListProps {
  restaurants: IRestaurant[];
  updateRestaurant: UpdateRestaurantFuncType;
}
const RestaurantsList: React.FC<IRestaurantsListProps> = ({
  restaurants,
  updateRestaurant,
}) => {
  return (
    <div>
      {restaurants.map((restaurant, ind) => {
        const { name, id } = restaurant;
        return (
          <p
            key={ind}
            onClick={() =>
              updateRestaurant({ restaurantId: id, updateProps: {} })
            }
          >
            {name}
          </p>
        );
      })}
    </div>
  );
};

export default RestaurantsList;
