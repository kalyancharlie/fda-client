import React, { useEffect, useState } from "react";
import { Row, Col, Button, notification, Spin } from "antd";
import { useSelector } from "react-redux";

import MenuCard from "./MenuCard";
import MenuModal from "./MenuModal";
import { useMenu } from "../hooks/useMenu";
import { MenuItem } from "../interfaces/Menu.interface";
import { removeUndefinedFields } from "../utils";
import { selectAuth } from "../features/authSlice";

export interface IMenuDashboardProps {
  restaurantId: string;
  onCreate: () => void;
  onEdit: () => void;
}
const MenuDashboard: React.FC<IMenuDashboardProps> = ({
  restaurantId,
  onEdit,
  onCreate,
}) => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const { loading, menus, getMenus, updateMenu, createMenu } =
    useMenu(restaurantId);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleEdit = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setModalVisible(true);
  };

  const handleAddNew = () => {
    setSelectedMenu(null);
    setModalVisible(true);
  };

  useEffect(() => {
    if (restaurantId) {
      getMenus({
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
    }
  }, [restaurantId, getMenus, token]);

  const handleSave = async (menu: MenuItem) => {
    try {
      let result;
      if (selectedMenu) {
        const updatedMenuItem = {
          id: menu.id, // Ensure you include the id for the update
          name: menu.name,
          description: menu.description,
          price: menu.price,
          category: menu.category,
          is_available: menu.is_available,
          image_url: menu.image_url,
          rating: menu.rating, // Optional field
        };

        // Remove undefined fields
        const filteredMenuItem = removeUndefinedFields(updatedMenuItem);
        result = await updateMenu({
          variables: { menu_item: filteredMenuItem },
        });
        onEdit();
      } else {
        const newMenuData = {
          ...menu,
          restaurant_id: restaurantId,
          restaurant_name: "new restaurant",
        };
        console.log(newMenuData);
        result = await createMenu({ variables: { menu_items: newMenuData } });
        onCreate();
      }

      // Show success notification
      notification.success({
        message: "Success",
        description: selectedMenu
          ? "Menu item updated successfully!"
          : "Menu item created successfully!",
      });

      // Close the modal only after successful operation
      setModalVisible(false);
    } catch (err) {
      // Show error notification
      notification.error({
        message: "Error",
        description: `Failed to ${
          selectedMenu ? "update" : "create"
        } menu item: ${err.message}`,
      });
      // Do not close the modal and retain the data
    }
  };

  return (
    <div>
      <div className="text-button-wrapper">
        <h3>Menu Items:</h3>
        <Button type="primary" className="right-button" onClick={handleAddNew}>
          Add Menu Item
        </Button>
      </div>

      {loading && <Spin fullscreen />}

      <Row gutter={16}>
        {menus.map((menu: MenuItem) => (
          <Col span={6} key={menu.id}>
            <MenuCard menu={menu} onEdit={handleEdit} />
          </Col>
        ))}
        {menus?.length === 0 && "No Menu Item is added."}
      </Row>

      {isModalVisible && (
        <MenuModal
          visible={isModalVisible}
          menu={selectedMenu || undefined}
          onSave={handleSave}
          onCancel={() => setModalVisible(false)}
          categories={[
            { id: "1", name: "Appetizers" },
            { id: "2", name: "Main Course" },
            { id: "3", name: "Desserts" },
            { id: "4", name: "Beverages" },
          ]}
        />
      )}
    </div>
  );
};

export default MenuDashboard;
