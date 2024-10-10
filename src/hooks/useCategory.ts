import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import {
GET_CATEGORIES
} from "../gql/query/categories";

import { selectAuth } from "../features/authSlice";

export const useCategory = () => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const [getCategories, { data, loading, error }] =
    useLazyQuery(GET_CATEGORIES, {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
    });

  // Mutation for creating a new restaurant


  return {
    categories: data ? data.get_categories.categories : [],
    loading,
    error,
    getCategories
  };
};
