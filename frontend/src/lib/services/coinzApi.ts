// get all currencies using rtk-query via this api

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CurrencyResponse {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  icon: string;
}

interface TransformedCurrency {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  icon: string;
}

export const coinzApi = createApi({
  reducerPath: 'coinzApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}` }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<TransformedCurrency[], void>({
      query: () => `/currencies/`,
      transformResponse: (response: { results: CurrencyResponse[] }) => {
        const formattedResponse = response.results.map(
          (currency: CurrencyResponse) => ({
            id: currency.id,
            name: currency.name,
            abbreviation: currency.abbreviation,
            symbol: currency.symbol,
            icon: currency.icon,
          })
        );
        return formattedResponse;
      },
    }),
    getCurrencyConversions: builder.query({
      query: () => `/currency_conversions/`,
    }),
    getCategories: builder.query({
      query: () => `/categories/`,
    }),
    getUserSetting: builder.query({
      query: ({ userId }: { userId: string }) => `/user_settings/${userId}/`,
    }),
    getUser: builder.query({
      query: ({ userId }: { userId: string }) => `/users/${userId}/`,
    }),
    getLedgers: builder.query({
      query: () => `/ledgers/`,
    }),
    getTransactions: builder.query({
      query: () => `/transactions/`,
    }),
    getRecurringBills: builder.query({
      query: () => `/recurring_bills/`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCurrenciesQuery,
  useGetCurrencyConversionsQuery,
  useGetCategoriesQuery,
  useGetUserSettingQuery,
  useGetUserQuery,
  useGetLedgersQuery,
  useGetTransactionsQuery,
  useGetRecurringBillsQuery,
} = coinzApi;
