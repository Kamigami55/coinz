from django.contrib import admin

from coinz_api.models import User, Ledger, Currency, Category, RecurringBill, Transaction, UserSettings, CurrencyConversion, LedgerUser

class LedgerUserInline(admin.TabularInline):
    model = LedgerUser
    extra = 0

class UsersAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name']
    inlines = [LedgerUserInline]

class LedgerAdmin(admin.ModelAdmin):
    list_display = ['name', 'owners']
    def owners(self, obj):
        return ', '.join([user.username for user in obj.users.all()])
    inlines = [LedgerUserInline]

admin.site.register(User, UsersAdmin)
admin.site.register(Ledger, LedgerAdmin)
admin.site.register(Currency)
admin.site.register(CurrencyConversion)
admin.site.register(Category)
admin.site.register(RecurringBill)
admin.site.register(Transaction)
admin.site.register(UserSettings)
admin.site.register(LedgerUser)
