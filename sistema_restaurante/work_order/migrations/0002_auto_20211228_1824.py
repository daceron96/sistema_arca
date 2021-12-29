# Generated by Django 3.2.9 on 2021-12-28 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work_order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order_detail',
            name='comment',
            field=models.TextField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='total_price',
            field=models.IntegerField(default=0),
        ),
    ]