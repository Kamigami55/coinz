from rest_framework import serializers
from coinz_api.models import User, Ledger, Currency, Category, RecurringBill, Transaction, UserSettings, CurrencyConversion

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class LedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ledger
        fields = ['id', 'name']

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id', 'name', 'abbreviation', 'symbol', 'icon']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'icon', 'type']

class RecurringBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringBill
        fields = ['id', 'amount', 'currency', 'name', 'description', 'interval_days', 'start_date', 'end_date', 'category']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'currency', 'name', 'description', 'category']

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ['id', 'default_currency']

class CurrencyConversionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyConversion
        fields = ['id', 'from_currency', 'to_currency', 'rate', 'updated_at']
