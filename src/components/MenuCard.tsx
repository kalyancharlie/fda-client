import React from "react";
import { Card, Button } from "antd";

import { MenuItemResponse } from "../gql/query/menu-items";
import { DUMMY_IMG_URL } from "../constants/assets";

interface MenuCardProps {
  menu: MenuItemResponse;
  onEdit: (menu: MenuItemResponse) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onEdit }) => (
  <Card
    cover={<img alt={menu.name} src={DUMMY_IMG_URL} />}
    actions={[<Button onClick={() => onEdit(menu)}>Edit</Button>]}
  >
    <Card.Meta title={menu.name} description={menu.description} />
    <p>Price: {menu.price}</p>
    <p>Rating: {menu.rating}</p>
  </Card>
);

export default MenuCard;
