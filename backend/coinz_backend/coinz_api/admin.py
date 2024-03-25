from django.contrib import admin

from coinz_api.models import User, Ledger, Currency, Category, RecurringBill, Transaction, UserSettings, CurrencyConversion, LedgerUser

class LedgerUserInline(admin.TabularInline):
    model = LedgerUser
    extra = 0

class UsersAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name']
    inlines = [LedgerUserInline]

class LedgerAdmin(admin.ModelAdmin):
    list_display = ['name', 'owners', 'transaction_count']
    list_filter = ['users']
    def owners(self, obj):
        return ', '.join([user.username for user in obj.users.all()])
    def transaction_count(self, obj):
        return obj.transactions.count()
    inlines = [LedgerUserInline]

class TransactionAdmin(admin.ModelAdmin):
    list_display = ['name', 'amount', 'currency', 'ledger', 'category', 'date']
    list_filter = ['ledger', 'category', 'date', 'currency']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color', 'icon', 'type', 'transaction_count']
    list_filter = ['type']
    def transaction_count(self, obj):
        return obj.transactions.count()

class CurrencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'abbreviation', 'symbol', 'icon', 'precision']

class CurrencyConversionAdmin(admin.ModelAdmin):
    list_display = ['__str__','from_currency', 'to_currency', 'rate']

class UserSettingsAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'default_currency', 'display_currency']

class LedgerUserAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user', 'ledger']
    list_filter = ['user', 'ledger']

admin.site.register(User, UsersAdmin)
admin.site.register(Ledger, LedgerAdmin)
admin.site.register(Currency, CurrencyAdmin)
admin.site.register(CurrencyConversion, CurrencyConversionAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(RecurringBill)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(UserSettings, UserSettingsAdmin)
admin.site.register(LedgerUser, LedgerUserAdmin)
