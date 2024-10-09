import {gql } from '@apollo/client';

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $order_status: String, $type: String!) {
    update_order(id: $id, order_status: $order_status, type: $type) {
      id
      type
      order_status
    }
  }
`;
