import { coinzApi } from '@/lib/services/coinzApi/baseApi';

interface RecurringBillResponse {
  id: number;
  ledger: number;
  amount: number;
  currency: number;
  name: string;
  description: string;
  interval_days: number;
  start_date: string;
  end_date: string;
  category: number;
  created_at: string;
  updated_at: string;
}

export interface RecurringBill {
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
    getRecurringBills: builder.query<RecurringBill[], void>({
      query: () => `/recurring_bills/`,
      transformResponse: (response: RecurringBillResponse[]) => {
        const formattedResponse = response.map(
          (recurringBill: RecurringBillResponse) =>
            ({
              id: recurringBill.id,
              ledgerId: recurringBill.ledger,
              amount: recurringBill.amount,
              currencyId: recurringBill.currency,
              name: recurringBill.name,
              description: recurringBill.description,
              intervalDays: recurringBill.interval_days,
              startDate: recurringBill.start_date,
              endDate: recurringBill.end_date,
              categoryId: recurringBill.category,
              createdAt: recurringBill.created_at,
              updatedAt: recurringBill.updated_at,
            }) as RecurringBill
        );
        return formattedResponse;
      },
    }),
  }),
});

export const { useGetRecurringBillsQuery } = coinzApiWithRecurringBills;
