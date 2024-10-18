import React from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
const { Meta } = Card

import { IRestaurant } from '../../interfaces/Restaurant.interface'
import './RestaurantCard.css'

interface RestaurantCardProps {
  restaurant: IRestaurant
  onEdit: (restaurant: IRestaurant) => void
  onClick: (restaurant: IRestaurant) => void
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onClick
}) => {
  const { image_url, name } = restaurant

  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <img
          alt={`${name} Image`}
          src={
            'https://dev.konekbuhay.com/static/media/web-bento-gamification.10f12df0803ac948f652.png'
          }
        />
      }
      actions={[
        <EditOutlined
          key="edit"
          onClick={(event) => {
            event.stopPropagation()
            onEdit(restaurant)
          }}
        />
      ]}
      onClick={(event) => {
        event.stopPropagation()
        onClick(restaurant)
      }}
    >
      <Meta avatar={<Avatar src={image_url} />} title={name} />
    </Card>
  )
}

export default RestaurantCard
