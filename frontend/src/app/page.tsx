'use client';

import { ArrowUpRight, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { z } from 'zod';

import {
  AddTransactionForm,
  addTransactionFormSchema,
} from '@/components/AddTransactionForm';
import { TransactionsTable } from '@/components/TransactionsTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTransactionsToDisplay } from '@/lib/helper';
import {
  CategoryType,
  useGetCategoriesQuery,
} from '@/lib/services/coinzApi/categories';
import { useGetCurrenciesQuery } from '@/lib/services/coinzApi/currencies';
import { useGetCurrencyConversionsQuery } from '@/lib/services/coinzApi/currencyConversions';
import { useGetLedgersQuery } from '@/lib/services/coinzApi/ledgers';
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
} from '@/lib/services/coinzApi/transactions';
import { useGetUserSettingQuery } from '@/lib/services/coinzApi/userSettings';

export default function HomePage() {
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: currencyConversions } = useGetCurrencyConversionsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: userSetting } = useGetUserSettingQuery();
  const { data: ledgers } = useGetLedgersQuery();
  const { data: transactions } = useGetTransactionsQuery();

  const displayCurrencyId = userSetting?.displayCurrencyId;
  const displayCurrency = useMemo(() => {
    return currencies?.find((currency) => currency.id === displayCurrencyId);
  }, [currencies, displayCurrencyId]);

  const [addTransactionMutation, { isLoading: addTransactionLoading }] =
    useAddTransactionMutation();

  const handleAddTransaction = async (
    values: z.infer<typeof addTransactionFormSchema>
  ) => {
    await addTransactionMutation({
      ledgerId: values.ledgerId,
      amount: values.amount,
      currencyId: values.currencyId,
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      date: values.date.toISOString(),
    });
  };

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

  const totalExpenses = useMemo(() => {
    return transactionsToDisplay
      ?.filter(
        (transaction) => transaction?.category?.type === CategoryType.EXPENSE
      )
      .reduce((acc, transaction) => {
        return acc + transaction.amountInDisplayCurrency;
      }, 0);
  }, [transactionsToDisplay]);

  const totalIncome = useMemo(() => {
    return transactionsToDisplay
      ?.filter(
        (transaction) => transaction?.category?.type === CategoryType.INCOME
      )
      .reduce((acc, transaction) => {
        return acc + transaction.amountInDisplayCurrency;
      }, 0);
  }, [transactionsToDisplay]);

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {displayCurrency?.symbol}
              {totalExpenses.toFixed(displayCurrency?.precision)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {displayCurrency?.symbol}
              {totalIncome.toFixed(displayCurrency?.precision)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent transactions.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/transactions">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <TransactionsTable transactionsToDisplay={transactionsToDisplay} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="grid gap-2">
              <CardTitle>Add Transaction</CardTitle>
              <CardDescription>Create a new transaction.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            <AddTransactionForm
              currencies={currencies}
              categories={categories}
              ledgers={ledgers}
              onAddTransaction={handleAddTransaction}
              isSubmitting={addTransactionLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
