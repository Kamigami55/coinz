'use client';
import { useMemo } from 'react';
import { z } from 'zod';

import {
  AddTransactionForm,
  addTransactionFormSchema,
} from '@/components/AddTransactionForm';
import { TransactionsDataTable } from '@/components/TransactionsDataTable';
import { getTransactionsToDisplay } from '@/lib/helper';
import { useGetCategoriesQuery } from '@/lib/services/coinzApi/categories';
import { useGetCurrenciesQuery } from '@/lib/services/coinzApi/currencies';
import { useGetCurrencyConversionsQuery } from '@/lib/services/coinzApi/currencyConversions';
import { useGetLedgersQuery } from '@/lib/services/coinzApi/ledgers';
import { useGetRecurringBillsQuery } from '@/lib/services/coinzApi/recurringBills';
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
} from '@/lib/services/coinzApi/transactions';
import { useGetUserQuery } from '@/lib/services/coinzApi/users';
import { useGetUserSettingQuery } from '@/lib/services/coinzApi/userSettings';

export default function TransactionsPage() {
  const userId = '1';
  const displayCurrencyId = 1;

  const { data: currencies } = useGetCurrenciesQuery();
  const { data: currencyConversions } = useGetCurrencyConversionsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: userSetting } = useGetUserSettingQuery({ userId });
  const { data: user } = useGetUserQuery({ userId });
  const { data: ledgers } = useGetLedgersQuery();
  const { data: transactions } = useGetTransactionsQuery();
  const { data: recurringBills } = useGetRecurringBillsQuery();

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

  return (
    <>
      <div className="space-y-16 py-16 xl:space-y-20">
        <div className="px-8">
          <AddTransactionForm
            currencies={currencies}
            categories={categories}
            ledgers={ledgers}
            onAddTransaction={handleAddTransaction}
            isSubmitting={addTransactionLoading}
          />
        </div>

        <TransactionsDataTable transactionsToDisplay={transactionsToDisplay} />
      </div>
    </>
  );
}
