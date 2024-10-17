import { IAuth } from "../interfaces/Auth.interface";

export const getDefaultAuthState = (): IAuth => ({
  userId: "",
  mobileNumber: "",
  name: "",
  token: "",
  isAuthenticated: false,
});
export const LOCAL_STORAGE_AUTH_KEY = "__fda_common_auth";
