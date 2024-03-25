import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface CurrencyResponse {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  icon: string;
  precision: number;
}

export interface Currency {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  icon: string;
  precision: number;
}

const coinzApiWithCurrencies = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currency[], void>({
      query: () => `/currencies/`,
      transformResponse: (response: CurrencyResponse[]) => {
        const formattedResponse = response.map(
          (currency: CurrencyResponse) =>
            ({
              id: currency.id,
              name: currency.name,
              abbreviation: currency.abbreviation,
              symbol: currency.symbol,
              icon: currency.icon,
              precision: currency.precision,
            }) as Currency
        );
        return formattedResponse;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrenciesQuery } = coinzApiWithCurrencies;
