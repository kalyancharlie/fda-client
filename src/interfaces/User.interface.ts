export interface User {
  account_status: string;
  address: string;
  email: string;
  id: string;
  name: string;
  order_history: string[];
  phone: string;
  role: "VENDOR" | "ADMIN";
}
