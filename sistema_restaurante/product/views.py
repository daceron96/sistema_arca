from typing import List
from django.db import models
from django.shortcuts import redirect, render
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView
from .models import Product, Category
from .forms import ProductForm
from django.urls import reverse_lazy
from django.http import JsonResponse, request


#PRODUCT VIEWS
class ProductCreateView(CreateView):
    model = Product
    form_class = ProductForm
    def post(self,*args, **kwargs):
        if self.request.is_ajax():
            form = self.form_class(self.request.POST)
            if form.is_valid():
                self.model.objects.create(
                    code = form.cleaned_data.get('code'),
                    name = form.cleaned_data.get('name'),
                    sale_price = form.cleaned_data.get('sale_price'),
                    description = form.cleaned_data.get('description'),
                    category = form.cleaned_data.get('category')
                )
                return redirect(reverse_lazy('order:table_list'))
            else:
                pass

class ProductListView(ListView):
    model = Product
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categorys'] = Category.objects.filter(status = True)
        context['form'] = ProductForm
        return context 
    
def filter_product_by_category(request, pk):
    json_response = {'filter':False}
    return JsonResponse(json_response)

#CATEGORY VIEWS

class CategoryListView(ListView):
    model = Category