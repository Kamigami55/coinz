from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Ledger(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User, through='LedgerUser', related_name='ledgers')
    def __str__(self) -> str:
        return self.name

class LedgerUser(models.Model):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self) -> str:
        return f"{self.user.username} - {self.ledger.name}"

class Currency(models.Model):
    name = models.CharField(max_length=255, unique=True)
    abbreviation = models.CharField(max_length=255, unique=True)
    symbol = models.CharField(max_length=255)
    icon = models.CharField(max_length=255)
    def __str__(self) -> str:
        return self.abbreviation

class CurrencyConversion(models.Model):
    from_currency = models.ForeignKey(Currency, related_name='conversions_from', on_delete=models.CASCADE)
    to_currency = models.ForeignKey(Currency, related_name='conversions_to', on_delete=models.CASCADE)
    rate = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"{self.from_currency.abbreviation} to {self.to_currency.abbreviation}"

class Category(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    icon = models.CharField(max_length=255)

    EXPENSE = 'EXPENSE'
    INCOME = 'INCOME'
    CATEGORY_TYPES = [
        (EXPENSE, 'Expense'),
        (INCOME, 'Income'),
    ]
    type = models.CharField(max_length=7, choices=CATEGORY_TYPES, default=EXPENSE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"{self.icon} {self.name} ({self.type})"

class RecurringBill(models.Model):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE, related_name='recurring_bills')
    amount = models.FloatField()
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    interval_days = models.IntegerField()
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"{self.name} ({self.amount} {self.currency.abbreviation}) ({self.ledger.name} - {self.category.name}) every {self.interval_days} days from {self.start_date} to {self.end_date}"

class Transaction(models.Model):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE, related_name='transactions')
    amount = models.FloatField()
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    recurring_bill = models.ForeignKey(RecurringBill, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    def __str__(self) -> str:
        return f"{self.name} ({self.amount} {self.currency.abbreviation}) ({self.ledger.name} - {self.category.name})"

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    default_currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"{self.user.username}'s settings"
