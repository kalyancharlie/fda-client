import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../gql/mutations/order-items";
import { GET_ORDERS_BY_RESTAURANT_ID, GET_ORDERS_BY_USER_ID } from "../gql/query/order-items";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

const auth = useSelector(selectAuth);
const { token } = auth ?? {};

export const useOrders = () => {
    const [getOrdersByRestaurant, { refetch: getOrdersByRestaurantRefetch }]= useLazyQuery(GET_ORDERS_BY_RESTAURANT_ID);
    const [updateOrderMutation] = useMutation(UPDATE_ORDER);

    const [getOrdersByUser, { loading, error, data, refetch: getOrdersByUserRefetch }]= useLazyQuery(GET_ORDERS_BY_USER_ID);
  
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