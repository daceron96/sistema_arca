from django.contrib import admin
from .models import Order, Order_Detail, Table

admin.site.register(Order)
admin.site.register(Order_Detail)
admin.site.register(Table)