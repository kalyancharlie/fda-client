export interface MenuItem {
    id: string;
    restaurant_id: string;
    restaurant_name: string;
    name: string;
    description: string;
    price: number;
    category: string;
    category_id: string;
    is_available: string;
    image_url: string;
    rating?: number;
    quantity: number;
  }
  