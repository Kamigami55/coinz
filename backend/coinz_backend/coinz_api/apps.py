from django.apps import AppConfig


class CoinzApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'coinz_api'

    def ready(self):
        import coinz_api.signals
