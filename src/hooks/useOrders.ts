import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { UPDATE_ORDER } from "../gql/mutations/order-items";
import {
  GET_ORDERS,
  GetOrderItemsByRestaurantIdResponse,
} from "../gql/query/order-items";
import { selectAuth } from "../features/authSlice";

export const useOrders = () => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};
  const [getOrders, { loading, error, data, refetch }] =
    useLazyQuery<GetOrderItemsByRestaurantIdResponse>(GET_ORDERS);
  const [updateOrderMutation] = useMutation(UPDATE_ORDER);

  const updateOrder = async (id: string, order_status: string) => {
    try {
      const result = await updateOrderMutation({
        variables: { id, order_status },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
      refetch(); // Refetch the orders after update
      return result;
    } catch (err) {
      console.error("Failed to update order:", err);
      throw err;
    }
  };

  return {
    getOrders,
    loading,
    error,
    orders: data?.get_orders_by_restaurant_id.orders || [],
    updateOrder,
  };
};
