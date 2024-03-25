import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface UserSettingResponse {
  id: number;
  default_currency: number;
  display_currency: number;
  updated_at: string;
}

export interface UserSetting {
  id: number;
  defaultCurrencyId: number;
  displayCurrencyId: number;
  updatedAt: string;
}

const coinzApiWithUserSettings = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSetting: builder.query<UserSetting, void>({
      query: () => `/user_settings/`,
      transformResponse: (response: UserSettingResponse[]) => ({
        id: response?.[0]?.id,
        defaultCurrencyId: response?.[0]?.default_currency,
        displayCurrencyId: response?.[0]?.display_currency,
        updatedAt: response?.[0]?.updated_at,
      }),
    }),
  }),
});

export const { useGetUserSettingQuery } = coinzApiWithUserSettings;
