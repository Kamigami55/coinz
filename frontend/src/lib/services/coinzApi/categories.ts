import { coinzApi } from '@/lib/services/coinzApi/baseApi';

export enum CategoryType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

interface CategoryResponse {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: CategoryType;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: CategoryType;
  createdAt: string;
  updatedAt: string;
}

const coinzApiWithCategories = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `/categories/`,
      transformResponse: (response: CategoryResponse[]) => {
        const formattedResponse = response.map(
          (category: CategoryResponse) =>
            ({
              id: category.id,
              name: category.name,
              color: category.color,
              icon: category.icon,
              type: category.type,
              createdAt: category.created_at,
              updatedAt: category.updated_at,
            }) as Category
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = coinzApiWithCategories;
