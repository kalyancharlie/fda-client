import { gql } from "@apollo/client";
import { IUser } from "../../interfaces/User.interface";

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

export interface UserLoginResponse {
  user_login: {
    statusCode: number;
    message: string;
    token: string;
    user: IUser;
  };
}

export interface GetAllUsersResponse {
  user_login: {
    statusCode: number;
    message: string;
    user: [IUser];
  };
}

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
`;

export const GET_USERS = gql`
query MyQuery {
  get_users {
    message
    statusCode
    users {
      account_status
      address
      email
      favorites
      id
      name
      phone
      order_history
      role
    }
  }
}
`