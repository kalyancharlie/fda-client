import React, { useEffect, useState } from 'react';
import { Row, Col, Button, notification } from 'antd';
import MenuCard from './MenuCard';
import MenuModal from './MenuModal';
import { useMenus } from '../hooks/useMenu';
import { MenuItem } from '../interfaces/Menu.interface';
import { removeUndefinedFields } from '../utils';

const MenuDashboard: React.FC = () => {
    const restaurant_id = "ee158e5c-1304-40c9-91c8-63b789863598";
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI4Yjk5YzRiLTI5ODQtNDRkYS04MDZiLWZiYTczYzIwOTNiOCIsInJvbGUiOiJWRU5ET1IiLCJpYXQiOjE3MjgxNTQzODUsImV4cCI6MTcyODE1Nzk4NX0.Z_kul8clpCD0XbrV7IpwK7e6qUpmbKkbdZ_Cbcc9hDU";
    const { loading, error, menus, getMenus, updateMenu, createMenu } = useMenus(restaurant_id);
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
        if (restaurant_id) {
            getMenus({
                context: {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                },
            });
        }
    }, [restaurant_id, getMenus]);

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
                result = await updateMenu({ variables: { menu_item: filteredMenuItem } });
            } else {
                const newMenuData = { ...menu, restaurant_id, restaurant_name: "new restaurant" }
                console.log(newMenuData)
                result = await createMenu({ variables: {menu_items: newMenuData}});
            }

            // Show success notification
            notification.success({
                message: 'Success',
                description: selectedMenu ? 'Menu item updated successfully!' : 'Menu item created successfully!',
            });

            // Close the modal only after successful operation
            setModalVisible(false);

        } catch (err) {
            // Show error notification
            notification.error({
                message: 'Error',
                description: `Failed to ${selectedMenu ? 'update' : 'create'} menu item: ${err.message}`,
            });
            // Do not close the modal and retain the data
        }
    };

    return (
        <div>
            <Row gutter={16}>
                {menus.map((menu: MenuItem) => (
                    <Col span={6} key={menu.id}>
                        <MenuCard menu={menu} onEdit={handleEdit} />
                    </Col>
                ))}
                <Col span={6}>
                    <Button type="dashed" onClick={handleAddNew}>
                        Add Menu Item
                    </Button>
                </Col>
            </Row>

            {isModalVisible && (
                <MenuModal
                    visible={isModalVisible}
                    menu={selectedMenu || undefined}
                    onSave={handleSave}
                    onCancel={() => setModalVisible(false)}
                    categories={[
                        { id: '1', name: 'Appetizers' },
                        { id: '2', name: 'Main Course' },
                        { id: '3', name: 'Desserts' },
                        { id: '4', name: 'Beverages' },
                    ]}
                />
            )}
        </div>
    );
};

export default MenuDashboard;
