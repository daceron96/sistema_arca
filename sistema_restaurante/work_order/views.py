import json
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.core.serializers import serialize
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from .models import Order, Order_detail
from product.models import Category, Product
from django.urls import reverse_lazy


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
        
        
def CreateOrder(request):
    if request.is_ajax():
        total_price = 0
        array_detail = json.loads(request.GET['data'])
        new_order = Order.objects.create()
        for detail in array_detail:
            total_price = total_price + (int(detail['quantity_product']) * int(detail['sale_price']) )
            Order_detail.objects.create(
                order = new_order,
                product = Product.objects.get(code = int(detail['code'])),
                quantity_product = int(detail['quantity_product']),
                comment = detail['comment']
            )
        new_order.total_price = total_price
        new_order.save()
	
    return redirect(reverse_lazy('core:desk_list'))
