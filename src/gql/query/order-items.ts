import { gql } from "@apollo/client";
import { OrderItemResponse } from "../../interfaces/Order.interface";

export interface GetOrderItemsByRestaurantIdResponse {
  get_orders_by_restaurant_id: {
    statusCode: number;
    message: string;
    orders: OrderItemResponse[];
  };
}

export const GET_ORDERS = gql`
  query MyQuery($restaurant_id: String) {
    get_orders_by_restaurant_id(restaurant_id: $restaurant_id) {
      message
      statusCode
      orders {
        admin_commission
        delivery_address
        id
        order_completed_at
        order_items {
          id
          name
          price
          quantity
        }
        order_placed_at
        order_status
        restaurant_id
        total_amount
        user_id
        vendor_earnings
      }
    }
  }
`;
