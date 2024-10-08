import { useLazyQuery, useMutation } from "@apollo/client";

import {
  CREATE_MENU_ITEMS,
  UPDATE_MENU_ITEM,
} from "../gql/mutations/menu-items";
import {
  GET_MENU_ITEMS_BY_RESTAURANT_ID,
  GetMenuItemsByRestaurantIdResponse,
} from "../gql/query/menu-items";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";

export const useMenu = (restaurant_id: string) => {
  const auth = useSelector(selectAuth);
  const { token } = auth ?? {};

  const [getMenus, { data, loading, error, refetch }] =
    useLazyQuery<GetMenuItemsByRestaurantIdResponse>(
      GET_MENU_ITEMS_BY_RESTAURANT_ID,
      {
        variables: { restaurant_id },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
        fetchPolicy: "network-only", // Optional: Ensures that the latest data is fetched from the server
      }
    );
  const [createMenu] = useMutation(CREATE_MENU_ITEMS, {
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
  const [updateMenu] = useMutation(UPDATE_MENU_ITEM, {
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

  const menus = data?.get_menu_items_by_restaurant_id.menu_items || [];
  return {
    menus,
    loading,
    error,
    getMenus,
    createMenu,
    updateMenu,
  };
};
