import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { UPDATE_ORDER } from "../gql/mutations/order-items";
import {
  GET_ORDERS_BY_RESTAURANT_ID,
  GET_ORDERS_BY_USER_ID,
  GetOrdersByRestaurantIdResponse,
  GetOrdersByUserResponse,
  GET_ORDERS,
  GetAllOrdersResponse
} from "../gql/query/order-items";
import { selectAuth } from "../features/authSlice";

export const useOrders = (restaurant_id: string, user_id: string) => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const [getOrders, { refetch: getOrdersRefetch }] =
  useLazyQuery<GetAllOrdersResponse>(GET_ORDERS, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
    fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
  });

  const [getOrdersByRestaurant, { refetch: getOrdersByRestaurantRefetch }] =
    useLazyQuery<GetOrdersByRestaurantIdResponse>(GET_ORDERS_BY_RESTAURANT_ID, {
      variables: { restaurant_id },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
      fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
    });
  const [updateOrderMutation] = useMutation(UPDATE_ORDER, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      // Refetch the restaurant data after updating
      getOrdersByUserRefetch();
    },
  });

  const [
    getOrdersByUser,
    { loading, error, data, refetch: getOrdersByUserRefetch },
  ] = useLazyQuery<GetOrdersByUserResponse>(GET_ORDERS_BY_USER_ID, {
    variables: { user_id },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
    fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
  });

  const updateOrder = async (id: string, order_status: string) => {
    try {
      const result = await updateOrderMutation({
        variables: {
          order: {
            id,
            order_status,
            type: "order",
          },
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
      getOrdersByUserRefetch(); // Refetch the orders after update
      return result;
    } catch (err) {
      console.error("Failed to update order:", err);
      throw err;
    }
  };

  return {
    getOrdersByRestaurantRefetch,
    getOrdersByUserRefetch,
    getOrdersByUser,
    getOrdersByRestaurant,
    loading,
    error,
    ordersByUser: data?.get_orders_by_user_id.orders || [],
    updateOrder,
    getOrders,
    getOrdersRefetch
  };
};
