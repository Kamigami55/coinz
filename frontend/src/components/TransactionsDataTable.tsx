'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';
import { TransactionToDisplay } from '@/lib/helper';
import { formatDate } from '@/lib/time';

export const columns: ColumnDef<TransactionToDisplay>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
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
];

export function TransactionsDataTable({
  transactionsToDisplay = [],
}: {
  transactionsToDisplay?: TransactionToDisplay[];
}) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={transactionsToDisplay} />
    </div>
  );
}
