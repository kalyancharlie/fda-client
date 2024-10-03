// src/components/Login.tsx
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../gql/query/user';

const Login: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState<any>(null);
  const [error, setError] = useState('');

  const [UserLogin, { loading, data, error: queryError }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      setToken(data.user_login.token);
      setUserDetails(data.user_login.user);
      setError('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    console.log(mobile, otp, 'mobile and otp')
    UserLogin({ variables: { login_id: mobile, otp } });
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {loading && <p>Loading...</p>}
      {queryError && <p style={{ color: 'red' }}>{queryError.message}</p>}
      {token && (
        <div>
          <h3>Login Successful!</h3>
          <p>Token: {token}</p>
          {userDetails && (
            <div>
              <h4>User Details:</h4>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Mobile: {userDetails.phone}</p>
              <p>Role: {userDetails.role}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
