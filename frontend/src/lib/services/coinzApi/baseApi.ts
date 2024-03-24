import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

// Define a base query function that injects the Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: async (headers) => {
    // Get the current session
    const session = await getSession();
    // If we have a session and it includes an access token, set the Authorization header
    if (session?.access_token) {
      headers.set('authorization', `Bearer ${session.access_token}`);
    }
    return headers;
  },
});

export const coinzApi = createApi({
  reducerPath: 'coinzApi',
  baseQuery,
  endpoints: () => ({}),
});
