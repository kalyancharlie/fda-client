import React, { useMemo, useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Checkbox,
  Row,
  Col,
  Select,
  InputNumber,
  Spin
} from 'antd'
import { EyeInvisibleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { ADMIN_STATUS_LIST } from '../../constants/data'
import './RestaurantsList.css'
import { IRestaurant } from '../../interfaces/Restaurant.interface'

export interface IAdminRestaurantListProps {
  restaurants: IRestaurant[]
  updateRestaurantApproval: (
    id: string,
    admin_approval: string
  ) => Promise<void>
  updateRestaurantCommisionRate: (
    id: string,
    commission_rate: number
  ) => Promise<void>
}

const RestaurantsAdminList: React.FC<IAdminRestaurantListProps> = ({
  restaurants,
  updateRestaurantApproval,
  updateRestaurantCommisionRate
}) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const columnsOptions = [
    'RestaurantID',
    'Name',
    'Rating',
    'Admin Approval',
    'Commission Rate'
  ]
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

  const defaultColumns: ColumnsType<IRestaurant> = useMemo(
    () => [
      {
        title: 'RestaurantID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'Rating'
      },
      {
        title: 'Admin Approval',
        dataIndex: 'admin_approval',
        key: 'admin_approval',
        render: (_, record) => (
          <Select
            value={record.admin_approval}
            style={{ minWidth: 100 }}
            onChange={(value) => {
              setIsUpdating(true)
              updateRestaurantApproval(record.id, value).finally(() =>
                setIsUpdating(false)
              )
            }}
            options={ADMIN_STATUS_LIST.map((status) => ({
              value: status,
              label: status
            }))}
          />
        )
      },
      {
        title: 'Commission Rate',
        dataIndex: 'commission_rate',
        key: 'commission_rate',
        render: (_, record) => (
          <InputNumber
            min={0}
            max={100}
            style={{ width: '100%' }}
            value={record.commission_rate}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setIsUpdating(true)
                updateRestaurantCommisionRate(
                  record.id,
                  Number(event.currentTarget.value)
                ).finally(() => setIsUpdating(false))
              }
            }}
          />
        )
      }
    ],
    [updateRestaurantApproval, updateRestaurantCommisionRate]
  )

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '1rem' }}
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
      {isUpdating && <Spin fullscreen />}

      {/* Table */}
      <Table
        columns={defaultColumns.filter((col) => {
          return visibleColumns.includes(col.title as string)
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
  )
}

export default RestaurantsAdminList
