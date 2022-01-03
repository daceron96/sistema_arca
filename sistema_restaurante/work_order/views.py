import json
from typing import List
from django.db.models import fields
from django.db.models.fields import Field
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.core.serializers import serialize
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from .models import Order, Order_detail, Table
from product.models import Category, Product
from django.urls import reverse_lazy

#carga la vista principal ara agregar una nueva orden
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
    

#guarda la orden de pedido en la base de datos falta cambiar su metodo GET a POST      
def CreateOrder(request):
    if request.is_ajax():
        total_price = 0
        array_detail = json.loads(request.GET['data'])
        new_order = Order.objects.create(table = Table.objects.get(table_number = int(request.GET['table'])))
        for detail in array_detail:
            total_price = total_price + (int(detail['quantity_product']) * int(detail['sale_price']) )
            Order_detail.objects.create(
                order = new_order,
                product = Product.objects.get(code = int(detail['code'])),
                quantity_product = int(detail['quantity_product']),
                comment = detail['comment']
            )
        Order.objects.filter(pk=new_order.pk).update(total_price=total_price)
        Table.objects.filter(pk=new_order.table.pk).update(status=True)
	
    return redirect(reverse_lazy('order:table_list'))

class GetOrderDetail(ListView):
    model = Order_detail
    def get_queryset(self):
        print(self.request.GET['id_order'])
        return self.model.objects.filter(order__pk = self.request.GET['id_order'])
    
    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json',self.get_queryset()), 'application/json')
    

#listar las mesas creadas
class TableListView(ListView):
    model = Table
   
