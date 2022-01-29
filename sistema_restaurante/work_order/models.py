from shutil import _ntuple_diskusage
from xml.etree.ElementTree import Comment
from django.db import models
from django.db.models.deletion import SET_NULL
from product.models import Product

class Table(models.Model):
    table_number = models.IntegerField()
    status = models.BooleanField()

    def __str__(self):
        return str(self.table_number)

class Order(models.Model):

    total_price = models.IntegerField(default=0)
    table = models.ForeignKey(Table,on_delete=SET_NULL, null = True)
    status = models.BooleanField(default=True)
    comment = models.TextField(max_length=0, blank = True)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de edición")
    def __srt__(self):
        return self.pk


class Order_Detail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product =  models.ForeignKey(Product, on_delete=SET_NULL, null = True)
    quantity_product = models.IntegerField()
    comment = models.TextField(max_length=200, null = True)
    status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de edición")
    def __srt__(self):
        return str(self.product.name)