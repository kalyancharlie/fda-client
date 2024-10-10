import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import {
  GET_RESTAURANTS_BY_USER_ID,
  GetRestaurantResponse,
} from "../gql/query/restaurant";
import {
  UPDATE_RESTAURANT,
  CREATE_RESTAURANTS,
} from "../gql/mutations/restaurant";
import { selectAuth } from "../features/authSlice";

export const useRestaurants = (user_id: string) => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const [getRestaurants, { data, loading, error, refetch }] =
    useLazyQuery<GetRestaurantResponse>(GET_RESTAURANTS_BY_USER_ID, {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: { user_id },
      fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
    });

  const [updateRestaurant] = useMutation(UPDATE_RESTAURANT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      // Refetch the restaurant data after updating
      refetch();
    },
  });

  // Mutation for creating a new restaurant
  const [createRestaurant] = useMutation(CREATE_RESTAURANTS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      // Refetch the restaurant data after creating
      refetch();
    },
  });

  return {
    restaurants: data ? data.get_restaurant_by_user_id.restaurants : [],
    loading,
    error,
    getRestaurants,
    updateRestaurant,
    createRestaurant,
  };
};
