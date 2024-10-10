export interface OrderItemResponse {
  admin_commission: string;
  delivery_address: string;
  id: string;
  order_completed_at: string;
  order_items: OrderItem[];
  order_placed_at: string;
  order_status: string;
  restaurant_id: string;
  total_amount: string;
  user_id: string;
  vendor_earnings: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
