import React from 'react';
import { Card, Button } from 'antd';
import { MenuItem } from '../interfaces/Menu.interface';

interface MenuCardProps {
  menu: MenuItem;
  onEdit: (menu: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onEdit }) => (
  <Card
    cover={<img alt={menu.name} src={menu.image_url} />}
    actions={[<Button onClick={() => onEdit(menu)}>Edit</Button>]}
  >
    <Card.Meta title={menu.name} description={menu.description} />
    <p>Price: {menu.price}</p>
    <p>Rating: {menu.rating}</p>
  </Card>
);

export default MenuCard;
