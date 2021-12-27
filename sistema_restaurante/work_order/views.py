from django.http.response import HttpResponse
from django.shortcuts import redirect
from django.core.serializers import serialize
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from .models import Order
from product.models import Category, Product

class AddOrderView(TemplateView):
    template_name ='work_order/order.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(status = True)
        return context

#vista que obtiene la lista de productos de acuerdo al id de la categoria que se recibe
class GetProductList(ListView):
    model = Product
    def get_queryset(self):
        return self.model.objects.filter(category__pk = self.request.GET['id_category']) 
    
    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json',self.get_queryset()), 'application/json')
        else:
            return redirect('order:prueba')
        
        