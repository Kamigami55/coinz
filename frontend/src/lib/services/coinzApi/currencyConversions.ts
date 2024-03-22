import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface CurrencyConversionResponse {
  id: number;
  from_currency_id: number;
  to_currency_id: number;
  rate: number;
  updated_at: string;
}

export interface CurrencyConversion {
  id: number;
  fromCurrencyId: number;
  toCurrencyId: number;
  rate: number;
  updatedAt: string;
}

const coinzApiWithCurrencyConversions = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencyConversions: builder.query<CurrencyConversion[], void>({
      query: () => `/currency_conversions/`,
      transformResponse: (response: {
        results: CurrencyConversionResponse[];
      }) => {
        const formattedResponse = response.results.map(
          (currencyConversion: CurrencyConversionResponse) =>
            ({
              id: currencyConversion.id,
              fromCurrencyId: currencyConversion.from_currency_id,
              toCurrencyId: currencyConversion.to_currency_id,
              rate: currencyConversion.rate,
              updatedAt: currencyConversion.updated_at,
            }) as CurrencyConversion
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetCurrencyConversionsQuery } =
  coinzApiWithCurrencyConversions;
