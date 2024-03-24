'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Category } from '@/lib/services/coinzApi/categories';
import { Currency } from '@/lib/services/coinzApi/currencies';
import { Ledger } from '@/lib/services/coinzApi/ledgers';
import { Transaction } from '@/lib/services/coinzApi/transactions';
import { cn } from '@/lib/utils';

export const updateTransactionFormSchema = z.object({
  ledgerId: z.number(),
  amount: z.number().min(0, {
    message: 'Amount must be greater than 0.',
  }),
  currencyId: z.number(),
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  date: z.date(),
});

export function UpdateTransactionForm({
  transaction = undefined,
  currencies = [],
  categories = [],
  ledgers = [],
  onSubmit = async () => {},
  isSubmitting = false,
}: {
  transaction?: Transaction;
  currencies?: Currency[];
  categories?: Category[];
  ledgers?: Ledger[];
  onSubmit?: (
    values: z.infer<typeof updateTransactionFormSchema>
  ) => Promise<void>;
  isSubmitting?: boolean;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof updateTransactionFormSchema>>({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      ledgerId: transaction?.ledgerId ?? null,
      amount: transaction?.amount ?? null,
      currencyId: transaction?.currencyId ?? null,
      name: transaction?.name ?? '',
      description: transaction?.description ?? '',
      categoryId: transaction?.categoryId ?? null,
      date: new Date(transaction?.date) ?? new Date(),
    },
  });

  // 2. Define a submit handler.
  const handleSubmit = async (
    values: z.infer<typeof updateTransactionFormSchema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await onSubmit(values);
    // Success!
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        DateTime.fromJSDate(field.value).toLocaleString(
                          DateTime.DATE_SHORT
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Transaction name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Transaction details"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem
                      key={currency.id}
                      value={currency.id.toString()}
                    >
                      {currency.icon} {currency.abbreviation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ledger */}
        <FormField
          control={form.control}
          name="ledgerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ledger</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ledger" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ledgers.map((ledger) => (
                    <SelectItem key={ledger.id} value={ledger.id.toString()}>
                      {ledger.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Transaction amount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
