'use client';

import * as React from 'react';
import { z } from 'zod';

import {
  AddTransactionForm,
  addTransactionFormSchema,
} from '@/components/AddTransactionForm';
import { DeleteTransactionAlertDialog } from '@/components/DeleteTransactionAlertDialog';
import { TransactionsDataTable } from '@/components/TransactionsDataTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UpdateTransactionDialog } from '@/components/UpdateTransactionDialog';
import {
  UpdateTransactionForm,
  updateTransactionFormSchema,
} from '@/components/UpdateTransactionForm';
import { getTransactionsToDisplay } from '@/lib/helper';
import { useGetCategoriesQuery } from '@/lib/services/coinzApi/categories';
import { useGetCurrenciesQuery } from '@/lib/services/coinzApi/currencies';
import { useGetCurrencyConversionsQuery } from '@/lib/services/coinzApi/currencyConversions';
import { useGetLedgersQuery } from '@/lib/services/coinzApi/ledgers';
import {
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/lib/services/coinzApi/transactions';
import { useGetUserSettingQuery } from '@/lib/services/coinzApi/userSettings';

export default function TransactionsPage() {
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: currencyConversions } = useGetCurrencyConversionsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: userSetting } = useGetUserSettingQuery();
  const { data: ledgers } = useGetLedgersQuery();
  const { data: transactions, refetch: refetchTransactions } =
    useGetTransactionsQuery();

  const displayCurrencyId = userSetting?.displayCurrencyId;

  const transactionsToDisplay = React.useMemo(() => {
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

  // Add related logic
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
    refetchTransactions();
  };
  // ./Add related logic

  // Update related logic
  const [transactionIdToConfirmUpdate, setTransactionIdToConfirmUpdate] =
    React.useState<number>();
  const transactionToUpdate = React.useMemo(
    () =>
      transactions?.find(
        (transaction) => transaction.id === transactionIdToConfirmUpdate
      ),
    [transactionIdToConfirmUpdate, transactions]
  );
  const handleOpenUpdateTransactionDialog = (transactionId: number) => {
    setTransactionIdToConfirmUpdate(transactionId);
  };
  const handleCloseUpdateTransactionDialog = () => {
    setTransactionIdToConfirmUpdate(undefined);
  };
  const [updateTransactionMutation, { isLoading: updateTransactionLoading }] =
    useUpdateTransactionMutation();
  const handleUpdateTransaction = async (
    values: z.infer<typeof updateTransactionFormSchema>
  ) => {
    await updateTransactionMutation({
      id: transactionIdToConfirmUpdate,
      ledgerId: values.ledgerId,
      amount: values.amount,
      currencyId: values.currencyId,
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      date: values.date.toISOString(),
    });
    setTransactionIdToConfirmUpdate(undefined);
    refetchTransactions();
  };
  // ./Update related logic

  // Delete related logic
  const [deleteTransaction, { isLoading: deleteTransactionLoading }] =
    useDeleteTransactionMutation();
  const [transactionIdToConfirmDelete, setTransactionIdToConfirmDelete] =
    React.useState<number>();
  const handleOpenDeleteTransactionAlert = (transactionId: number) => {
    setTransactionIdToConfirmDelete(transactionId);
  };
  const handleDeleteTransaction = async () => {
    await deleteTransaction({
      id: transactionIdToConfirmDelete,
    });
    setTransactionIdToConfirmDelete(undefined);
    refetchTransactions();
  };
  const handleCloseDeleteTransactionAlert = () => {
    setTransactionIdToConfirmDelete(undefined);
  };
  // ./Delete related logic

  return (
    <>
      <div className="p-4 md:p-8">
        <div className="grid gap-4 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsDataTable
                transactionsToDisplay={transactionsToDisplay}
                onUpdateTransaction={handleOpenUpdateTransactionDialog}
                onDeleteTransaction={handleOpenDeleteTransactionAlert}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Add Transaction</CardTitle>
                <CardDescription>Create a new transaction.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
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

      <UpdateTransactionDialog
        open={transactionIdToConfirmUpdate !== undefined}
        handleClose={handleCloseUpdateTransactionDialog}
      >
        <UpdateTransactionForm
          transaction={transactionToUpdate}
          currencies={currencies}
          categories={categories}
          ledgers={ledgers}
          onSubmit={handleUpdateTransaction}
          isSubmitting={updateTransactionLoading}
        />
      </UpdateTransactionDialog>

      <DeleteTransactionAlertDialog
        open={transactionIdToConfirmDelete !== undefined}
        handleClose={handleCloseDeleteTransactionAlert}
        handleConfirmDelete={handleDeleteTransaction}
        deleteLoading={deleteTransactionLoading}
      />
    </>
  );
}
