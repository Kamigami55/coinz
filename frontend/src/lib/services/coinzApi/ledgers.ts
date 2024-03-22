import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface LedgerResponse {
  id: number;
  name: string;
  created_at: string;
  users: number[];
}

interface TransformedLedger {
  id: number;
  name: string;
  createdAt: string;
  userIds: number[];
}

const coinzApiWithLedgers = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getLedgers: builder.query<TransformedLedger[], void>({
      query: () => `/ledgers/`,
      transformResponse: (response: { results: LedgerResponse[] }) => {
        const formattedResponse = response.results.map(
          (ledger: LedgerResponse) =>
            ({
              id: ledger.id,
              name: ledger.name,
              createdAt: ledger.created_at,
              userIds: ledger.users,
            } as TransformedLedger)
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetLedgersQuery } = coinzApiWithLedgers;
