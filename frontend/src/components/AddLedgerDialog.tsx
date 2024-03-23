'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
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
  DialogTrigger,
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
  useAddLedgerMutation,
  useGetLedgersQuery,
} from '@/lib/services/coinzApi/ledgers';

const addLedgerFormSchema = z.object({
  name: z.string().min(1).trim(),
});

export function AddLedgerDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { refetch: refetchLedgers } = useGetLedgersQuery();

  const [addLedger, { isLoading: addLedgerLoading }] = useAddLedgerMutation();

  const form = useForm<z.infer<typeof addLedgerFormSchema>>({
    resolver: zodResolver(addLedgerFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof addLedgerFormSchema>) => {
    await addLedger({
      name: values.name,
    });
    // reset form
    form.reset();
    // refetch ledgers
    refetchLedgers();
    // close dialog
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Ledger</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new ledger</DialogTitle>
          <DialogDescription>
            You can create a new ledger to track your expenses and income in a
            specific account.
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
              <Button type="submit" disabled={addLedgerLoading}>
                {addLedgerLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <span>Add Ledger</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
