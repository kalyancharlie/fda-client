import React, { useEffect, useState } from 'react'
import { Row, Col, Button, message } from 'antd'
import RestaurantCard from './RestaurantCard/RestaurantCard'
import RestaurantModal from './modals/RestaurantModal/RestaurantModel'
import { IRestaurant } from '../interfaces/Restaurant.interface'
import { useRestaurants } from '../hooks/useRestaurants'

const VendorDashboard: React.FC = () => {
  const user_id = '28b99c4b-2984-44da-806b-fba73c2093b8'
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI4Yjk5YzRiLTI5ODQtNDRkYS04MDZiLWZiYTczYzIwOTNiOCIsInJvbGUiOiJWRU5ET1IiLCJpYXQiOjE3MjgxNTQzODUsImV4cCI6MTcyODE1Nzk4NX0.Z_kul8clpCD0XbrV7IpwK7e6qUpmbKkbdZ_Cbcc9hDU'
  const { restaurants, getRestaurants, updateRestaurant, createRestaurant } =
    useRestaurants(user_id)
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurant | null>(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null) // To store error messages

  useEffect(() => {
    if (user_id) {
      getRestaurants({
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        }
      })
    }
  }, [user_id, getRestaurants])

  const handleEdit = (restaurant: IRestaurant) => {
    setSelectedRestaurant(restaurant)
    setModalVisible(true)
  }

  const handleAddNew = () => {
    setSelectedRestaurant(null)
    setModalVisible(true)
  }

  const handleSave = async (restaurant: IRestaurant) => {
    setModalError(null) // Reset any previous errors
    try {
      if (selectedRestaurant) {
        // Update existing restaurant
        await updateRestaurant({
          variables: {
            restaurant: {
              id: restaurant.id,
              user_id: restaurant.user_id,
              name: restaurant.name,
              description: restaurant.description,
              address: restaurant.address,
              rating: restaurant.rating,
              operating_hours: restaurant.operating_hours,
              is_available: restaurant.is_available
            }
          }
        })
        message.success('Restaurant updated successfully!')
      } else {
        // Add new restaurant
        await createRestaurant({
          variables: {
            restaurants: {
              user_id: user_id,
              name: restaurant.name,
              description: restaurant.description,
              address: restaurant.address,
              rating: restaurant.rating,
              menu: restaurant.menu,
              operating_hours: restaurant.operating_hours,
              admin_approval: 'PENDING'
            }
          }
        })
        message.success('Restaurant created successfully!')
      }
      setModalVisible(false) // Close the modal on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle errors and show the error message
      setModalError(
        err.message || 'An error occurred while saving the restaurant'
      )
      message.error('Failed to save the restaurant!')
    }
  }

  return (
    <div>
      <Row gutter={16}>
        {restaurants.map((restaurant: IRestaurant) => (
          <Col span={6} key={restaurant.id}>
            <RestaurantCard
              restaurant={restaurant}
              onEdit={handleEdit}
              onClick={() => {}}
            />
          </Col>
        ))}
        <Col span={6}>
          <Button type="dashed" onClick={handleAddNew}>
            Add Restaurant
          </Button>
        </Col>
      </Row>

      {isModalVisible && (
        <RestaurantModal
          visible={isModalVisible}
          restaurant={selectedRestaurant || undefined}
          onSave={handleSave}
          onCancel={() => setModalVisible(false)}
          errorMessage={modalError || 'error'} // Pass the error message to the modal
        />
      )}
    </div>
  )
}

export default VendorDashboard
