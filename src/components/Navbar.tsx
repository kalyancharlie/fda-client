import React from "react";
import { Layout, Menu, Dropdown, Avatar, Typography, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

export interface INavbarProps {
  moduleName?: string;
  userName: string;
  onLogout: () => void;
}
const Navbar: React.FC<INavbarProps> = ({ moduleName, userName, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "0 20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {moduleName && (
        <Text strong style={{ fontSize: "18px" }}>
          {moduleName}
        </Text>
      )}

      <Space>
        <Text>{userName}</Text>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            style={{ cursor: "pointer" }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default Navbar;
