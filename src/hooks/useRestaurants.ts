import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_RESTAURANTS_BY_USER_ID } from '../gql/query/restaurant';
import { UPDATE_RESTAURANT, CREATE_RESTAURANTS } from '../gql/mutations/restaurant';

const token = localStorage.getItem('authToken') || "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI4Yjk5YzRiLTI5ODQtNDRkYS04MDZiLWZiYTczYzIwOTNiOCIsInJvbGUiOiJWRU5ET1IiLCJpYXQiOjE3MjgxNTQzODUsImV4cCI6MTcyODE1Nzk4NX0.Z_kul8clpCD0XbrV7IpwK7e6qUpmbKkbdZ_Cbcc9hDU"

export const useRestaurants = (user_id: string) => {
    const [getRestaurants, { data, loading, error, refetch }] = useLazyQuery(GET_RESTAURANTS_BY_USER_ID, {
    variables: { user_id },
    fetchPolicy: 'network-only', // Optional: Ensures that the latest data is fetched from the server
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
    createRestaurant
    // createRestaurant
  };
};
