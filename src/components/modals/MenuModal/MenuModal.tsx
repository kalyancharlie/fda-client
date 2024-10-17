import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Switch } from "antd";

import { MenuItem } from "../../../interfaces/Menu.interface";
import "./MenuModal.css";

interface MenuModalProps {
  visible: boolean;
  menu?: MenuItem;
  onSave: (menu: MenuItem) => Promise<void | undefined>;
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setIsLoading(true);
      // Find the category name based on the selected category_id
      const selectedCategory = categories.find(
        (category) => category.id === values.category_id // Changed category_id to category
      );
      const categoryName = selectedCategory ? selectedCategory.name : "";
      // Include both category_id and category_name in the submitted values
      onSave({ ...menu, ...values, category: categoryName, category_id: values.category_id }).finally(() =>
        setIsLoading(false)
      );
    });
  };

  useEffect(() => {
    if (menu) {
      form.setFieldsValue(menu);
    } else {
      form.resetFields();
    }
  }, [menu, form]);

  return (
    <Modal
      title={menu ? "Edit Menu" : "Add Menu"}
      open={visible}
      centered={true}
      confirmLoading={isLoading}
      onCancel={onCancel}
      okText={menu ? "Save Changes" : "Add"}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical" className="menu-modal">
        <Form.Item
          className="input-wrapper"
          name="name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          className="input-wrapper"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="input-wrapper"
          name="image_url"
          label="Image URL"
          rules={[{ required: true, type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item
          className="input-wrapper"
          name="price"
          label="Price"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item
          className="input-wrapper"
          name="rating"
          label="Rating"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={5} />
        </Form.Item>
        <Form.Item
          className="input-wrapper"
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          className="input-wrapper"
          name="category_id" // Changed from category to category_id
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
          className="input-wrapper"
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
