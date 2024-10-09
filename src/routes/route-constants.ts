export const ROUTE_VENDOR_ROOT = "vendor";

export const ROUTE_VENDOR_RESTAURANTS_ROOT = "restaurants";
export const ROUTE_RESTAURANT_ID_PARAM = "restaurantId";
export const ROUTE_VENDOR_RESTAURANTS_LIST_PAGE = `/${ROUTE_VENDOR_ROOT}/${ROUTE_VENDOR_RESTAURANTS_ROOT}`;
export const ROUTE_VENDOR_HOME = ROUTE_VENDOR_RESTAURANTS_LIST_PAGE;
export const ROUTE_VENDOR_RESTAURANT_PAGE = `${ROUTE_VENDOR_RESTAURANTS_LIST_PAGE}/:${ROUTE_RESTAURANT_ID_PARAM}`;
export const getVendorRestaurantPageRoute = (restaurantId: string) =>
  `${ROUTE_VENDOR_RESTAURANTS_LIST_PAGE}/${restaurantId}`;

export const ROUTE_VENDOR_ORDERS_ROOT = "orders";
export const ROUTE_VENDOR_ORDERS_PAGE = `/${ROUTE_VENDOR_ROOT}/${ROUTE_VENDOR_ORDERS_ROOT}`;
