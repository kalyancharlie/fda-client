import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Image, Typography } from "antd";

import { ROUTE_RESTAURANT_ID_PARAM } from "../../../routes/VendorRoutes";
import { IRestaurant } from "../../../interfaces/Restaurant.interface";
import { REST_DUMMY_IMG_URL } from "../../../constants/assets";
import "./VendorRestaurantPage.css";
import { useMenu } from "../../../hooks/useMenu";
import MenuDashboard from "../../../components/MenuDashboard";

interface IRestaurantParams {
  [ROUTE_RESTAURANT_ID_PARAM]: string;
}
const VendorRestaurantPage: React.FC = () => {
  const location = useLocation();
  const restaurant = location.state as IRestaurant;
  const params = useParams<IRestaurantParams>();
  const restaurantId = params[ROUTE_RESTAURANT_ID_PARAM];
  const {
    name,
    description,
    image,
    rating,
    address,
    contact_details,
    cuisine_type,
    operating_hours,
    total_earnings,
  } = restaurant ?? {};

  const { getMenus } = useMenu(restaurantId as string);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  return (
    <div className="restaurant-page-wrapper">
      <div className="restaurant-wrapper">
        {/* Restaurant Meta Data */}
        <div className="restaurant-details">
          <p>Restaurant Name: {name}</p>
          <p>Restaurant Id: {restaurantId}</p>
          <p>Cuisine Type: {cuisine_type}</p>
          <p>Rating: {rating}</p>
          <p>Description: {description}</p>
          <p>Operating Hours: {operating_hours}</p>
          <p>Total Earnings: {total_earnings}</p>
          <p>Address: {address}</p>
          <p>Contact Details: {contact_details}</p>
        </div>

        {/* Image Container */}
        <div className="restaurant-image">
          <Image height={300} src={REST_DUMMY_IMG_URL} />
        </div>
      </div>

      <MenuDashboard
        restaurantId={restaurantId as string}
        onCreate={getMenus}
        onEdit={getMenus}
      />
    </div>
  );
};

export default VendorRestaurantPage;
