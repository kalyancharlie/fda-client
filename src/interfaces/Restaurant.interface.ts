export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    image: string;
    menu?: string[]; // Optional menu items as a list of strings (could be IDs or dish names)
    user_id?: string;
    commission_rate?: number;
    total_earnings?: number;
    operating_hours?: string;
    contact_details?: string;
    cuisine_type?: string;
    address?: string;
    description?: string;
  }
  
  export interface MenuOrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface RestaurantModalProps {
    visible: boolean;
    restaurant?: Restaurant | null;
    onSave: (values: Restaurant) => void;
    onCancel: () => void;
  }