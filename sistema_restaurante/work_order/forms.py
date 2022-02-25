from django import forms 
from .models import Table

class TableForm(forms.ModelForm):
    class Meta:
        model = Table
        fields = ['table_number']
        widgets = {
            'table_number' : forms.NumberInput(attrs={'class': 'form-control','placeholder':'Número de mesa'},),
        }
        
        labels = {
            'table_number' : 'Número',
        }
            
        error_messages = {
            'table_number': {
                'unique': "Ya existe una mesa registrada con este mismo número."
            },
        }
      