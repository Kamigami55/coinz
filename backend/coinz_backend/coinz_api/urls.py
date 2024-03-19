# from django.urls import path

# from . import views

# urlpatterns = [
#     path("", views.index, name="index"),
# ]

from rest_framework import routers
from coinz_api import views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'ledgers', views.LedgerViewSet)
router.register(r'currencies', views.CurrencyViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'recurring_bills', views.RecurringBillViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'user_settings', views.UserSettingsViewSet)
router.register(r'currency_conversions', views.CurrencyConversionViewSet)

urlpatterns = router.urls
