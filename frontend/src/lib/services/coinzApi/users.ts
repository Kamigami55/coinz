import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface GetUserQueryParams {
  userId: string;
}

const coinzApiWithUsers = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, GetUserQueryParams>({
      query: ({ userId }) => `/users/${userId}/`,
      transformResponse: (response: UserResponse) => ({
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.first_name,
        lastName: response.last_name,
      }),
    }),
  }),
});

export const { useGetUserQuery } = coinzApiWithUsers;
