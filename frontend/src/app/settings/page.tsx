'use client';

import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  UpdateUserSettingForm,
  updateUserSettingFormSchema,
} from '@/components/UpdateUserSettingForm';
import { useGetCurrenciesQuery } from '@/lib/services/coinzApi/currencies';
import {
  useGetUserSettingQuery,
  useUpdateUserSettingMutation,
} from '@/lib/services/coinzApi/userSettings';

export default function SettingsGeneralPage() {
  const { data: userSetting, refetch: refetchUserSetting } =
    useGetUserSettingQuery();
  const { data: currencies } = useGetCurrenciesQuery();

  const [updateUserSetting, { isLoading: isSubmitting }] =
    useUpdateUserSettingMutation();

  const handleUpdateUserSetting = async (
    values: z.infer<typeof updateUserSettingFormSchema>
  ) => {
    await updateUserSetting({
      id: userSetting?.id,
      userId: userSetting?.userId,
      displayCurrencyId: values.displayCurrencyId,
    });
    refetchUserSetting();
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Currency</CardTitle>
          <CardDescription>
            The currency that you want to display on your Coinz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateUserSettingForm
            currencies={currencies}
            displayCurrencyId={userSetting?.displayCurrencyId}
            onSubmit={handleUpdateUserSetting}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
