import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface CurrencyResponse {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  icon: string;
}

export interface Currency {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  icon: string;
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
            }) as Currency
        );
        return formattedResponse;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrenciesQuery } = coinzApiWithCurrencies;
