'use client';

import { AddLedgerDialog } from '@/components/AddLedgerDialog';
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
import { useGetLedgersQuery } from '@/lib/services/coinzApi/ledgers';
import { formatDate } from '@/lib/time';

export default function SettingsLedgersPage() {
  const { data: ledgers } = useGetLedgersQuery();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ledgers</CardTitle>
            <CardDescription className="mt-2">
              Your ledgers are the accounts that you use to track your expenses
              and income.
            </CardDescription>
          </div>

          <AddLedgerDialog />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgers?.map((ledger) => (
                <TableRow key={ledger.id}>
                  <TableCell className="font-medium">{ledger.name}</TableCell>
                  <TableCell>{formatDate(ledger.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
