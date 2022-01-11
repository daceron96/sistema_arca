from django import forms 
from .models import Product, Category

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['code','name', 'sale_price', 'description','category']
        widgets = {
            'code' : forms.NumberInput(attrs={'class': 'form-control','placeholder':'Codigo del producto'},),
            'name' : forms.TextInput(attrs={'class': 'form-control','placeholder':'Nombre del producto'}, ),
            'sale_price' : forms.NumberInput(attrs={'class': 'form-control','placeholder':'Precio de venta'}, ),
            'description' : forms.Textarea(attrs={'class': 'form-control','placeholder':'Descripcion de ingredientes', 'rows':'3' }, ),
            'category' : forms.Select(attrs={'class': 'form-select'}, ),
        }
        
        labels = {
            'code' : 'Código',
            'name' : 'Nombre',
            'sale_price' : 'Precio',
            'description' : 'Descripción',
            'category' : 'Categoria',
        }
            
        error_messages = {
            'code': {
                'unique': "Ya existe un producto registrado con este mismo código."
            },
        }
        
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        
        fields = ['name','description','work_section']
        widgets = {
            'name' : forms.TextInput(attrs={'class':'form-control', 'placeholder':'Nombre de la categoria'}),
            'description' : forms.Textarea(attrs={'class':'form-control', 'placeholder':'Descripción de la categoria', 'rows':'3'}),
            'work_section' : forms.Select(attrs ={'class':'form-select'})
            
        }
        labels = {
            'name' : 'Nombre',
            'description' : 'Descripcion',
            'work_section' : 'Seccion',
        }