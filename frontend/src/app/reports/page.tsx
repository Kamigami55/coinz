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
import {
  formatCurrency,
  getTransactionsToDisplay,
  summarizeTransactionsByCategory,
} from '@/lib/helper';
import {
  CategoryType,
  useGetCategoriesQuery,
} from '@/lib/services/coinzApi/categories';
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
  const displayCurrency = useMemo(() => {
    return currencies?.find((currency) => currency.id === displayCurrencyId);
  }, [currencies, displayCurrencyId]);

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

  const incomeTransactions = useMemo(() => {
    return transactionsToDisplay?.filter(
      (transaction) => transaction?.category?.type === CategoryType.INCOME
    );
  }, [transactionsToDisplay]);

  const expenseTransactions = useMemo(() => {
    return transactionsToDisplay?.filter(
      (transaction) => transaction?.category?.type === CategoryType.EXPENSE
    );
  }, [transactionsToDisplay]);

  const incomeSummary = useMemo(() => {
    return summarizeTransactionsByCategory(incomeTransactions);
  }, [incomeTransactions]);

  const expenseSummary = useMemo(() => {
    return summarizeTransactionsByCategory(expenseTransactions);
  }, [expenseTransactions]);

  const totalExpenses = useMemo(() => {
    return expenseTransactions?.reduce(
      (acc, transaction) => acc + transaction.amountInDisplayCurrency,
      0
    );
  }, [expenseTransactions]);

  const totalIncome = useMemo(() => {
    return incomeTransactions?.reduce(
      (acc, transaction) => acc + transaction.amountInDisplayCurrency,
      0
    );
  }, [incomeTransactions]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>
            Total expenses:{' '}
            <b>{formatCurrency(totalExpenses, displayCurrency)}</b>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
          <PieChart data={expenseSummary} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
          <CardDescription>
            Total income: <b>{formatCurrency(totalIncome, displayCurrency)}</b>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
          <PieChart data={incomeSummary} />
        </CardContent>
      </Card>
    </div>
  );
}
