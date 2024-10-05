import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";

import {
  updateAdminAuthState,
  updateVendorAuthState,
} from "../features/authSlice";
import { LOGIN_USER, UserLoginResponse } from "../gql/query/user";
import { IApiFormState } from "../interfaces/Common.interface";
import { ILoginFormState } from "../components/LoginForm";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [UserLogin, { loading, error: queryError }] =
    useLazyQuery<UserLoginResponse>(LOGIN_USER);
  const [apiState, setApiState] = useState<IApiFormState>({
    loading,
    message: "",
  });

  const verifyOtp = async (
    formState: ILoginFormState
  ): Promise<UserLoginResponse["user_login"] | undefined> => {
    try {
      const { mobileNumber, otp } = formState;
      const resp = await UserLogin({
        variables: { login_id: mobileNumber, otp },
      });

      const { data } = resp;
      if (data?.user_login) {
        const { user, token } = data.user_login;
        const authState = {
          userId: user.id,
          mobileNumber: user.phone,
          name: user.name,
          isAuthenticated: true,
          token,
        };

        if (user.role === "VENDOR") {
          dispatch(updateVendorAuthState(authState));
          message.success("Login Success");
          navigate("/vendor/home", { replace: true, state: authState });
        } else if (user.role === "ADMIN") {
          dispatch(updateAdminAuthState(authState));
          message.success("Login Success");
          navigate("/admin/home", { replace: true, state: authState });
        } else {
          message.error("Invalid User Role");
        }
        return data?.user_login;
      }
      return Promise.reject(resp.error);
    } catch (error) {
      message.error("Something went wrong!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (queryError) {
      setApiState((prev) => ({ ...prev, error: queryError.message }));
    } else {
      setApiState((prev) => ({ ...prev, error: undefined }));
    }
  }, [queryError]);

  return { verifyOtp, apiState: { ...apiState, loading }, setApiState };
};
