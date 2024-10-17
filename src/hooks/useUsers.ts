import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  GET_USERS,
  GetAllUsersResponse
} from "../gql/query/user";
import { selectAuth } from "../features/authSlice";

export const useUser = () => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const [getUsers, { refetch: getUsersRefetch }] =
  useLazyQuery<GetAllUsersResponse>(GET_USERS, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
    fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
  });

  
  return {
    getUsers,
    getUsersRefetch
  };
};
