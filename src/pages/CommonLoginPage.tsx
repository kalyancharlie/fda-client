import React, { useEffect, useState } from "react";

import LoginForm, { ILoginFormState } from "../components/LoginForm";
import { UserLoginResponse } from "../gql/query/user";
import { useLogin } from "../hooks/useLogin";
import { selectAuth } from "../features/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommonLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const adminAuth = useSelector(selectAuth);
  const { role } = adminAuth ?? {};
  const { apiState, setApiState, verifyOtp } = useLogin();

  const [formState, setFormState] = useState<ILoginFormState>({
    role: "VENDOR",
    mobileNumber: "",
    otp: "",
  });

  const veriyOtpHandler = async (
    isNotValidForm?: string
  ): Promise<UserLoginResponse["user_login"] | undefined> => {
    try {
      if (isNotValidForm) {
        return;
      }

      await verifyOtp(formState);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return;
    }
  };

  useEffect(() => {
    setApiState((prev) => ({ ...prev, error: undefined }));
  }, [formState, setApiState]);

  // Auto Login
  useEffect(() => {
    if (!adminAuth) return;
    if (role === "VENDOR") {
      navigate("/vendor/home", { replace: true });
    } else if (role === "ADMIN") {
      navigate("/admin/home", { replace: true });
    }
  }, [role, adminAuth, navigate]);

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
