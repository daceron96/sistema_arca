from typing import List
from django.db import models
from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView
from .models import Product, Category
from .forms import ProductForm
from django.urls import reverse_lazy
from django.http import JsonResponse


#PRODUCT VIEWS
class ProductCreateView(CreateView):
    model = Product
    form_class = ProductForm
    success_url = reverse_lazy('product:products')
 
class ProductListView(ListView):
    
    model = Product
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categorys'] = Category.objects.filter(status = True)
        return context 
    
def filter_product_by_category(request, pk):
    json_response = {'filter':False}
    return JsonResponse(json_response)

#CATEGORY VIEWS

class CategoryListView(ListView):
    model = Category