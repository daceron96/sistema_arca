from django.core.serializers import serialize
from django.http.response import HttpResponse
from django.shortcuts import redirect
from django.views.generic.edit import CreateView, DeleteView
from django.views.generic.list import ListView
from .models import Product, Category
from .forms import ProductForm
from django.http import JsonResponse, request


#PRODUCT VIEWS
class ProductCreateView(CreateView):
    model = Product
    form_class = ProductForm
    def post(self,  *args, **kwargs):
        if self.request.is_ajax():
            form = self.form_class(self.request.POST)
            if form.is_valid():
                print('entre')
                product = self.model.objects.create(
                    code = form.cleaned_data.get('code'),
                    name = form.cleaned_data.get('name'),
                    sale_price = form.cleaned_data.get('sale_price'),
                    description = form.cleaned_data.get('description'),
                    category = form.cleaned_data.get('category')
                )
                response = JsonResponse({
                    'code':product.code,
                    'name':product.name,
                    'sale_price':product.sale_price,
                    'category':product.category.name,
                })
                response.status_code = 201
                return response
            
            else:
                error = form.errors
                response = JsonResponse({'error':error})
                response.status_code = 400
                return response
    

class ProductListView(ListView):
    model = Product
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categorys'] = Category.objects.filter(status = True)
        context['form'] = ProductForm
        
        return context 
    
    def get_queryset(self, **kwargs):
        object_list = self.model.objects.all()
        if('category' in self.request.GET.keys() or 'name_product' in self.request.GET.keys()):
            try:
                if(self.request.GET['category'] != 'all'):
                    object_list = self.model.objects.filter(category__id = self.request.GET['category'])
            except:
                object_list = self.model.objects.filter(name__icontains = self.request.GET['name_product'])
        
        return object_list
    
def filter_product_by_category(request, pk):
    json_response = {'filter':False}
    return JsonResponse(json_response)

#CATEGORY VIEWS

class CategoryListView(ListView):
    model = Category