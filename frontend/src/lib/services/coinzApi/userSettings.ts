import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface UserSettingResponse {
  id: number;
  default_currency: number;
  display_currency: number;
  updated_at: string;
  user: number;
}

export interface UserSetting {
  id: number;
  defaultCurrencyId: number;
  displayCurrencyId: number;
  updatedAt: string;
  userId: number;
}

interface UpdateUserSettingRequestParams {
  id: number;
  userId: number;
  defaultCurrencyId?: number;
  displayCurrencyId?: number;
}

interface UpdateUserSettingRequest {
  user: number;
  default_currency?: number;
  display_currency?: number;
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
        userId: response?.[0]?.user,
      }),
    }),
    // =========================================================================
    updateUserSetting: builder.mutation<
      UserSetting,
      UpdateUserSettingRequestParams
    >({
      query: (params: UpdateUserSettingRequestParams) => ({
        url: `/user_settings/${params.id}/`,
        method: 'PUT',
        body: {
          user: params.userId,
          default_currency: params.defaultCurrencyId,
          display_currency: params.displayCurrencyId,
        } as UpdateUserSettingRequest,
      }),
      transformResponse: (response: UserSettingResponse) =>
        ({
          id: response.id,
          defaultCurrencyId: response.default_currency,
          displayCurrencyId: response.display_currency,
          updatedAt: response.updated_at,
        }) as UserSetting,
    }),
  }),
});

export const { useGetUserSettingQuery, useUpdateUserSettingMutation } =
  coinzApiWithUserSettings;
