from django.contrib import admin
from .models import Order, Order_detail, Table

admin.site.register(Order)
admin.site.register(Order_detail)
admin.site.register(Table)