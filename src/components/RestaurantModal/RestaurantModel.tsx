import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

import { IRestaurant } from "../../interfaces/Restaurant.interface";
import "./RestaurantModal.css";

interface RestaurantModalProps {
  visible: boolean;
  restaurant?: IRestaurant;
  onSave: (restaurant: IRestaurant) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);

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
      title={restaurant ? "Edit Restaurant" : "Add Restaurant"}
      open={visible}
      centered={true}
      confirmLoading={isLoading}
      okText={restaurant ? "Save Changes" : "Add"}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setIsLoading(true);
            onSave({ ...restaurant, ...values }).finally(() => {
              setIsLoading(false);
            });
          })
          .catch((info) => console.log("Validation Failed:", info));
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        initialValues={restaurant || {}}
        layout="vertical"
        className="restaurant-modal"
      >
        <Form.Item
          className="input-wrapper"
          name="name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="input-wrapper"
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} placeholder="Enter the description here..." />
          {/* <Input /> */}
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
          name="operating_hours"
          label="Operating Hours"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g. Mon-Fri: 12:00 PM - 10:00 PM" />
        </Form.Item>
        {/* New address input */}
        <Form.Item
          className="input-wrapper"
          name="address"
          label="Address"
          rules={[
            { required: true, message: "Please input the restaurant address!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* New contact details input */}
        <Form.Item
          className="input-wrapper"
          name="contact_details"
          label="Contact Details"
          rules={[
            { required: true, message: "Please input the contact details!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Add other form fields as needed */}
      </Form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
    </Modal>
  );
};

export default RestaurantModal;
