/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { Counter } from '@/components/Counter';
import {
  useGetCategoriesQuery,
  useGetCurrenciesQuery,
  useGetCurrencyConversionsQuery,
  useGetLedgersQuery,
  useGetRecurringBillsQuery,
  useGetTransactionsQuery,
  useGetUserQuery,
  useGetUserSettingQuery,
} from '@/lib/services/coinzApi';

export default function Home() {
  const userId = '1';
  const {
    data: currencies,
    isLoading: currenciesLoading,
    isError: currenciesError,
  } = useGetCurrenciesQuery({});
  const {
    data: currencyConversions,
    isLoading: currencyConversionsLoading,
    isError: currencyConversionsError,
  } = useGetCurrencyConversionsQuery({});
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery({});
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
  } = useGetLedgersQuery({});
  const {
    data: transactions,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useGetTransactionsQuery({});
  const {
    data: recurringBills,
    isLoading: recurringBillsLoading,
    isError: recurringBillsError,
  } = useGetRecurringBillsQuery({});

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
      </div>
    </div>
  );
}
