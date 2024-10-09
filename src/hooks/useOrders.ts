import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../gql/mutations/order-items";
import { GET_ORDERS } from "../gql/query/order-items";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

const auth = useSelector(selectAuth);
const { token } = auth ?? {};

export const useOrders = () => {
    const [getOrders, { loading, error, data, refetch }]= useLazyQuery(GET_ORDERS);
    const [updateOrderMutation] = useMutation(UPDATE_ORDER);
  
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
        refetch();  // Refetch the orders after update
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
      orders: data?.get_order_by_restaurant_id.orders || [],
      updateOrder,
    };
  };