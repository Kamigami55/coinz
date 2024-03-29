# Generated by Django 5.0.3 on 2024-03-24 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coinz_api', '0006_transaction_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recurringbill',
            old_name='interval_days',
            new_name='interval_amount',
        ),
        migrations.AddField(
            model_name='recurringbill',
            name='interval_unit',
            field=models.CharField(choices=[('DAY', 'Day'), ('WEEK', 'Week'), ('MONTH', 'Month'), ('YEAR', 'Year')], default='DAY', max_length=5),
        ),
        migrations.AlterField(
            model_name='recurringbill',
            name='start_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
