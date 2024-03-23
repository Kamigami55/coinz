'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransactionToDisplay } from '@/lib/helper';
import { formatDate } from '@/lib/time';

export const columns: ColumnDef<TransactionToDisplay>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    id: 'category',
    accessorFn: ({ category }) => category.icon + ' ' + category.name,
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
      const textInDisplayCurrency = `${row.original.amountInDisplayCurrency} ${row.original.displayCurrency.abbreviation}`;
      const textInOriginalCurrency = `${row.original.amount} ${row.original.currency.abbreviation}`;
      if (row.original.displayCurrency.id === row.original.currencyId) {
        return textInDisplayCurrency;
      } else {
        return `${textInDisplayCurrency} (${textInOriginalCurrency})`;
      }
    },
  },
  {
    id: 'ledger',
    accessorFn: ({ ledger }) => ledger.name,
    header: 'Ledger',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const payment = row.original;

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
            // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TransactionsDataTable({
  transactionsToDisplay = [],
}: {
  transactionsToDisplay?: TransactionToDisplay[];
}) {
  return <DataTable columns={columns} data={transactionsToDisplay} />;
}
