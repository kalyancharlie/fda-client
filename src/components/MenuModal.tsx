import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Switch } from "antd";
import { MenuItem } from "../interfaces/Menu.interface";

interface MenuModalProps {
  visible: boolean;
  menu?: MenuItem;
  onSave: (menu: MenuItem) => void;
  onCancel: () => void;
  categories: { id: string; name: string }[];
}

const MenuModal: React.FC<MenuModalProps> = ({
  visible,
  menu,
  onSave,
  onCancel,
  categories,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (menu) {
      form.setFieldsValue(menu);
    } else {
      form.resetFields();
    }
  }, [menu]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // Find the category name based on the selected category_id
      const selectedCategory = categories.find(
        (category) => category.id === values.category_id
      );
      const categoryName = selectedCategory ? selectedCategory.name : "";

      // Include both category_id and category_name in the submitted values
      onSave({ ...menu, ...values, category: categoryName });
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      title={menu ? "Edit Menu" : "Add Menu"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
          <InputNumber min={1} max={5} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="is_available"
          label="Available"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MenuModal;
