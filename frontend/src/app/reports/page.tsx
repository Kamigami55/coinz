'use client';

import { useMemo } from 'react';

import { PieChart } from '@/components/PieChart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTransactionsToDisplay, TransactionToDisplay } from '@/lib/helper';
import { useGetCategoriesQuery } from '@/lib/services/coinzApi/categories';
import { useGetCurrenciesQuery } from '@/lib/services/coinzApi/currencies';
import { useGetCurrencyConversionsQuery } from '@/lib/services/coinzApi/currencyConversions';
import { useGetLedgersQuery } from '@/lib/services/coinzApi/ledgers';
import { useGetTransactionsQuery } from '@/lib/services/coinzApi/transactions';
import { useGetUserSettingQuery } from '@/lib/services/coinzApi/userSettings';

export default function ReportsGeneralPage() {
  const { data: userSetting } = useGetUserSettingQuery();
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: currencyConversions } = useGetCurrencyConversionsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: ledgers } = useGetLedgersQuery();
  const { data: transactions } = useGetTransactionsQuery();

  const displayCurrencyId = userSetting?.displayCurrencyId;

  const transactionsToDisplay = useMemo(() => {
    return getTransactionsToDisplay({
      displayCurrencyId,
      transactions,
      categories,
      currencies,
      currencyConversions,
      ledgers,
    });
  }, [
    displayCurrencyId,
    transactions,
    categories,
    currencies,
    currencyConversions,
    ledgers,
  ]);

  // group by category, and sum up the amount
  const transactionsSummary = useMemo(() => {
    return transactionsToDisplay?.reduce(
      (
        acc: {
          id: string;
          label: string;
          value: number;
          color: string;
        }[],
        transaction: TransactionToDisplay
      ) => {
        const category = transaction.category;
        if (!category) {
          return acc;
        }
        const data = acc.find((data) => data.id === category.name);
        if (!data) {
          return [
            ...acc,
            {
              id: category.name,
              label: category.name,
              value: parseFloat(
                transaction.amountInDisplayCurrency.toFixed(
                  transaction.displayCurrency.precision
                )
              ),
              color: category.color,
            },
          ];
        }
        return [
          ...acc.map((data) => {
            if (data.id === category.name) {
              return {
                ...data,
                value:
                  data.value +
                  parseFloat(
                    transaction.amountInDisplayCurrency.toFixed(
                      transaction.displayCurrency.precision
                    )
                  ),
              };
            }
            return data;
          }),
        ];
      },
      []
    );
  }, [transactionsToDisplay]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>By Category</CardTitle>
          <CardDescription>View transactions by category.</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
          <PieChart data={transactionsSummary} />
        </CardContent>
      </Card>
    </div>
  );
}
