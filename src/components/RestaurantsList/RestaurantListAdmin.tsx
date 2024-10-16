import React, { useMemo, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Checkbox,
  Row,
  Col,
  Select,
  TableColumnsType,
  InputNumber,
} from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { TableColumnsType } from "antd";

import { OrderItemResponse } from "../../interfaces/Order.interface";
import { ADMIN_STATUS_LIST, ORDER_STATUS_LIST } from "../../constants/data";
import "./RestaurantsList.css";
import { IRestaurant } from "../../interfaces/Restaurant.interface";

export interface IAdminRestaurantListProps {
  restaurants: IRestaurant[];
  updateRestaurantApproval: (id: string, admin_approval: string) => void;
  updateRestaurantCommisionRate: (id: string, commission_rate: Number) => void;
}

const RestaurantsAdminList: React.FC<IAdminRestaurantListProps> = ({ restaurants, updateRestaurantApproval, updateRestaurantCommisionRate }) => {
  const columnsOptions = [
    "Restaurant Id",
    "Name",
    "Image",
    "Rating",
    "Admin Approval",
    "Restaurant live",
    "Commission Rate"
  ];
  const [visibleColumns, setVisibleColumns] =
    useState<string[]>(columnsOptions);
  const [configVisible, setConfigVisible] = useState(false);

  const handleConfigChange = (checkedValues: CheckboxValueType[]) => {
    setVisibleColumns(checkedValues as string[]);
  };

  const handleConfigOk = () => {
    setConfigVisible(false);
  };

  const handleConfigCancel = () => {
    setConfigVisible(false);
  };

  const defaultColumns: ColumnsType<IRestaurant> = useMemo(
    () => [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Rating",
            dataIndex: "rating",
            key: "Rating",
          },
      {
        title: "Admin Approval",
        dataIndex: "admin_approval",
        key: "admin_approval",
        render: (_, record) => (
          <Select
            value={record.admin_approval}
            style={{ minWidth: 100 }}
            onChange={(value) => {
              updateRestaurantApproval(record.id, value);
            }}
            options={ADMIN_STATUS_LIST.map((status) => ({
              value: status,
              label: status,
            }))}
            // loading={loading}
          />
        ),
      },
      {
        title: "Commission Rate",
        dataIndex: "commission_rate",
        key: "commission_rate",
        render: (_, record) => (
          <InputNumber
            min={0}
            max={100}
            style={{ width: "100%" }}
            value={record.commission_rate}
            onChange={(value) => {
              updateRestaurantCommisionRate(record.id, value as number); // Call update for commission rate
            }}
          />
        ),
      },
    ],
    [updateRestaurantApproval, updateRestaurantCommisionRate]
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

      {/* Table */}
      <Table
        columns={defaultColumns.filter((col) => {
          return visibleColumns.includes(col.title as string);
        })}
        dataSource={restaurants}
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

export default RestaurantsAdminList;
