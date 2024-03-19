from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Ledger(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User, through='LedgerUser', related_name='ledgers')

class LedgerUser(models.Model):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Currency(models.Model):
    name = models.CharField(max_length=255, unique=True)
    abbreviation = models.CharField(max_length=255, unique=True)
    symbol = models.CharField(max_length=255)
    icon = models.CharField(max_length=255)

class CurrencyConversion(models.Model):
    from_currency = models.ForeignKey(Currency, related_name='conversions_from', on_delete=models.CASCADE)
    to_currency = models.ForeignKey(Currency, related_name='conversions_to', on_delete=models.CASCADE)
    rate = models.FloatField()
    updated_at = models.DateTimeField()

class Category(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    icon = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class RecurringBill(models.Model):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE)
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

class Transaction(models.Model):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE)
    amount = models.FloatField()
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    recurring_bill = models.ForeignKey(RecurringBill, on_delete=models.SET_NULL, null=True, blank=True)

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    default_currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
