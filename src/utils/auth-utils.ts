/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode, JwtPayload } from "jwt-decode";

import { LOCAL_STORAGE_AUTH_KEY } from "../constants/auth";
import { IAuthWithRole } from "../interfaces/Auth.interface";

export const setAuth = (auth: IAuthWithRole | null) => {
  const str = JSON.stringify(auth);
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, str);
};

export const getAuth = (): IAuthWithRole | null => {
  try {
    const parsedAuth = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) || "{}"
    ) as IAuthWithRole;
    if (parsedAuth) {
      const { isAuthenticated, mobileNumber, name, role, token, userId } =
        parsedAuth;
      return {
        isAuthenticated,
        mobileNumber,
        name,
        role,
        token,
        userId,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token: string | null): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token || "");

    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decoded?.exp || decoded?.exp < currentTime) {
      return true;
    } else {
      return false;
    }
    return false;
  } catch (error) {
    return true;
  }
};
