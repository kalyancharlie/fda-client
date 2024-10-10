import React, { useMemo, useState } from "react";
import { Table, Button, Modal, Checkbox, Row, Col, Select } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

import { OrderItemResponse } from "../../interfaces/Order.interface";
import { ORDER_STATUS_LIST } from "../../constants/data";
import "./OrdersList.css";

export interface IOrdersListProps {
  orders: OrderItemResponse[];
  updateOrder: (id: string, order_status: string) => void;
}

const OrdersList: React.FC<IOrdersListProps> = ({ orders, updateOrder }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "Order ID",
    "Delivery Address",
    "Total Amount",
    "Earnings",
    "Order Placed At",
    "Order Status",
    "Order Status",
    "Order Completed At",
  ]);

  const [configVisible, setConfigVisible] = useState(false);
  const columnsOptions = [
    "Order ID",
    "Delivery Address",
    "Total Amount",
    "Earnings",
    "Order Placed At",
    "Order Status",
    "Order Status",
    "Order Completed At",
  ];

  const handleConfigChange = (checkedValues: CheckboxValueType[]) => {
    setVisibleColumns(checkedValues as string[]);
  };

  const handleConfigOk = () => {
    setConfigVisible(false);
  };

  const handleConfigCancel = () => {
    setConfigVisible(false);
  };

  // Table Columns Configuration
  const defaultColumns: ColumnsType<OrderItemResponse> = useMemo(
    () => [
      {
        title: "Order ID",
        dataIndex: "id",
      },
      {
        title: "Delivery Address",
        dataIndex: "delivery_address",
        sorter: (a, b) => a.delivery_address.localeCompare(b.delivery_address),
      },
      {
        title: "Total Amount",
        dataIndex: "total_amount",
        sorter: (a, b) => a.total_amount.localeCompare(b.total_amount),
      },
      {
        title: "Earnings",
        dataIndex: "vendor_earnings",
        sorter: (a, b) => a.vendor_earnings.localeCompare(b.vendor_earnings),
      },
      {
        title: "Order Placed At",
        dataIndex: "order_placed_at",
        sorter: (a, b) => a.order_placed_at.localeCompare(b.order_placed_at),
      },
      {
        title: "Order Status",
        dataIndex: "order_status",
        render: (_, record) => (
          <Select
            value={record.order_status}
            style={{ minWidth: 100 }}
            onChange={(value) => {
              updateOrder(record.id, value);
            }}
            options={ORDER_STATUS_LIST.map((status) => ({
              value: status,
              label: status,
            }))}
            // loading={loading}
          />
        ),
      },
      {
        title: "Order Completed At",
        dataIndex: "order_completed_at",
        sorter: (a, b) =>
          a.order_completed_at.localeCompare(b.order_completed_at),
      },
    ],
    [updateOrder]
  );

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "1rem" }}
      >
        <Col> </Col>
        <Col>
          <Button
            icon={<EyeInvisibleOutlined />}
            type="dashed"
            onClick={() => setConfigVisible(true)}
          ></Button>
        </Col>
      </Row>
      <Table
        size="small"
        columns={defaultColumns.filter((col) => {
          return visibleColumns.includes(col.title as string);
        })}
        dataSource={orders}
        rowKey="id"
      />

      {/* Modal for Column Configuration */}
      <Modal
        title="Configure Columns"
        open={configVisible}
        onOk={handleConfigOk}
        onCancel={handleConfigCancel}
      >
        <Checkbox.Group
          options={columnsOptions}
          value={visibleColumns}
          onChange={handleConfigChange}
        />
      </Modal>
    </>
  );
};

export default OrdersList;
