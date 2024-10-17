export const ORDER_STATUS_LIST = [
  "PENDING",
  "ONGOING",
  // "Rejected",
  // "In-Transit",
  // "Delivered",
  "COMPLETED",
];
export const ADMIN_STATUS_LIST = [
  "PENDING",
  "APPROVED",
  "REJECTED"
];

export const getOrderStatusList = () => {
  return ORDER_STATUS_LIST;
};
