import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as unknown as {
    statusText?: string;
    message?: string;
  };
  console.error(error);

  return (
    <div id="error-page-wrapper">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
