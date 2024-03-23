import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface TransactionResponse {
  id: number;
  ledger: number;
  amount: number;
  currency: number;
  name: string;
  description: string;
  category: number;
  created_at: string;
  updated_at: string;
  recurring_bill: number;
}

export interface Transaction {
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

interface AddTransactionRequestParams {
  ledgerId: number;
  amount: number;
  currencyId: number;
  name: string;
  description: string;
  categoryId: number;
  recurringBillId?: number;
}

interface UpdateTransactionRequestParams {
  id: number;
  ledgerId?: number;
  amount?: number;
  currencyId?: number;
  name?: string;
  description?: string;
  categoryId?: number;
  recurringBillId?: number;
}

interface UpdateTransactionRequest {
  ledger?: number;
  amount?: number;
  currency?: number;
  name?: string;
  description?: string;
  category?: number;
  recurring_bill?: number;
}

interface AddTransactionRequest {
  ledger: number;
  amount: number;
  currency: number;
  name: string;
  description: string;
  category: number;
  recurring_bill?: number;
}

interface DeleteTransactionRequestParams {
  id: number;
}

const coinzApiWithTransactions = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => `/transactions/`,
      transformResponse: (response: { results: TransactionResponse[] }) => {
        const formattedResponse = response.results.map(
          (transaction: TransactionResponse) =>
            ({
              id: transaction.id,
              ledgerId: transaction.ledger,
              amount: transaction.amount,
              currencyId: transaction.currency,
              name: transaction.name,
              description: transaction.description,
              categoryId: transaction.category,
              createdAt: transaction.created_at,
              updatedAt: transaction.updated_at,
              recurringBillId: transaction.recurring_bill,
            }) as Transaction
        );
        return formattedResponse;
      },
    }),
    // =========================================================================
    addTransaction: builder.mutation<Transaction, AddTransactionRequestParams>({
      query: (params: AddTransactionRequestParams) => ({
        url: `/transactions/`,
        method: 'POST',
        body: {
          ledger: params.ledgerId,
          amount: params.amount,
          currency: params.currencyId,
          name: params.name,
          description: params.description,
          category: params.categoryId,
          recurring_bill: params.recurringBillId,
        } as AddTransactionRequest,
      }),
      transformResponse: (response: TransactionResponse) =>
        ({
          id: response.id,
          ledgerId: response.ledger,
          amount: response.amount,
          currencyId: response.currency,
          name: response.name,
          description: response.description,
          categoryId: response.category,
          createdAt: response.created_at,
          updatedAt: response.updated_at,
          recurringBillId: response.recurring_bill,
        }) as Transaction,
    }),
    // =========================================================================
    updateTransaction: builder.mutation<
      Transaction,
      UpdateTransactionRequestParams
    >({
      query: (params: UpdateTransactionRequestParams) => ({
        url: `/transactions/${params.id}/`,
        method: 'PUT',
        body: {
          ledger: params.ledgerId,
          amount: params.amount,
          currency: params.currencyId,
          name: params.name,
          description: params.description,
          category: params.categoryId,
          recurring_bill: params.recurringBillId,
        } as UpdateTransactionRequest,
      }),
      transformResponse: (response: TransactionResponse) =>
        ({
          id: response.id,
          ledgerId: response.ledger,
          amount: response.amount,
          currencyId: response.currency,
          name: response.name,
          description: response.description,
          categoryId: response.category,
          createdAt: response.created_at,
          updatedAt: response.updated_at,
          recurringBillId: response.recurring_bill,
        }) as Transaction,
    }),
    // =========================================================================
    deleteTransaction: builder.mutation<void, DeleteTransactionRequestParams>({
      query: (params: DeleteTransactionRequestParams) => ({
        url: `/transactions/${params.id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = coinzApiWithTransactions;
