/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import { useState } from 'react';

import { Counter } from '@/components/Counter';
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

export default function DebugPage() {
  const userId = '1';

  const {
    data: currencies,
    isLoading: currenciesLoading,
    isError: currenciesError,
  } = useGetCurrenciesQuery();
  const {
    data: currencyConversions,
    isLoading: currencyConversionsLoading,
    isError: currencyConversionsError,
  } = useGetCurrencyConversionsQuery();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: userSetting,
    isLoading: userSettingLoading,
    isError: userSettingError,
  } = useGetUserSettingQuery({ userId });
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery({ userId });
  const {
    data: ledgers,
    isLoading: ledgersLoading,
    isError: ledgersError,
  } = useGetLedgersQuery();
  const {
    data: transactions,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useGetTransactionsQuery();
  const {
    data: recurringBills,
    isLoading: recurringBillsLoading,
    isError: recurringBillsError,
  } = useGetRecurringBillsQuery();

  const [addTransactionMutation, { isLoading: addTransactionLoading }] =
    useAddTransactionMutation();

  const [ledger, setLedger] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<number>(1);

  const handleAddTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTransactionMutation({
      ledgerId: ledger,
      amount: Number(amount),
      currencyId: currency,
      name: name,
      description: description,
      categoryId: category,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="p-12">
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Time Zone Converter</h1>
          <h2 className="text-lg font-medium text-[#7C7C7C] dark:text-[#DFDFDF]">
            Easily convert time between different timezones and compare
            overlapping time periods.
          </h2>
          <Counter />
          Currencies: {JSON.stringify(currencies)}
          <br />
          <br />
          Currency Conversions: {JSON.stringify(currencyConversions)}
          <br />
          <br />
          Categories: {JSON.stringify(categories)}
          <br />
          <br />
          User Setting: {JSON.stringify(userSetting)}
          <br />
          <br />
          User: {JSON.stringify(user)}
          <br />
          <br />
          Ledgers: {JSON.stringify(ledgers)}
          <br />
          <br />
          Transactions: {JSON.stringify(transactions)}
          <br />
          <br />
          Recurring Bills: {JSON.stringify(recurringBills)}
        </div>

        {/* A simple form to add a transaction */}
        <form onSubmit={handleAddTransaction}>
          <div className="flex flex-col gap-2">
            <label htmlFor="ledger">Ledger</label>
            <select
              id="ledger"
              name="ledger"
              value={ledger}
              onChange={(e) => setLedger(parseInt(e.target.value))}
            >
              {ledgers?.map((ledger) => (
                <option key={ledger.id} value={ledger.id}>
                  {ledger.name}
                </option>
              ))}
            </select>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(parseInt(e.target.value))}
            >
              {currencies?.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name}
                </option>
              ))}
            </select>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(parseInt(e.target.value))}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}
