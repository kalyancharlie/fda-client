import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { message } from "antd";

import LoginForm, { ILoginFormState } from "../components/LoginForm";
import { LOGIN_USER, UserLoginResponse } from "../gql/query/user";
import { IApiFormState } from "../interfaces/Common.interface";
import { useNavigate } from "react-router-dom";

const CommonLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<ILoginFormState>({
    role: "VENDOR",
    mobileNumber: "",
    otp: "",
  });
  const [UserLogin, { loading, error: queryError }] =
    useLazyQuery<UserLoginResponse>(LOGIN_USER);
  const [apiState, setApiState] = useState<IApiFormState>({
    loading,
    message: "",
  });

  const veriyOtpHandler = async (
    isNotValidForm?: string
  ): Promise<UserLoginResponse["user_login"] | undefined> => {
    try {
      if (isNotValidForm) {
        return;
      }

      const { mobileNumber, otp } = formState;
      const resp = await UserLogin({
        variables: { login_id: mobileNumber, otp },
      });

      const { data } = resp;
      if (data?.user_login) {
        const { user } = data.user_login;
        // Set Auth Token
        if (user.role === "VENDOR") {
          message.success("Login Success");
          navigate("/vendor/home", { replace: true });
        } else if (user.role === "ADMIN") {
          message.success("Login Success");
          navigate("/admin/home", { replace: true });
        } else {
          message.error("Invalid User Role");
        }
        return Promise.resolve(data?.user_login);
      }
      return Promise.reject(resp.error);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    if (queryError) {
      setApiState((prev) => ({ ...prev, error: queryError.message }));
    } else {
      setApiState((prev) => ({ ...prev, error: undefined }));
    }
  }, [queryError]);

  useEffect(() => {
    setApiState((prev) => ({ ...prev, error: undefined }));
  }, [formState]);

  return (
    <div>
      <LoginForm
        formState={formState}
        setFormState={setFormState}
        onSubmit={veriyOtpHandler}
        apiState={apiState}
      />
    </div>
  );
};

export default CommonLoginPage;
