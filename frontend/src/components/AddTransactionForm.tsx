'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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

export const addTransactionFormSchema = z.object({
  ledgerId: z.number(),
  amount: z.number().min(0, {
    message: 'Amount must be greater than 0.',
  }),
  currencyId: z.number(),
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
});

export function AddTransactionForm({
  currencies = [],
  categories = [],
  ledgers = [],
  onAddTransaction = () => {},
  isSubmitting = false,
}: {
  currencies?: Currency[];
  categories?: Category[];
  ledgers?: Ledger[];
  onAddTransaction: (values: z.infer<typeof addTransactionFormSchema>) => void;
  isSubmitting?: boolean;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addTransactionFormSchema>>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      ledgerId: ledgers?.length ? ledgers[0].id : null,
      amount: null,
      currencyId: currencies?.length ? currencies[0].id : null,
      name: '',
      description: '',
      categoryId: categories?.length ? categories[0].id : null,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addTransactionFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onAddTransaction(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <span>Adding...</span>
            </>
          ) : (
            <span>Add transaction</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
