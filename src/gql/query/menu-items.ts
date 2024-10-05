import { gql } from '@apollo/client';

export const GET_MENU_ITEMS_BY_RESTAURANT_ID = gql`
  query MyQuery($restaurant_id: String = "") {
    get_menu_items_by_restaurant_id(restaurant_id: $restaurant_id) {
      menu_items {
        category
        image_url
        id
        description
        is_available
        price
        name
        rating
        restaurant_id
        restaurant_name
      }
      message
      statusCode
    }
  }
`;