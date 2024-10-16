import { IRestaurant } from "../../interfaces/Restaurant.interface";
import { gql } from "@apollo/client";

export interface GetRestaurantResponse {
  get_restaurant_by_user_id: {
    restaurants: IRestaurant[];
  };
}

export interface GetAllRestaurantResponse {
  get_restaurants: {
    restaurants: IRestaurant[];
  };
}

export const GET_RESTAURANTS_BY_USER_ID = gql`
  query getRestaurantByUserId($user_id: String!) {
    get_restaurant_by_user_id(user_id: $user_id) {
      restaurants {
        id
        menu
        rating
        address
        commission_rate
        contact_details
        cuisine_type
        description
        name
        operating_hours
        total_earnings
        user_id
        image_url
        admin_approval,
        is_available
      }
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query MyQuery {
  get_restaurants {
    message
    statusCode
    restaurants {
      address
      admin_approval
      commission_rate
      contact_details
      cuisine_type
      description
      id
      menu
      image_url
      is_available
      user_id
      total_earnings
      rating
      operating_hours
      name
    }
  }
}
`;


