'use client';

import { Loader2, PencilIcon, Trash2Icon } from 'lucide-react';
import * as React from 'react';

import { AddLedgerDialog } from '@/components/AddLedgerDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UpdateLedgerFormDialog } from '@/components/UpdateLedgerFormDialog';
import {
  Ledger,
  useDeleteLedgerMutation,
  useGetLedgersQuery,
} from '@/lib/services/coinzApi/ledgers';
import { formatDate } from '@/lib/time';
import { cn } from '@/lib/utils';

export default function SettingsLedgersPage() {
  const { data: ledgers, refetch: refetchLedgers } = useGetLedgersQuery();
  const [isEditing, setIsEditing] = React.useState(false);

  // Delete related logic
  const [deleteLedger, { isLoading: deleteLedgerLoading }] =
    useDeleteLedgerMutation();
  const [ledgerIdToConfirmDelete, setLedgerIdToConfirmDelete] =
    React.useState<number>();
  const ledgerToConfirmDelete = React.useMemo(
    () => ledgers?.find((ledger) => ledger.id === ledgerIdToConfirmDelete),
    [ledgerIdToConfirmDelete, ledgers]
  );
  const handleOpenDeleteLedgerAlert = (ledgerId: number) => {
    setLedgerIdToConfirmDelete(ledgerId);
  };
  const handleCloseDeleteLedgerAlert = () => {
    setLedgerIdToConfirmDelete(undefined);
  };
  const handleDeleteLedger = async () => {
    await deleteLedger({
      id: ledgerIdToConfirmDelete,
    });
    refetchLedgers();
    handleCloseDeleteLedgerAlert();
  };
  // ./Delete related logic

  const [ledgerToUpdate, setLedgerToUpdate] = React.useState<Ledger>();
  const handleCloseUpdateLedgerDialog = () => {
    setLedgerToUpdate(undefined);
  };

  return (
    <>
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ledgers</CardTitle>
              <CardDescription className="mt-2">
                Your ledgers are the accounts that you use to track your
                expenses and income.
              </CardDescription>
            </div>
            <div className="flex flex-row items-center gap-2">
              <AddLedgerDialog />
              <Button
                variant="secondary"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Transaction Count</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgers?.map((ledger) => (
                  <TableRow key={ledger.id}>
                    <TableCell className="font-medium">{ledger.name}</TableCell>
                    <TableCell>{formatDate(ledger.createdAt)}</TableCell>
                    <TableCell>{ledger.transactionCount}</TableCell>
                    <TableCell className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setLedgerToUpdate(ledger)}
                        className={cn(isEditing ? 'visible' : 'invisible')}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleOpenDeleteLedgerAlert(ledger.id)}
                        className={cn(isEditing ? 'visible' : 'invisible')}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Confirm delete ledger alert dialog */}
      <AlertDialog
        open={ledgerIdToConfirmDelete !== undefined}
        onOpenChange={handleCloseDeleteLedgerAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete ledger?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your ledger:{' '}
              <b>{ledgerToConfirmDelete?.name}</b>, and all of its{' '}
              <b>{ledgerToConfirmDelete?.transactionCount}</b> transactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLedger}
              disabled={deleteLedgerLoading}
            >
              {deleteLedgerLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete</span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update ledger dialog */}
      <UpdateLedgerFormDialog
        ledger={ledgerToUpdate}
        handleClose={handleCloseUpdateLedgerDialog}
      />
    </>
  );
}
