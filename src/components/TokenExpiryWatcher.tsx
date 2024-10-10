import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectAuth } from "../features/authSlice";
import { isTokenExpired } from "../utils/auth-utils";

const TokenExpirationWatcher = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  useEffect(() => {
    if (token) {
      // Set up an interval to check token expiration every second
      const intervalId = setInterval(() => {
        if (isTokenExpired(token)) {
          // If token is expired, dispatch the logout action and clear the interval
          dispatch(logout());
          clearInterval(intervalId); // Stop further checks
        }
      }, 1000); // Check every second

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [dispatch, token]);

  return null; // This component doesn't render anything
};

export default TokenExpirationWatcher;
