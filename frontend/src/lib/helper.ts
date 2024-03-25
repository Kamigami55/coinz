import { Category } from '@/lib/services/coinzApi/categories';
import { Currency } from '@/lib/services/coinzApi/currencies';
import { CurrencyConversion } from '@/lib/services/coinzApi/currencyConversions';
import { Ledger } from '@/lib/services/coinzApi/ledgers';
import { Transaction } from '@/lib/services/coinzApi/transactions';

export type TransactionToDisplay = Transaction & {
  category: Category;
  currency: Currency;
  ledger: Ledger;
  displayCurrency: Currency;
  amountInDisplayCurrency: number;
};

export function getTransactionsToDisplay({
  displayCurrencyId,
  transactions,
  categories,
  currencies,
  currencyConversions,
  ledgers,
}: {
  displayCurrencyId: number;
  transactions: Transaction[];
  categories: Category[];
  currencies: Currency[];
  currencyConversions: CurrencyConversion[];
  ledgers: Ledger[];
}) {
  if (
    !displayCurrencyId ||
    !transactions?.length ||
    !categories?.length ||
    !currencies?.length ||
    !currencyConversions?.length ||
    !ledgers?.length
  ) {
    return [];
  }

  const displayCurrency = currencies.find(
    (currency) => currency.id === displayCurrencyId
  );

  return transactions.map((transaction) => {
    const category = categories.find(
      (category) => category.id === transaction.categoryId
    );
    const currency = currencies.find(
      (currency) => currency.id === transaction.currencyId
    );
    const ledger = ledgers.find((ledger) => ledger.id === transaction.ledgerId);
    let amountInDisplayCurrency = 0;
    if (displayCurrencyId === transaction.currencyId) {
      amountInDisplayCurrency = transaction.amount;
    } else {
      const conversion = currencyConversions.find(
        (conversion) =>
          conversion.fromCurrencyId === transaction.currencyId &&
          conversion.toCurrencyId === displayCurrencyId
      );
      if (conversion) {
        amountInDisplayCurrency = conversion.rate * transaction.amount;
      }
    }

    return {
      ...transaction,
      category,
      currency,
      ledger,
      displayCurrency,
      amountInDisplayCurrency,
    } as TransactionToDisplay;
  });
}

export function summarizeTransactionsByCategory(
  transactions: TransactionToDisplay[],
  displayCurrency: Currency
) {
  const summary = transactions.reduce(
    (
      acc: {
        id: string;
        label: string;
        value: number;
        color: string;
      }[],
      transaction
    ) => {
      const category = transaction.category;
      if (!category) {
        return acc;
      }
      const data = acc.find((data) => data.id === category.name);
      if (!data) {
        return [
          ...acc,
          {
            id: category.name,
            label: category.name,
            value: parseFloat(
              transaction.amountInDisplayCurrency.toFixed(
                transaction.displayCurrency.precision
              )
            ),
            color: category.color,
          },
        ];
      }
      return [
        ...acc.map((data) => {
          if (data.id === category.name) {
            return {
              ...data,
              value:
                data.value +
                parseFloat(
                  transaction.amountInDisplayCurrency.toFixed(
                    transaction.displayCurrency.precision
                  )
                ),
            };
          }
          return data;
        }),
      ];
    },
    []
  );

  const formattedSummary = summary.map((data) => {
    return {
      ...data,
      value: data.value.toFixed(displayCurrency.precision),
    };
  });

  return formattedSummary;
}

export function formatCurrency(amount: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.abbreviation ?? 'USD',
    maximumFractionDigits: currency?.precision ?? 2,
  }).format(amount);
}
