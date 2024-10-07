export interface IUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  address: string;
  order_history: string[];
  role: "VENDOR" | "ADMIN";
  account_status: string;
}
