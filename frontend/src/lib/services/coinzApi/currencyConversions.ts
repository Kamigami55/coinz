import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface CurrencyConversionResponse {
  id: number;
  from_currency: number;
  to_currency: number;
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
      transformResponse: (response: CurrencyConversionResponse[]) => {
        const formattedResponse = response.map(
          (currencyConversion: CurrencyConversionResponse) =>
            ({
              id: currencyConversion.id,
              fromCurrencyId: currencyConversion.from_currency,
              toCurrencyId: currencyConversion.to_currency,
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
