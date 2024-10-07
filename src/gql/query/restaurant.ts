import { IRestaurant } from "../../interfaces/Restaurant.interface";
import { gql } from "@apollo/client";

export interface GetRestaurantResponse {
  get_restaurant: {
    statusCode: string;
    message: string;
    restaurant: IRestaurant;
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
      }
    }
  }
`;
