import { gql } from '@apollo/client';

export const CREATE_MENU_ITEMS = gql`
  mutation MyMutation($menu_items: [MenuItemsInput] = {}) {
    create_menu_items(menu_items: $menu_items) {
      menu_items {
        category
        description
        id
        image_url
        is_available
        name
        price
        rating
        restaurant_id
        restaurant_name
        quantity
      }
      message
      statusCode
    }
  }
`;

export const UPDATE_MENU_ITEM = gql`
  mutation MyMutation($menu_item: MenuItemsUpdateInput = {id: ""}) {
    update_menu_item(menu_item: $menu_item) {
      menu_item {
        category
        description
        id
        is_available
        image_url
        name
        rating
        restaurant_id
        price
        restaurant_name
        category_id
        quantity
      }
      message
      statusCode
    }
  }
`;