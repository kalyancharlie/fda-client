import React, { useMemo } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { OrderItem } from "../../interfaces/Order.interface";
import "./OrdersList.css";

export interface IOrderItemsListProps {
  orders: OrderItem[];
}

const OrderItemsList: React.FC<IOrderItemsListProps> = ({ orders }) => {
  const columnsOptions = ["Id", "Name", "Quantity", "Price"];

  // Table Columns Configuration
  const defaultColumns: ColumnsType<OrderItem> = useMemo(
    () => [
      {
        title: "Item ID",
        dataIndex: "id",
      },
      {
        title: "Item Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        sorter: (a, b) => a.quantity - b.quantity,
      },
    ],
    []
  );

  return (
    <>
      <Table
        size="small"
        columns={defaultColumns.filter((col) => {
          return columnsOptions.includes(col.title as string);
        })}
        dataSource={orders}
        rowKey="id"
      />
    </>
  );
};

export default OrderItemsList;
