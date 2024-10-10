import { gql } from "@apollo/client";

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($order: UpdateOrderInput) {
    update_order(order: $order) {
      statusCode
      message
      order {
        id
        user_id
        restaurant_id
        order_items {
          name
          price
          quantity
          id
        }
        delivery_address
        total_amount
        vendor_earnings
        admin_commission
        order_status
        order_placed_at
        order_completed_at
      }
    }
  }
`;
