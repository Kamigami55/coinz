import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface RecurringBillResponse {
  id: number;
  ledger_id: number;
  amount: number;
  currency_id: number;
  name: string;
  description: string;
  interval_days: number;
  start_date: string;
  end_date: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}

interface TransformedRecurringBill {
  id: number;
  ledgerId: number;
  amount: number;
  currencyId: number;
  name: string;
  description: string;
  intervalDays: number;
  startDate: string;
  endDate: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

const coinzApiWithRecurringBills = coinzApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecurringBills: builder.query<TransformedRecurringBill[], void>({
      query: () => `/recurring_bills/`,
      transformResponse: (response: { results: RecurringBillResponse[] }) => {
        const formattedResponse = response.results.map(
          (recurringBill: RecurringBillResponse) =>
            ({
              id: recurringBill.id,
              ledgerId: recurringBill.ledger_id,
              amount: recurringBill.amount,
              currencyId: recurringBill.currency_id,
              name: recurringBill.name,
              description: recurringBill.description,
              intervalDays: recurringBill.interval_days,
              startDate: recurringBill.start_date,
              endDate: recurringBill.end_date,
              categoryId: recurringBill.category_id,
              createdAt: recurringBill.created_at,
              updatedAt: recurringBill.updated_at,
            } as TransformedRecurringBill)
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetRecurringBillsQuery } = coinzApiWithRecurringBills;
