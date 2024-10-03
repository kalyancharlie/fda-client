import { gql } from '@apollo/client';

// export const LOGIN_USER = gql`
//   mutation LoginUser($mobile: String!) {
//     loginUser(mobile: $mobile) {
//       token
//       user {
//         id
//         name
//         email
//         mobile
//       }
//     }
//   }
// `;

export const LOGIN_USER = gql`
query UserLogin($login_id: String, $otp: String) {
  user_login(login_id: $login_id, otp: $otp) {
    statusCode
    message
    token
    user {
      account_status
      address
      email
      id
      name
      order_history
      phone
      role
    }
  }
}
`