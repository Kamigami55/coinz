# Generated by Django 5.0.3 on 2024-03-19 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coinz_api', '0002_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='type',
            field=models.CharField(choices=[('EXPENSE', 'Expense'), ('INCOME', 'Income')], default='EXPENSE', max_length=7),
        ),
    ]
