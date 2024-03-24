import { DateTime } from 'luxon';

import { TransactionToDisplay } from '@/lib/helper';

export function TransactionsTable({
  transactionsToDisplay = [],
}: {
  transactionsToDisplay?: TransactionToDisplay[];
}) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Ledger
                </th>
                <th
                  scope="col"
                  className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactionsToDisplay.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                    {DateTime.fromISO(transaction.createdAt).toLocaleString(
                      DateTime.DATETIME_SHORT
                    )}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {transaction.category.icon} {transaction.category.name}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                    {transaction.name}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    {transaction.amountInDisplayCurrency}{' '}
                    {transaction.displayCurrency.abbreviation}
                    {transaction.displayCurrency.id !==
                      transaction.currencyId &&
                      ` (${transaction.amount} ${transaction.currency.abbreviation})`}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    {transaction?.ledger?.name}
                  </td>
                  <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {transaction.id}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
