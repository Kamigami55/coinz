from django.contrib import admin

from coinz_api.models import User, Ledger, Currency, Category, RecurringBill, Transaction, UserSettings, CurrencyConversion

admin.site.register(User)
admin.site.register(Ledger)
admin.site.register(Currency)
admin.site.register(CurrencyConversion)
admin.site.register(Category)
admin.site.register(RecurringBill)
admin.site.register(Transaction)
admin.site.register(UserSettings)
