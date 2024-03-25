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

const coinzApiWithUsers = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => `/users/`,
      transformResponse: (response: UserResponse[]) => ({
        id: response?.[0]?.id,
        username: response?.[0]?.username,
        email: response?.[0]?.email,
        firstName: response?.[0]?.first_name,
        lastName: response?.[0]?.last_name,
      }),
    }),
  }),
});

export const { useGetUserQuery } = coinzApiWithUsers;
