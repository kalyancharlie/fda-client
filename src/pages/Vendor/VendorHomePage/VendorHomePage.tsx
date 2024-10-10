import React, { useEffect, useState } from "react";
import { Button, Spin, Typography } from "antd";
const { Title } = Typography;
import { useSelector } from "react-redux";
import { message } from "antd";

import RestaurantsList from "../../../components/RestaurantsList/RestaurantsList";
import { IRestaurant } from "../../../interfaces/Restaurant.interface";
import { useRestaurants } from "../../../hooks/useRestaurants";
import { selectAuth } from "../../../features/authSlice";
import RestaurantModal from "../../../components/modals/RestaurantModal/RestaurantModel";
import ApiErrorMessage from "../../../components/ApiErrorMessage";
import "./VendorHomePage.css";

export type UpdateRestaurantFuncType = (params: {
  restaurantId: string;
  updateProps: Partial<IRestaurant>;
}) => void;

const VendorHomePage: React.FC = () => {
  const auth = useSelector(selectAuth);
  const { userId } = auth ?? {};
  const {
    loading,
    error,
    restaurants,
    getRestaurants,
    updateRestaurant,
    createRestaurant,
  } = useRestaurants(userId as string);
  const [isUpdateModalOpen, setIsUpdateModalOpen] =
    useState<IRestaurant | null>(null);

  const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
  // Create Restaurant
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const displayCreateModal = () => {
    setIsAddModalOpen(true);
  };
  const createRestaurantHandler = async (restaurant: IRestaurant) => {
    try {
      const {
        name,
        description,
        address,
        rating,
        menu,
        cuisine_type,
        operating_hours,
        contact_details,
      } = restaurant;
      await createRestaurant({
        variables: {
          restaurants: {
            user_id: userId,
            name,
            description,
            address,
            rating,
            menu,
            cuisine_type,
            operating_hours,
            contact_details,
            commission_rate: 10,
          },
        },
      });
      message.success("Restaurant Created Successfully!");
      setIsAddModalOpen(false);
      getRestaurants();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApiErrorMsg("Failed");
      message.error("Failed to Create");
    }
  };
  const onCreateCancel = () => {
    setApiErrorMsg("");
    setIsAddModalOpen(false);
  };

  // Update Restaurant
  const updateRestaurantHandler = async (restaurant: IRestaurant) => {
    try {
      const { id, user_id, name, description, address, rating } = restaurant;
      await updateRestaurant({
        variables: {
          restaurant: {
            id,
            user_id,
            name,
            description,
            address,
            rating,
          },
        },
      });
      message.success("Restaurant Update Success!");
      setIsUpdateModalOpen(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApiErrorMsg("Failed");
      message.error("Failed to Update");
    }
  };

  const displayUpdateModal = (restaurant: IRestaurant) => {
    setIsUpdateModalOpen(restaurant);
  };

  const onUpdateCancel = () => {
    setApiErrorMsg("");
    setIsUpdateModalOpen(null);
  };

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  return (
    <div className="page-wrapper vendor-home-page-wrapper">
      <div className="text-button-wrapper">
        <Title level={4}>Restaurants</Title>
        <Button
          type="primary"
          className="right-button"
          onClick={displayCreateModal}
        >
          Add Restaurant
        </Button>
      </div>
      {error && (
        <ApiErrorMessage
          message={
            error.cause?.message ||
            error?.cause?.name ||
            "Error in Fetching Restaurants"
          }
        />
      )}
      {loading && <Spin fullscreen />}

      {/* Restaurants List */}
      <RestaurantsList
        restaurants={restaurants}
        updateRestaurant={displayUpdateModal}
      />

      {/* Add Restaurant Modal */}
      {isAddModalOpen && (
        <RestaurantModal
          visible
          onSave={(newRestaurant) => {
            return createRestaurantHandler(newRestaurant);
          }}
          errorMessage={apiErrorMsg}
          onCancel={onCreateCancel}
        />
      )}

      {/* Update Restaurant Modal */}
      {isUpdateModalOpen && (
        <RestaurantModal
          visible
          onSave={(updatedRestaurant) => {
            return updateRestaurantHandler(updatedRestaurant);
          }}
          restaurant={isUpdateModalOpen}
          errorMessage={apiErrorMsg}
          onCancel={onUpdateCancel}
        />
      )}
    </div>
  );
};

export default VendorHomePage;
