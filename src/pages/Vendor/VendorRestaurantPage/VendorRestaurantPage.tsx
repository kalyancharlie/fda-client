import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { IRestaurant } from '../../../interfaces/Restaurant.interface'
import { useMenu } from '../../../hooks/useMenu'
import MenuDashboard from '../../../components/MenuDashboard/MenuDashboard'
import {
  getVendorRestaurantPageRoute,
  ROUTE_RESTAURANT_ID_PARAM
} from '../../../routes/route-constants'
import { useRestaurants } from '../../../hooks/useRestaurants'
import { selectAuth } from '../../../features/authSlice'
import './VendorRestaurantPage.css'

interface IRestaurantParams {
  [ROUTE_RESTAURANT_ID_PARAM]: string
}
const VendorRestaurantPage: React.FC = () => {
  const navigate = useNavigate()
  const auth = useSelector(selectAuth)
  const { userId } = auth ?? {}
  const { loading, error, restaurants, getRestaurants } = useRestaurants(
    userId as string
  )

  const location = useLocation()
  const restaurant = location.state as IRestaurant
  const params = useParams<IRestaurantParams>()
  const restaurantId = params[ROUTE_RESTAURANT_ID_PARAM]

  const { getMenus, menus } = useMenu(restaurantId as string)

  const handleChange = (value: string) => {
    navigate(getVendorRestaurantPageRoute(value), { replace: true })
  }

  useEffect(() => {
    getRestaurants()
  }, [getRestaurants])

  useEffect(() => {
    getMenus()
  }, [getMenus])

  return (
    <div className="restaurant-page-wrapper">
      {/* Menu Item List */}
      <MenuDashboard
        restaurantId={restaurantId as string}
        restaurants={restaurants}
        onRestaurantChange={handleChange}
        onCreate={getMenus}
        onEdit={getMenus}
      />
    </div>
  )
}

export default VendorRestaurantPage
