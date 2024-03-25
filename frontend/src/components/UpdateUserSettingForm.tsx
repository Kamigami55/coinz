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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Currency } from '@/lib/services/coinzApi/currencies';

export const updateUserSettingFormSchema = z.object({
  displayCurrencyId: z.number(),
});

export function UpdateUserSettingForm({
  currencies = [],
  displayCurrencyId,
  onSubmit = async () => {},
  isSubmitting = false,
}: {
  currencies?: Currency[];
  displayCurrencyId?: number;
  onSubmit?: (
    values: z.infer<typeof updateUserSettingFormSchema>
  ) => Promise<void>;
  isSubmitting?: boolean;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof updateUserSettingFormSchema>>({
    resolver: zodResolver(updateUserSettingFormSchema),
    defaultValues: {
      displayCurrencyId: displayCurrencyId ?? null,
    },
  });

  // 2. Define a submit handler.
  const handleSubmit = async (
    values: z.infer<typeof updateUserSettingFormSchema>
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
          name="displayCurrencyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Currency</FormLabel>
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
