import React, { useEffect, useState } from "react";
import { Spin, Typography } from "antd";
const { Title } = Typography;
import { useSelector } from "react-redux";
import { message } from "antd";

import { selectAuth } from "../../../features/authSlice";
import ApiErrorMessage from "../../../components/ApiErrorMessage";
import { useOrders } from "../../../hooks/useOrders";
import OrdersList from "../../../components/OrdersList/OrdersList";
import "./AdminOrdersPage.css";

const AdminOrdersPage: React.FC = () => {
  const auth = useSelector(selectAuth);
  const { userId } = auth ?? {};
  // #TODO Get all orders without user id
  const {
    loading,
    error,
    getOrders: getOrdersByUser,
    getOrdersByUserRefetch,
    allOrders: ordersByUser,
    updateOrder,
  } = useOrders("", userId as string);

  const [apiErrorMsg, setApiErrorMsg] = useState<string>("");

  // Update Order - only Status field
  const updateOrderHandler = async (orderId: string, orderStatus: string) => {
    try {
      const res = await updateOrder(orderId, orderStatus);
      console.log(res);
      message.success("Order Update Success!");
      getOrdersByUserRefetch();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApiErrorMsg(`Failed to update order - ${orderId}`);
      message.error(`Failed to update order - ${orderId}`);
    }
  };

  useEffect(() => {
    getOrdersByUser();
  }, [getOrdersByUser]);

  return (
    <div className="page-wrapper">
      <div className="text-button-wrapper">
        <Title level={3}>Orders</Title>
      </div>
      {error && (
        <ApiErrorMessage
          message={
            error.cause?.message ||
            error?.cause?.name ||
            "Error in Fetching Orders"
          }
        />
      )}
      {loading && <Spin fullscreen />}

      {/* Orders List */}
      <OrdersList orders={ordersByUser} updateOrder={updateOrderHandler} />
    </div>
  );
};

export default AdminOrdersPage;
