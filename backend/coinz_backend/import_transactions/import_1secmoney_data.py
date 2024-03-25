# How to run:
# (In /backend/coinz_backend/ directory)
# poetry run python manage.py shell
# from import_transactions.import_1secmoney_data import import_transactions_from_csv
# import_transactions_from_csv('./import_transactions/eason-1secmoney-data.csv')

import csv
from django.utils.dateparse import parse_datetime
from coinz_api.models import Transaction, Category, Currency, Ledger  # Adjust the import path as necessary

# Possible values for the category column
# ['娛樂' '生產力' '交通' '生活' '食物' '居住' '薪資' '收入' '社交' '投資' '保險']
# Def a translation dictionary to convert to english
category_translation = {
    '娛樂': 'Entertainment',
    '生產力': 'Production',
    '交通': 'Transportation',
    '生活': 'Life',
    '食物': 'Food',
    '居住': 'Housing',
    '薪資': 'Salary',
    '收入': 'Income',
    '社交': 'Social',
    '投資': 'Investment',
    '保險': 'Insurance',
}

# Possible values for the item column
# ['電影' '閱讀' '工具' 'Gogoro' '生活' '點心' '晚餐' '早餐' '午餐' '飲料' '宵夜' '客運' '捷運' '宿舍'
#  '鞋子' '電費' '計程車' '飛機' '租屋' '課程' '飾物' '火車' nan '傢俱' 'Ubike' '日用品' '食材' '訂閱'
#  '旅行' '帽子' '褲子' '上衣' '飾品' '遊戲' '獎金' '學費' '書' '販賣' 'WeMo' '還錢' '雜項' '禮物'
#  '用品' '油錢' '旅宿' 'GoShare' '咖啡廳' '公車' '醫療' '停車' 'iRent' '活動' '基金' '水' '服飾'
#  '展覽' '薪資' '保險' '洗衣服' '接案' '電子書' '小廢物' '繳稅' 'YouBike' '回饋' '高鐵' '租車' '投資'
#  '剪頭髮' '手續費']
item_translation = {
    '電影': 'Movie',
    '閱讀': 'Reading',
    '工具': 'Tools',
    'Gogoro': 'Gogoro',
    '生活': 'Life',
    '點心': 'Dessert',
    '晚餐': 'Dinner',
    '早餐': 'Breakfast',
    '午餐': 'Lunch',
    '飲料': 'Drink',
    '宵夜': 'Night out',
    '客運': 'Passenger Bus',
    '捷運': 'MRT',
    '宿舍': 'Dormitory',
    '鞋子': 'Shoes',
    '電費': 'Electricity',
    '計程車': 'Taxi',
    '飛機': 'Airplane',
    '租屋': 'Rent',
    '課程': 'Course',
    '飾物': 'Decoration',
    '火車': 'Train',
    '傢俱': 'Furniture',
    'Ubike': 'Ubike',
    '日用品': 'Groceries',
    '食材': 'Food',
    '訂閱': 'Subscription',
    '旅行': 'Travel',
    '帽子': 'Hat',
    '褲子': 'Pants',
    '上衣': 'Clothes',
    '飾品': 'Decoration',
    '遊戲': 'Game',
    '獎金': 'Prize',
    '學費': 'Education',
    '書': 'Book',
    '販賣': 'Sell',
    'WeMo': 'WeMo',
    '還錢': 'Receivable',
    '雜項': 'Miscellaneous',
    '禮物': 'Gift',
    '用品': 'Use',
    '油錢': 'Oil',
    '旅宿': 'Accommodation',
    'GoShare': 'GoShare',
    '咖啡廳': 'Coffee house',
    '公車': 'Bus',
    '醫療': 'Health',
    '停車': 'Parking',
    'iRent': 'iRent',
    '活動': 'Event',
    '基金': 'Fund',
    '水': 'Water',
    '服飾': 'Clothing',
    '展覽': 'Exhibition',
    '薪資': 'Salary',
    '保險': 'Insurance',
    '洗衣服': 'Laundry',
    '接案': 'Case',
    '電子書': 'E-book',
    '小廢物': 'Useless items',
    '繳稅': 'Tax',
    'YouBike': 'YouBike',
    '回饋': 'Cashback',
    '高鐵': 'High speed rail',
    '租車': 'Car rental',
    '投資': 'Investment',
    '剪頭髮': 'Hair cut',
    '手續費': 'Fee',
}

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
            category_name = category_translation.get(category_name, category_name)
            category_type = row['Category Type']
            if category_type == 'Income':
                category_type = "INCOME"
            else:
                category_type = "EXPENSE"
            # python ternary operator
            category_icon = '💰' if category_type == 'EXPENSE' else '💸'
            category_color = 'red' if category_type == 'EXPENSE' else 'green'
            category, _ = Category.objects.get_or_create(name=category_name, defaults={'color': category_color, 'icon': category_icon, 'type': category_type})
            transaction_name = row['Item']
            transaction_name = item_translation.get(transaction_name, transaction_name)
            # Convert date/time format and create a new transaction
            date = parse_datetime(row['Date/Time'])
            Transaction.objects.create(
                ledger=ledger,
                amount=float(row['Amount']),
                currency=currency,
                name=transaction_name,
                description=row['Note'],
                category=category,
                date=date
            )

if __name__ == '__main__':
    # Call the function with the path to your CSV file
    import_transactions_from_csv('./eason-1secmoney-data.csv')
