import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../gql/mutations/order-items";
import { GET_ORDERS_BY_RESTAURANT_ID, GET_ORDERS_BY_USER_ID } from "../gql/query/order-items";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

const auth = useSelector(selectAuth);
const { token } = auth ?? {};

export const useOrders = (restaurant_id: String, user_id: String) => {
    const [getOrdersByRestaurant, { refetch: getOrdersByRestaurantRefetch }]= useLazyQuery(GET_ORDERS_BY_RESTAURANT_ID,
        {
            variables: { restaurant_id },
            context: {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
              },
            },
            fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
          }
    );
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

    const [getOrdersByUser, { loading, error, data, refetch: getOrdersByUserRefetch }]= useLazyQuery(GET_ORDERS_BY_USER_ID,
        {
            variables: { user_id },
            context: {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
              },
            },
            fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
          }
    );
  
    const updateOrder = async (id: String, order_status:String) => {
      try {
        const result = await updateOrderMutation({
          variables: { id, order_status },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        });
        getOrdersByUserRefetch();  // Refetch the orders after update
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
      ordersByUser: data?.get_order_by_user_id.orders || [],
      updateOrder,
    };
  };