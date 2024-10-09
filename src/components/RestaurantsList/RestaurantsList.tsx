import React, { useMemo, useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Image,
  Checkbox,
  Row,
  Col,
} from "antd";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { IRestaurant } from "../../interfaces/Restaurant.interface";
import { DUMMY_IMG_URL } from "../../constants/assets";

export interface IRestaurantsListProps {
  restaurants: IRestaurant[];
  updateRestaurant: (restaurant: IRestaurant) => void;
}

const RestaurantList: React.FC<IRestaurantsListProps> = ({
  restaurants,
  updateRestaurant,
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "Logo",
    "Name",
    "Image",
    "Rating",
    "Action",
  ]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = (src: string) => {
    setPreviewImage(src);
    setPreviewVisible(true);
  };

  const [configVisible, setConfigVisible] = useState(false);
  const columnsOptions = ["Logo", "Name", "Image", "Rating", "Action"];

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
  const defaultColumns: ColumnsType<IRestaurant> = useMemo(
    () => [
      {
        title: "Logo",
        dataIndex: "logo",
        render: (text, record) => (
          <Image width={50} src={""} preview={{ visible: false }} />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Name"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => confirm()}
              style={{ marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button type="primary" onClick={() => confirm()} size="small">
                Search
              </Button>
              <Button
                onClick={() => {
                  if (clearFilters) {
                    clearFilters();
                  }
                }}
                size="small"
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
      },
      {
        title: "Image",
        dataIndex: "image",
        render: (text, record) => (
          <Button onClick={() => handlePreview(DUMMY_IMG_URL)}>Preview</Button>
        ),
      },
      {
        title: "Rating",
        dataIndex: "rating",
        sorter: (a, b) => a.rating - b.rating,
      },
      {
        title: "Action",
        render: (_, record) => (
          <Button
            icon={<EditOutlined />}
            onClick={() => updateRestaurant(record)}
          >
            Edit
          </Button>
        ),
      },
    ],
    [updateRestaurant]
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
        dataSource={restaurants}
        rowKey="id"
      />

      {/* Modal for Preview */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image src={previewImage} preview={false} />
      </Modal>

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

export default RestaurantList;
