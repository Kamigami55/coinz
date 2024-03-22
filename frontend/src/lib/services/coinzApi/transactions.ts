import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface TransactionResponse {
  id: number;
  ledger_id: number;
  amount: number;
  currency_id: number;
  name: string;
  description: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  recurring_bill_id: number;
}

interface TransformedTransaction {
  id: number;
  ledgerId: number;
  amount: number;
  currencyId: number;
  name: string;
  description: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  recurringBillId: number;
}

const coinzApiWithTransactions = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TransformedTransaction[], void>({
      query: () => `/transactions/`,
      transformResponse: (response: { results: TransactionResponse[] }) => {
        const formattedResponse = response.results.map(
          (transaction: TransactionResponse) =>
            ({
              id: transaction.id,
              ledgerId: transaction.ledger_id,
              amount: transaction.amount,
              currencyId: transaction.currency_id,
              name: transaction.name,
              description: transaction.description,
              categoryId: transaction.category_id,
              createdAt: transaction.created_at,
              updatedAt: transaction.updated_at,
              recurringBillId: transaction.recurring_bill_id,
            } as TransformedTransaction)
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetTransactionsQuery } = coinzApiWithTransactions;
