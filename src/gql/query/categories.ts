import { Categories } from "../../interfaces/Cat.interface";
import { gql } from "@apollo/client";

export interface GetCategoriesResponse {
  get_categories: {
    categories: Categories[];
  };
}

export const GET_CATEGORIES= gql`
query MyQuery {
  get_categories {
    categories {
      id
      image_url
      name
    }
    message
    statusCode
  }
}

`;
