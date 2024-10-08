import { gql } from "@apollo/client";
import { MenuItem } from "../../interfaces/Menu.interface";

export interface MenuItemResponse extends MenuItem {
  id: string;
  // restaurant_id: string;
  // restaurant_name: string;
  // name: string;
  // description: string;
  // price: number;
  // category: string;
  // // category_id: string; missing
  // is_available: string;
  // image_url: string;
  // rating?: number;
  // // quantity: number; missing;
}
export interface GetMenuItemsByRestaurantIdResponse {
  get_menu_items_by_restaurant_id: {
    statusCode: number;
    message: string;
    menu_items: MenuItemResponse[];
  };
}

export const GET_MENU_ITEMS_BY_RESTAURANT_ID = gql`
  query MyQuery($restaurant_id: String = "") {
    get_menu_items_by_restaurant_id(restaurant_id: $restaurant_id) {
      menu_items {
        id
        restaurant_id
        restaurant_name
        name
        description
        price
        category
        category_id
        is_available
        image_url
        rating
        quantity
      }
      message
      statusCode
    }
  }
`;
