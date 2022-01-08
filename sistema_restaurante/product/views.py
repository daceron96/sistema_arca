from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.views.generic.list import ListView
from .models import Product, Category
from .forms import ProductForm
from django.http import JsonResponse, request


#PRODUCT VIEWS
class CreateProductView(CreateView):
    model = Product
    form_class = ProductForm
    def post(self,  *args, **kwargs):
        if self.request.is_ajax():
            form = self.form_class(self.request.POST)
            if form.is_valid():
                product = self.model.objects.create(
                    code = form.cleaned_data.get('code'),
                    name = form.cleaned_data.get('name'),
                    sale_price = form.cleaned_data.get('sale_price'),
                    description = form.cleaned_data.get('description'),
                    category = form.cleaned_data.get('category')
                )
                response = JsonResponse({
                    'id' : product.id,
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

class UpdateProductView(UpdateView):
    model = Product
    form_class = ProductForm
    def post(self,*args, **kwargs):
        if self.request.is_ajax():
            form = self.form_class(self.request.POST, instance = self.get_object())
            if form.is_valid():
                form.save()
                object = self.get_object()
                response = JsonResponse({
                    'id': object.id,
                    'code':object.code,
                    'name':object.name,
                    'sale_price':object.sale_price,
                    'category':object.category.name,
                })
                response.status_code = 201
                return response
            else:
                error = form.errors
                response = JsonResponse({'error':error})
                response.status_code = 400
                return response
   
    def get(self, request, *args, **kwargs):
        if self.request.is_ajax():
            object = self.get_object()
            response = JsonResponse({
                'id':object.id,
                'code':object.code,
                'name':object.name,
                'sale_price':object.sale_price,
                'description':object.description,
                'category':object.category.id,
            })
            return response
        
class DeleteProductView(DeleteView):
    model = Product
    def get(self, *args, **kwargs):
        self.object = self.get_object()
        code = self.object.code
        self.object.delete()    
        response = JsonResponse({'code':code})
        return response
        
class ProductListView(ListView):
    model = Product
    template_name = 'product/product.html'
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
    


#CATEGORY VIEWS

class CategoryListView(ListView):
    model = Category