import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface UserSettingResponse {
  id: number;
  default_currency: number;
  updated_at: string;
}

interface TransformedUserSetting {
  id: number;
  defaultCurrencyId: number;
  updatedAt: string;
}

interface GetUserSettingQueryParams {
  userId: string;
}

const coinzApiWithUserSettings = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSetting: builder.query<
      TransformedUserSetting,
      GetUserSettingQueryParams
    >({
      query: ({ userId }) => `/user_settings/${userId}/`,
      transformResponse: (response: UserSettingResponse) => ({
        id: response.id,
        defaultCurrencyId: response.default_currency,
        updatedAt: response.updated_at,
      }),
    }),
  }),
});

export const { useGetUserSettingQuery } = coinzApiWithUserSettings;