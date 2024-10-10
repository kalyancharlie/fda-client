import React, { useEffect, useState } from "react";
import { Button, notification, Spin, Select } from "antd";
import { useSelector } from "react-redux";

import MenuModal from "../modals/MenuModal/MenuModal";
import { useMenu } from "../../hooks/useMenu";
import { MenuItem } from "../../interfaces/Menu.interface";
import { removeUndefinedFields } from "../../utils";
import { selectAuth } from "../../features/authSlice";
import MenuItemList from "../MenuItemList/MenuItemList";
import { IRestaurant } from "../../interfaces/Restaurant.interface";
import "./MenuDashboard.css";
import { useCategory } from "../../hooks/useCategory";

export interface IMenuDashboardProps {
  restaurantId: string;
  restaurants: IRestaurant[];
  onRestaurantChange: (id: string) => void;
  onCreate: () => void;
  onEdit: () => void;
}
const MenuDashboard: React.FC<IMenuDashboardProps> = ({
  restaurantId,
  restaurants,
  onRestaurantChange,
  onEdit,
  onCreate,
}) => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const { loading, menus, getMenus, updateMenu, createMenu } =
    useMenu(restaurantId);
    const { getCategories, loading: categoryLoading, categories } =useCategory();
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
      getCategories({
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
    <div className="menu-dashboard-wrapper">
      <div className="text-button-wrapper" style={{ marginBottom: "1rem" }}>
        {/* Restaurants Select Menu */}
        <Select
          value={restaurantId || ""}
          style={{ minWidth: 200 }}
          onChange={onRestaurantChange}
          options={restaurants.map((rest) => ({
            value: rest.id,
            label: rest.name,
          }))}
          loading={loading}
        />
        <Button type="primary" className="right-button" onClick={handleAddNew}>
          Add Menu Item
        </Button>
      </div>

      {loading && <Spin fullscreen />}

      {/* <Row gutter={16}>
        {menus.map((menu: MenuItem) => (
          <Col span={6} key={menu.id}>
            <MenuCard menu={menu} onEdit={handleEdit} />
          </Col>
        ))}
        {menus?.length === 0 && "No Menu Item is added."}
      </Row> */}
      {/* Menu Item List */}
      <MenuItemList menuItems={menus} updateMenuItem={handleEdit} />

      {isModalVisible && (
        <MenuModal
          visible={isModalVisible}
          menu={selectedMenu || undefined}
          onSave={handleSave}
          onCancel={() => setModalVisible(false)}
          // categories={[
          //   { id: "1", name: "Appetizers" },
          //   { id: "2", name: "Main Course" },
          //   { id: "3", name: "Desserts" },
          //   { id: "4", name: "Beverages" },
          // ]}
          categories={categories}
        />
      )}
    </div>
  );
};

export default MenuDashboard;
