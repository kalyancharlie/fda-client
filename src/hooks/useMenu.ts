import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_MENU_ITEMS, UPDATE_MENU_ITEM } from '../gql/mutations/menu-items';
import { GET_MENU_ITEMS_BY_RESTAURANT_ID } from '../gql/query/menu-items';
const token = localStorage.getItem('authToken') || "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI4Yjk5YzRiLTI5ODQtNDRkYS04MDZiLWZiYTczYzIwOTNiOCIsInJvbGUiOiJWRU5ET1IiLCJpYXQiOjE3MjgxNTQzODUsImV4cCI6MTcyODE1Nzk4NX0.Z_kul8clpCD0XbrV7IpwK7e6qUpmbKkbdZ_Cbcc9hDU"
export const useMenus = (restaurant_id:string) => {
  const [getMenus, { data, loading, error, refetch }] = useLazyQuery(GET_MENU_ITEMS_BY_RESTAURANT_ID,{
    variables: { restaurant_id },
    context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    fetchPolicy: 'network-only', // Optional: Ensures that the latest data is fetched from the server
  });
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
  const [updateMenu] = useMutation(UPDATE_MENU_ITEM,{
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
  console.log(data)
  return {
    menus,
    loading,
    error,
    getMenus,
    createMenu,
    updateMenu,
  };
};
