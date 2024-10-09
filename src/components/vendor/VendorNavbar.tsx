import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Row, Col } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SettingOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import {
  ROUTE_VENDOR_ORDERS_PAGE,
  ROUTE_VENDOR_RESTAURANTS_LIST_PAGE,
} from "../../routes/route-constants";

type MenuItem = Required<MenuProps>["items"][number];

const navMenu: MenuItem[] = [
  {
    label: "Restaurants",
    key: ROUTE_VENDOR_RESTAURANTS_LIST_PAGE,
    icon: <HomeOutlined />,
  },
  {
    label: "Orders",
    key: ROUTE_VENDOR_ORDERS_PAGE,
    icon: <HomeOutlined />,
  },
  {
    label: "",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "item",
        key: "logout",
        label: "Logout",
        icon: <LogoutOutlined />,
      },
    ],
  },
];

const { Header } = Layout;
const { Text } = Typography;

export interface INavbarProps {
  moduleName?: string;
  userName: string;
  onLogout: () => void;
}
const VendorNavbar: React.FC<INavbarProps> = ({
  moduleName,
  userName,
  onLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(ROUTE_VENDOR_RESTAURANTS_LIST_PAGE);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      onLogout();
      return;
    }
    navigate(e.key);
  };

  useEffect(() => {
    switch (location.pathname) {
      default:
        setCurrent(location.pathname);
    }
  }, [location]);

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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

      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 0]}
        style={{ gap: "1rem" }}
      >
        <Col>
          <Text>
            Hi <b>{userName}!</b>
          </Text>
        </Col>
        <Col>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={navMenu}
            disabledOverflow
          />
        </Col>
      </Row>
    </Header>
  );
};

export default VendorNavbar;
