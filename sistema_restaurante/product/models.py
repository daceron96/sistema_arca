from django.db import models


class Work_Section(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    work_section = models.ForeignKey(Work_Section, on_delete = models.PROTECT)
    status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de edición")
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
class Product(models.Model):
    code = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    sale_price = models.IntegerField()
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    description = models.TextField()
    status = models.BooleanField(default= True)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de edición")
    
    class Meta:
        ordering = ['code']
        

    def __str__(self):
        return self.name
    