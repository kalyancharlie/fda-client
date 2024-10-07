import { Typography } from "antd";
const { Title } = Typography;

const ApiErrorMessage = ({ message }: { message: string }) => {
  return (
    <Title type="danger" level={5}>
      {message}
    </Title>
  );
};

export default ApiErrorMessage;
