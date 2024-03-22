import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface CategoryResponse {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface TransformedCategory {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const coinzApiWithCategories = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<TransformedCategory[], void>({
      query: () => `/categories/`,
      transformResponse: (response: { results: CategoryResponse[] }) => {
        const formattedResponse = response.results.map(
          (category: CategoryResponse) =>
            ({
              id: category.id,
              name: category.name,
              color: category.color,
              icon: category.icon,
              type: category.type,
              createdAt: category.created_at,
              updatedAt: category.updated_at,
            } as TransformedCategory)
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = coinzApiWithCategories;
