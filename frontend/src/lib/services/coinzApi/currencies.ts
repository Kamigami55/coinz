import { coinzApi } from '@/lib/services/coinzApi/baseApi';

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

const coinzApiWithCurrencies = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query<TransformedCurrency[], void>({
      query: () => `/currencies/`,
      transformResponse: (response: { results: CurrencyResponse[] }) => {
        const formattedResponse = response.results.map(
          (currency: CurrencyResponse) =>
            ({
              id: currency.id,
              name: currency.name,
              abbreviation: currency.abbreviation,
              symbol: currency.symbol,
              icon: currency.icon,
            } as TransformedCurrency)
        );
        return formattedResponse;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrenciesQuery } = coinzApiWithCurrencies;
