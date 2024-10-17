/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Spin, Typography } from 'antd'
const { Title } = Typography
import { message } from 'antd'

import ApiErrorMessage from '../../../components/ApiErrorMessage'
import { useRestaurants } from '../../../hooks/useRestaurants'
import RestaurantsAdminList from '../../../components/RestaurantsList/RestaurantListAdmin'

const AdminRestaurantPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const {
    getAllRestaurants: getRestaurants,
    getAllRestaurantsData: restaurants,
    updateRestaurant: updateRestaurant,
    getAllRestaurantsRefetch: refetch
  } = useRestaurants('')

  const [apiErrorMsg, setApiErrorMsg] = useState<string>('')

  // Update Restaurant - Admin Approval and Commission Rate
  const updateAdminRestaurantHandler = async (
    id: string,
    admin_approval: string
  ) => {
    try {
      const res = await updateRestaurant({
        variables: {
          restaurant: {
            id: id,
            admin_approval: admin_approval
          }
        }
      })
      console.log(res)
      message.success('Restaurant Admin Approval Updated Successfully!')
      refetch()
    } catch (error) {
      setApiErrorMsg(`Failed to update admin approval for restaurant - ${id}`)
      message.error(`Failed to update admin approval for restaurant - ${id}`)
    }
  }

  // Update Restaurant - Commission Rate
  const updateRestaurantCommisionRateHandler = async (
    id: string,
    commission_rate: number
  ) => {
    try {
      const res = await updateRestaurant({
        variables: {
          restaurant: {
            id: id,
            commission_rate: commission_rate
          }
        }
      })
      console.log(res)
      message.success('Restaurant Commission Rate Updated Successfully!')
      refetch()
    } catch (error) {
      setApiErrorMsg(`Failed to update commission rate for restaurant - ${id}`)
      message.error(`Failed to update commission rate for restaurant - ${id}`)
    }
  }

  useEffect(() => {
    getRestaurants().finally(() => setLoading(false))
  }, [getRestaurants])

  return (
    <div className="page-wrapper">
      <div className="text-button-wrapper">
        <Title level={3}>Restaurants</Title>
      </div>
      {apiErrorMsg && <ApiErrorMessage message={apiErrorMsg || 'Error'} />}
      {loading && <Spin fullscreen />}

      {/* Orders List */}
      <RestaurantsAdminList
        restaurants={restaurants}
        updateRestaurantApproval={updateAdminRestaurantHandler}
        updateRestaurantCommisionRate={updateRestaurantCommisionRateHandler}
      />
    </div>
  )
}

export default AdminRestaurantPage
