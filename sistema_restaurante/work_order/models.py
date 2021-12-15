from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import SET_NULL
from product.models import Product

class Order(models.Model):

    total_price = models.IntegerField()
    status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de edición")
    def __srt__(self):
        return self.pk


class Order_detail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product =  models.ForeignKey(Product, on_delete=SET_NULL, null = True)
    product_quantity = models.IntegerField()
    def __srt__(self):
        return self.product.name