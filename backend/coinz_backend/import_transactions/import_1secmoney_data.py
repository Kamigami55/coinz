# How to run:
# (In /backend/coinz_backend/ directory)
# poetry run python manage.py shell
# from import_transactions.import_1secmoney_data import import_transactions_from_csv
# import_transactions_from_csv('./import_transactions/eason-1secmoney-data.csv')

import csv
from django.utils.dateparse import parse_datetime
from coinz_api.models import Transaction, Category, Currency, Ledger  # Adjust the import path as necessary

# Example function to insert CSV data into the database
def import_transactions_from_csv(csv_filepath):
    with open(csv_filepath, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Assuming you have a ledger and currency set up beforehand
            # Find ledger with name "Personal" and belongs to user "eason"
            ledger = Ledger.objects.get(name='Personal', users__username='eason')
            currency = Currency.objects.get(abbreviation='NTD')
            category_name = row['Category']
            category_type = row['Category Type']
            if category_type == 'Income':
                category_type = "INCOME"
            else:
                category_type = "EXPENSE"
            # python ternary operator
            category_icon = '💰' if category_type == 'EXPENSE' else '💸'
            category_color = 'red' if category_type == 'EXPENSE' else 'green'
            category, _ = Category.objects.get_or_create(name=category_name, defaults={'color': category_color, 'icon': category_icon, 'type': category_type})
            # Convert date/time format and create a new transaction
            date = parse_datetime(row['Date/Time'])
            Transaction.objects.create(
                ledger=ledger,
                amount=float(row['Amount']),
                currency=currency,
                name=row['Item'],
                description=row['Note'],
                category=category,
                date=date
            )

if __name__ == '__main__':
    # Call the function with the path to your CSV file
    import_transactions_from_csv('./eason-1secmoney-data.csv')
