'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Ledger,
  useGetLedgersQuery,
  useUpdateLedgerMutation,
} from '@/lib/services/coinzApi/ledgers';

const updateLedgerFormSchema = z.object({
  name: z.string().min(1).trim(),
});

export function UpdateLedgerFormDialog({
  ledger = undefined,
  handleClose,
}: {
  ledger?: Ledger;
  handleClose: () => void;
}) {
  const { refetch: refetchLedgers } = useGetLedgersQuery();

  const [updateLedger, { isLoading: updateLedgerLoading }] =
    useUpdateLedgerMutation();

  const form = useForm<z.infer<typeof updateLedgerFormSchema>>({
    resolver: zodResolver(updateLedgerFormSchema),
    defaultValues: {
      name: ledger?.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateLedgerFormSchema>) => {
    await updateLedger({
      id: ledger?.id,
      name: values.name,
    });
    // reset form
    form.reset();
    // refetch ledgers
    refetchLedgers();
    // close dialog
    handleClose();
  };

  React.useEffect(() => {
    if (ledger) {
      form.setValue('name', ledger.name);
    }
  }, [ledger, form]);

  return (
    <Dialog open={ledger !== undefined} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Ledger</DialogTitle>
          <DialogDescription>
            You can update the name of your ledger.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ledger name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={updateLedgerLoading}>
                {updateLedgerLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
