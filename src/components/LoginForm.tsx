import React from 'react'
import { Form, Input, Button, message, Typography } from 'antd'
const { Text } = Typography

import { IApiFormState } from '../interfaces/Common.interface'
import { UserLoginResponse } from '../gql/query/user'

export interface ILoginFormState {
  role: 'VENDOR' | 'ADMIN'
  mobileNumber: string
  otp: string
}

export interface ILoginFormProps {
  formState: ILoginFormState
  setFormState: React.Dispatch<React.SetStateAction<ILoginFormState>>
  onSubmit: (
    isNotValidForm?: string
  ) => Promise<UserLoginResponse['user_login'] | undefined>
  apiState: IApiFormState
}
const LoginForm: React.FC<ILoginFormProps> = ({
  formState,
  setFormState,
  onSubmit,
  apiState
}) => {
  const { loading, error } = apiState
  // Handle form input changes
  const handleInputChange = (name: keyof typeof formState, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = () => {
    if (!formState.mobileNumber.match(/^\d{10}$/)) {
      message.error('Please enter a valid 10-digit mobile number.')
      onSubmit('Please enter a valid 10-digit mobile number.')
      return
    }

    if (formState.otp === '') {
      onSubmit('Please enter the OTP.')
      message.error('Please enter the OTP.')
      return
    }

    // Api Call
    onSubmit()
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
      <Form layout="vertical">
        {/* Role Selection */}
        {/* <Form.Item label="Select Role">
          <Radio.Group
            value={formState.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          >
            <Radio.Button value="VENDOR">Vendor</Radio.Button>
            <Radio.Button value="ADMIN">Admin</Radio.Button>
          </Radio.Group>
        </Form.Item> */}

        {/* Mobile Number */}
        <Form.Item
          label="Mobile Number"
          rules={[
            {
              required: true,
              message: 'Please enter your mobile number'
            }
          ]}
        >
          <Input
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            value={formState.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
          />
        </Form.Item>

        {/* OTP */}
        <Form.Item
          label="OTP"
          rules={[
            {
              required: true,
              message: 'Please enter the OTP sent to your phone'
            }
          ]}
        >
          <Input.Password
            placeholder="Enter OTP"
            value={formState.otp}
            onChange={(e) => handleInputChange('otp', e.target.value)}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" block onClick={handleSubmit} loading={loading}>
            Login
          </Button>
        </Form.Item>
        {error && <Text type="danger">{error}</Text>}
      </Form>
    </div>
  )
}

export default LoginForm
