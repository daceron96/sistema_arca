from django import forms
from django.forms import widgets 
from .models import Product, Category

class ProductForm(forms.ModelForm):
    
    class Meta:
        model = Product
        fields = ['code','name', 'sale_price', 'description','category']
        widgets = {
            'code' : forms.NumberInput(attrs={'class': 'form-control','placeholder':'Codigo del producto'},),
            'name' : forms.TextInput(attrs={'class': 'form-control','placeholder':'Nombre del producto'}, ),
            'sale_price' : forms.NumberInput(attrs={'class': 'form-control','placeholder':'Precio de venta'}, ),
            'description' : forms.Textarea(attrs={'class': 'form-control','placeholder':'Descripcion de ingredientes'}, ),
            'category' : forms.Select(attrs={'class': 'form-select'}, ),
        }
        
        labels = {
            'code' : 'Código',
            'name' : 'Nombre',
            'sale_price' : 'Precio',
            'description' : 'Descripción',
            'category' : 'Categoria',
            
        }