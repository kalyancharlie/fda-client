// src/components/RestaurantModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { Restaurant } from '../interfaces/Restaurant.interface';

interface RestaurantModalProps {
  visible: boolean;
  restaurant?: Restaurant;
  onSave: (restaurant: Restaurant) => void;
  onCancel: () => void;
  errorMessage?: string; // Accept the error message prop
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({
  visible,
  restaurant,
  onSave,
  onCancel,
  errorMessage,
}) => {
  const [form] = Form.useForm();

  // Set initial form values when restaurant data is passed or cleared
  useEffect(() => {
    if (restaurant) {
      form.setFieldsValue(restaurant);
    } else {
      form.resetFields(); // Clear form when adding new restaurant
    }
  }, [restaurant, form]);

  return (
    <Modal
      title={restaurant ? 'Edit Restaurant' : 'Add Restaurant'}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSave({ ...restaurant, ...values }); // Merge the restaurant values with form fields
          })
          .catch((info) => console.log('Validation Failed:', info));
      }}
      onCancel={onCancel}
    >
      <Form form={form} initialValues={restaurant || {}}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
          <InputNumber min={1} max={5} />
        </Form.Item>
        <Form.Item name="operating_hours" label="Operating Hours" rules={[{ required: true }]}>
          <Input placeholder="e.g. Mon-Fri: 12:00 PM - 10:00 PM" />
        </Form.Item>
         {/* New address input */}
         <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input the restaurant address!" }]}
        >
          <Input />
        </Form.Item>
        {/* New contact details input */}
        <Form.Item
          name="contact_details"
          label="Contact Details"
          rules={[{ required: true, message: "Please input the contact details!" }]}
        >
          <Input />
          </Form.Item>
        {/* Add other form fields as needed */}
      </Form>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Display error message */}
    </Modal>
  );
};

export default RestaurantModal;
