'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransactionToDisplay } from '@/lib/helper';
import { formatDate } from '@/lib/time';

export function TransactionsDataTable({
  transactionsToDisplay = [],
  onUpdateTransaction = () => {},
  onDeleteTransaction = () => {},
}: {
  transactionsToDisplay?: TransactionToDisplay[];
  onUpdateTransaction: (transactionId: number) => void;
  onDeleteTransaction: (transactionId: number) => void;
}) {
  const columns: ColumnDef<TransactionToDisplay>[] = React.useMemo(
    () => [
      {
        accessorKey: 'date',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => formatDate(row.getValue('date')),
      },
      {
        id: 'category',
        accessorFn: ({ category }) => category?.icon + ' ' + category?.name,
        header: 'Category',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'amountInDisplayCurrency',
        header: 'Amount',
        cell: ({ row }) => {
          const textInDisplayCurrency = `${row.original.amountInDisplayCurrency.toFixed(row.original.displayCurrency.precision)} ${row.original.displayCurrency.abbreviation}`;
          const textInOriginalCurrency = `${row.original.amount.toFixed(row.original.currency.precision)} ${row.original.currency.abbreviation}`;
          if (row.original.displayCurrency.id === row.original.currencyId) {
            return textInDisplayCurrency;
          } else {
            return `${textInDisplayCurrency} (${textInOriginalCurrency})`;
          }
        },
      },
      {
        id: 'ledger',
        accessorFn: ({ ledger }) => ledger?.name,
        header: 'Ledger',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => onUpdateTransaction(row.original.id)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteTransaction(row.original.id)}
                >
                  Delete transaction
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onDeleteTransaction, onUpdateTransaction]
  );

  return <DataTable columns={columns} data={transactionsToDisplay} />;
}
