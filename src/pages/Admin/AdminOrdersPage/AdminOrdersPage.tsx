import React, { useEffect, useState } from "react";
import { Spin, Typography } from "antd";
const { Text } = Typography;
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
  const [isLoading, setIsLoading] = useState(true);
  const { error, getOrders, getOrdersRefetch, allOrders, updateOrder } =
    useOrders("", userId as string);

  const adminEarningsTotal = allOrders.reduce(
    (prev, curr) => prev + curr.admin_commission,
    0
  );

  const [apiErrorMsg, setApiErrorMsg] = useState<string>("");

  // Update Order - only Status field
  const updateOrderHandler = async (orderId: string, orderStatus: string) => {
    try {
      setIsLoading(true);
      const res = await updateOrder(orderId, orderStatus);
      console.log(res);
      message.success("Order Update Success!");
      await getOrdersRefetch();
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApiErrorMsg(`Failed to update order - ${orderId}`);
      message.error(`Failed to update order - ${orderId}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders().finally(() => setIsLoading(false));
  }, [getOrders]);

  return (
    <div className="page-wrapper">
      <div className="text-button-wrapper" style={{ marginBottom: "0.5rem" }}>
        <Text className="htext-2">Orders</Text>
        <Text>
          Total Earnings:{" "}
          <strong>
            {isLoading ? "Loading..." : `₱${adminEarningsTotal || "0.0"}`}
          </strong>
        </Text>
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
      {isLoading && <Spin fullscreen />}

      {/* Orders List */}
      <OrdersList orders={allOrders} updateOrder={updateOrderHandler} />
    </div>
  );
};

export default AdminOrdersPage;
