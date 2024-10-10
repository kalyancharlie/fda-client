import React, { useMemo, useState } from "react";
import { Table, Button, Modal, Checkbox, Row, Col } from "antd";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

import { MenuItemResponse } from "../../gql/query/menu-items";
import Title from "antd/es/typography/Title";

export interface IMenuItemListProps {
  menuItems: MenuItemResponse[];
  updateMenuItem: (menuItem: MenuItemResponse) => void;
}

const columnsOptions = [
  "Id",
  "Name",
  // "Image",
  "Rating",
  "Category",
  "Price",
  "Qty",
  "Is Available",
  "Action",
];
const MenuItemList: React.FC<IMenuItemListProps> = ({
  menuItems,
  updateMenuItem,
}) => {
  const [visibleColumns, setVisibleColumns] =
    useState<string[]>(columnsOptions);
  const [configVisible, setConfigVisible] = useState(false);
  // const [previewVisible, setPreviewVisible] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");

  // const handlePreview = (src: string) => {
  //   setPreviewImage(src);
  //   setPreviewVisible(true);
  // };

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
  const defaultColumns: ColumnsType<MenuItemResponse> = useMemo(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        sorter: (a, b) => a.id.localeCompare(b.id),
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Rating",
        dataIndex: "rating",
        // sorter: (a, b) => a?.rating - b?.rating || 0,
      },
      {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => a.category.localeCompare(b.category),
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        sorter: (a, b) => a.quantity - b.quantity,
      },
      {
        title: "Is Available",
        dataIndex: "is_available",
        sorter: (a, b) => a.is_available.localeCompare(b.is_available),
      },
      {
        title: "Action",
        render: (_, record) => (
          <Button
            icon={<EditOutlined />}
            onClick={() => updateMenuItem(record)}
          >
            Edit
          </Button>
        ),
      },
    ],
    [updateMenuItem]
  );

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "1rem" }}
      >
        <Col>
          <Title level={4}>Menu Items</Title>
        </Col>
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
        dataSource={menuItems}
        rowKey="id"
      />

      {/* Modal for Preview */}
      {/* <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image src={previewImage} preview={false} />
      </Modal> */}

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

export default MenuItemList;
