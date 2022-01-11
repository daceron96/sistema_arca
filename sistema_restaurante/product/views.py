from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.views.generic.list import ListView
from .models import Product, Category
from .forms import ProductForm, CategoryForm
from django.http import JsonResponse, response


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
        context['categorys'] = Category.objects.all()
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
    template_name = 'category/category.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = CategoryForm
        
        return context 

class CreateCategoryView(ListView):
    model = Category
    form_class = CategoryForm
    def post(self,*args, **kwargs):
        if self.request.is_ajax():
            form = self.form_class(self.request.POST)
            if form.is_valid():
                category = self.model.objects.create(
                    name = form.cleaned_data.get('name'),
                    description = form.cleaned_data.get('description'),
                    work_section = form.cleaned_data.get('work_section')
                )
                response = JsonResponse({
                    'id' : category.id,
                    'name' : category.name,
                    'description' : category.description,
                    'work_section' : category.work_section.name
                })
                response.status_code = 201
                return response
            else:
                error = form.errors
                response = JsonResponse({'error':error})
                response.status_code = 400
                return response

class DeleteCategoryView(DeleteView):
    model = Category
    def get(self, *args, **kwargs):
        self.object = self.get_object()
        id = self.object.id
        self.object.delete()    
        response = JsonResponse({'id':id})
        return response


class UpdateCategoryView(UpdateView):
    model = Category
    form_class = CategoryForm
    def post(self,*args, **kwargs):
        if self.request.is_ajax():
            form = self.form_class(self.request.POST, instance = self.get_object())
            if form.is_valid():
                form.save()
                object = self.get_object()
                response = JsonResponse({
                    'id' : object.id,
                    'name' : object.name,
                    'description' : object.description,
                    'work_section' : object.work_section.name
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
                    'id' : object.id,
                    'name' : object.name,
                    'description' : object.description,
                    'work_section' : object.work_section.id
                })
            return response
  