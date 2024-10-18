import React, { useMemo, useState } from 'react'
import { Table, Button, Modal, Checkbox, Row, Col, Image } from 'antd'
import {
  EditOutlined,
  EyeInvisibleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { MenuItemResponse } from '../../gql/query/menu-items'
import Title from 'antd/es/typography/Title'
import { DUMMY_IMG_URL } from '../../constants/assets'

export interface IMenuItemListProps {
  menuItems: MenuItemResponse[]
  updateMenuItem: (menuItem: MenuItemResponse) => void
}

const columnsOptions = [
  'Id',
  'Name',
  'Image',
  'Rating',
  'Category',
  'Price',
  'Qty',
  'Available',
  'Action'
]
const MenuItemList: React.FC<IMenuItemListProps> = ({
  menuItems,
  updateMenuItem
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columnsOptions)
  const [configVisible, setConfigVisible] = useState(false)

  const handleConfigChange = (checkedValues: string[]) => {
    setVisibleColumns(checkedValues as string[])
  }

  const handleConfigOk = () => {
    setConfigVisible(false)
  }

  const handleConfigCancel = () => {
    setConfigVisible(false)
  }

  // Table Columns Configuration
  const defaultColumns: ColumnsType<MenuItemResponse> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        sorter: (a, b) => a.id.localeCompare(b.id)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: 'Image',
        dataIndex: 'image_url',
        render: (_text, record) => (
          <Image width={50} src={record.image_url || DUMMY_IMG_URL} />
        )
      },
      {
        title: 'Rating',
        dataIndex: 'rating'
        // sorter: (a, b) => a?.rating - b?.rating || 0,
      },
      {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.localeCompare(b.category)
      },
      {
        title: 'Qty',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity
      },
      {
        title: 'Available',
        dataIndex: 'is_available',
        render: (_text, record) =>
          record.is_available ? (
            <CheckCircleOutlined
              style={{ color: '#63E6BE', fontSize: '24px' }}
            /> // Green tick for available
          ) : (
            <CloseCircleOutlined
              style={{ color: '#FF6B6B', fontSize: '24px' }}
            /> // Red cross for unavailable
          ),
        sorter: (a, b) => a.is_available.localeCompare(b.is_available)
      },
      {
        title: 'Action',
        render: (_, record) => (
          <Button
            icon={<EditOutlined />}
            onClick={() => updateMenuItem(record)}
          >
            Edit
          </Button>
        )
      }
    ],
    [updateMenuItem]
  )

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '1rem' }}
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
          return visibleColumns.includes(col.title as string)
        })}
        dataSource={menuItems}
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
  )
}

export default MenuItemList
