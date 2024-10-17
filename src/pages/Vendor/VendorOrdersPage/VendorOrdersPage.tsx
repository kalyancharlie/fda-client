import React, { useEffect, useMemo, useState } from 'react'
import { Spin, Typography } from 'antd'
const { Text } = Typography
import { useSelector } from 'react-redux'
import { message } from 'antd'

import { selectAuth } from '../../../features/authSlice'
import ApiErrorMessage from '../../../components/ApiErrorMessage'
import { useOrders } from '../../../hooks/useOrders'
import OrdersList from '../../../components/OrdersList/OrdersList'
import './VendorOrdersPage.css'
import { useRestaurants } from '../../../hooks/useRestaurants'

const VendorOrdersPage: React.FC = () => {
  const auth = useSelector(selectAuth)
  const { userId } = auth ?? {}
  const { restaurants, getRestaurants } = useRestaurants(userId as string)
  const [{ restaurantsLoading, ordersLoading, isUpdating }, setLoading] =
    useState<{
      restaurantsLoading: boolean
      ordersLoading: boolean
      isUpdating: boolean
    }>({ restaurantsLoading: true, ordersLoading: true, isUpdating: false })
  const {
    error,
    getOrdersByRestaurantIds,
    getOrdersByRestaurantIdsRefetch,
    allOrdersByRestaurantIds,
    updateOrder
  } = useOrders('', userId as string)
  const restaurantIds = useMemo(
    () => restaurants.map((rest) => rest.id) || [],
    [restaurants]
  )

  const vendorEarningsTotal = allOrdersByRestaurantIds.reduce(
    (prev, curr) => prev + curr.vendor_earnings,
    0
  )

  const [apiErrorMsg, setApiErrorMsg] = useState<string>('')

  // Update Order - only Status field
  const updateOrderHandler = async (orderId: string, orderStatus: string) => {
    setLoading((prev) => ({ ...prev, isUpdating: true }))
    try {
      const res = await updateOrder(orderId, orderStatus)
      console.log(res)
      message.success('Order Update Success!')
      getOrdersByRestaurantIdsRefetch()
      setLoading((prev) => ({ ...prev, isUpdating: false }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApiErrorMsg(`Failed to update order - ${orderId}`)
      message.error(`Failed to update order - ${orderId}`)
      setLoading((prev) => ({ ...prev, isUpdating: false }))
    }
  }

  useEffect(() => {
    setLoading((prev) => ({ ...prev, restaurantsLoading: true }))
    getRestaurants().then(() =>
      setLoading((prev) => ({ ...prev, restaurantsLoading: false }))
    )
  }, [getRestaurants])

  useEffect(() => {
    if (restaurantIds.length > 0) {
      setLoading((prev) => ({ ...prev, ordersLoading: true }))
      getOrdersByRestaurantIds({ variables: { ids: restaurantIds } }).then(() =>
        setLoading((prev) => ({ ...prev, ordersLoading: false }))
      )
    }
  }, [restaurantIds, getOrdersByRestaurantIds])

  return (
    <div className="page-wrapper">
      <div className="text-button-wrapper" style={{ marginBottom: '0.5rem' }}>
        <Text className="htext-2">Orders</Text>
        <Text>
          Total Earnings:{' '}
          <strong>
            {restaurantsLoading || ordersLoading
              ? 'Loading...'
              : `₱${vendorEarningsTotal || '0.0'}`}
          </strong>
        </Text>
      </div>
      {error && (
        <ApiErrorMessage
          message={
            error.cause?.message || apiErrorMsg || error?.cause?.name || 'Error'
          }
        />
      )}
      {(restaurantsLoading || ordersLoading || isUpdating) && (
        <Spin fullscreen />
      )}

      {/* Orders List */}
      <OrdersList
        orders={allOrdersByRestaurantIds}
        updateOrder={updateOrderHandler}
      />
    </div>
  )
}

export default VendorOrdersPage
