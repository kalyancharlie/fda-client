import { gql } from "@apollo/client";


export const UPDATE_RESTAURANT = gql`
  mutation UpdateRestaurant($restaurant: RestaurantUpdateInput!) {
    update_restaurant(restaurant: $restaurant) {
      message
      restaurant {
        id
        address
        commission_rate
        cuisine_type
        menu
      }
    }
  }
`;

export const CREATE_RESTAURANTS = gql`
  mutation MyMutation($restaurants: [RestaurantInput]!) {
    create_restaurants(restaurants: $restaurants) {
      message
      statusCode
    }
  }
`;