from coinz_api.models import User, Ledger, Currency, Category, RecurringBill, Transaction, UserSettings, CurrencyConversion
from rest_framework import permissions, viewsets

from coinz_api.serializers import UserSerializer, LedgerSerializer, CurrencySerializer, CategorySerializer, RecurringBillSerializer, TransactionSerializer, UserSettingsSerializer, CurrencyConversionSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class LedgerViewSet(viewsets.ModelViewSet):
    queryset = Ledger.objects.all().order_by('name')
    serializer_class = LedgerSerializer
    permission_classes = [permissions.IsAuthenticated]

class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all().order_by('name')
    serializer_class = CurrencySerializer
    permission_classes = [permissions.IsAuthenticated]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class RecurringBillViewSet(viewsets.ModelViewSet):
    queryset = RecurringBill.objects.all().order_by('name')
    serializer_class = RecurringBillSerializer
    permission_classes = [permissions.IsAuthenticated]

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('name')
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserSettingsViewSet(viewsets.ModelViewSet):
    # order by user join date
    queryset = UserSettings.objects.all().order_by('-user__date_joined')
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

class CurrencyConversionViewSet(viewsets.ModelViewSet):
    queryset = CurrencyConversion.objects.all().order_by('updated_at')
    serializer_class = CurrencyConversionSerializer
    permission_classes = [permissions.IsAuthenticated]
