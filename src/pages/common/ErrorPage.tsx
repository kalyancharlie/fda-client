import { Button, Result } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as unknown as {
    statusText?: string;
    message?: string;
  };
  console.error(error);

  return (
    <Result
      status="500"
      title="Oops! Something went wrong!"
      subTitle={error?.statusText || error?.message}
      extra={
        <Button
          type="primary"
          onClick={() => navigate("/login", { replace: true })}
        >
          Back Home
        </Button>
      }
      style={{ paddingTop: "100px", textAlign: "center" }}
    />
  );
}
