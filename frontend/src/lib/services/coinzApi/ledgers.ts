import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface LedgerResponse {
  id: number;
  name: string;
  created_at: string;
  users: number[];
  transaction_count: number;
}

export interface Ledger {
  id: number;
  name: string;
  createdAt: string;
  userIds: number[];
  transactionCount: number;
}

interface AddLedgerRequestParams {
  name: string;
}

interface AddLedgerRequest {
  name: string;
}

interface UpdateLedgerRequestParams {
  id: number;
  name: string;
}

interface UpdateLedgerRequest {
  name: string;
}

interface DeleteLedgerRequestParams {
  id: number;
}

const coinzApiWithLedgers = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getLedgers: builder.query<Ledger[], void>({
      query: () => `/ledgers/`,
      transformResponse: (response: LedgerResponse[]) => {
        const formattedResponse = response.map(
          (ledger: LedgerResponse) =>
            ({
              id: ledger.id,
              name: ledger.name,
              createdAt: ledger.created_at,
              userIds: ledger.users,
              transactionCount: ledger.transaction_count,
            }) as Ledger
        );
        return formattedResponse;
      },
    }),
    // =========================================================================
    addLedger: builder.mutation<Ledger, AddLedgerRequestParams>({
      query: (params: AddLedgerRequestParams) => ({
        url: `/ledgers/`,
        method: 'POST',
        body: {
          name: params.name,
        } as AddLedgerRequest,
      }),
      transformResponse: (response: LedgerResponse) =>
        ({
          id: response.id,
          name: response.name,
          createdAt: response.created_at,
          userIds: [],
        }) as Ledger,
    }),
    // =========================================================================
    updateLedger: builder.mutation<Ledger, UpdateLedgerRequestParams>({
      query: (params: UpdateLedgerRequestParams) => ({
        url: `/ledgers/${params.id}/`,
        method: 'PUT',
        body: {
          name: params.name,
        } as UpdateLedgerRequest,
      }),
      transformResponse: (response: LedgerResponse) =>
        ({
          id: response.id,
          name: response.name,
          createdAt: response.created_at,
          userIds: [],
        }) as Ledger,
    }),
    // =========================================================================
    deleteLedger: builder.mutation<void, DeleteLedgerRequestParams>({
      query: (params: DeleteLedgerRequestParams) => ({
        url: `/ledgers/${params.id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetLedgersQuery,
  useAddLedgerMutation,
  useUpdateLedgerMutation,
  useDeleteLedgerMutation,
} = coinzApiWithLedgers;
