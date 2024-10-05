import { IAuth } from "../interfaces/Auth.interface";

export const getAuthState = (localStorageKey: string): IAuth | null => {
  try {
    const authStateString = localStorage.getItem(localStorageKey);
    if (!authStateString) {
      return null;
    }

    const authState = JSON.parse(authStateString) as IAuth;
    const { userId, token, isAuthenticated, mobileNumber, name } = authState;
    return {
      userId,
      mobileNumber,
      name,
      token,
      isAuthenticated,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("getAuthState");
    console.log(error?.message);
    return null;
  }
};

export const updateAuthState = (
  localStorageKey: string,
  newAuthState: IAuth
): boolean => {
  localStorage.setItem(localStorageKey, JSON.stringify(newAuthState));
  return true;
};
