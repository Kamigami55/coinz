import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinzApi = createApi({
  reducerPath: 'coinzApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}` }),
  endpoints: () => ({}),
});
