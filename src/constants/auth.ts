import { IAuth } from "../interfaces/Auth.interface";

export const getDefaultAuthState = (): IAuth => ({
  userId: "",
  mobileNumber: "",
  name: "",
  token: "",
  isAuthenticated: false,
});
export const LOCAL_STORAGE_ADMIN_AUTH_KEY = "__fda_admin_auth";
export const LOCAL_STORAGE_VENDOR_AUTH_KEY = "__fda_vendor_auth";
