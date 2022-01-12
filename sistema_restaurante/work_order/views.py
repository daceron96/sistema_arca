import json
from typing import List
from django.db.models import fields
from django.db.models.fields import Field
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.core.serializers import serialize
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView
from .models import Order, Order_detail, Table
from product.models import Category, Product
from django.urls import reverse_lazy

# carga la vista principal ara agregar una nueva orden


class AddOrderView(TemplateView):
    template_name = 'work_order/order.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(status=True)
        return context

# vista que obtiene la lista de productos de acuerdo al id de la categoria que se recibe


class GetProductList(ListView):
    model = Product

    def get_queryset(self):
        return self.model.objects.filter(category__pk=self.request.GET['id_category'])

    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset()), 'application/json')


# guarda la orden de pedido en la base de datos falta cambiar su metodo GET a POST
class CreateOrderView(CreateView):
    model = Order
    def post(self, *args, **kwargs):
        if self.request.is_ajax():
            total_price = 0
            array_detail = json.loads(self.request.POST['data'])
            new_order = self.model.objects.create(table=Table.objects.get(
            table_number=int(self.request.POST['table'])))
            for detail in array_detail:
                total_price = total_price + (int(detail['quantity_product']) * int(detail['sale_price']))
                Order_detail.objects.create(
                    order=new_order,
                    product=Product.objects.get(code=int(detail['code'])),
                    quantity_product=int(detail['quantity_product']),
                    comment=detail['comment']
                )
            Order.objects.filter(pk=new_order.pk).update(total_price=total_price)
            Table.objects.filter(pk=new_order.table.pk).update(status=True)
            response = JsonResponse({'menssaje':'mensaje'})
            return response


class GetOrderDetail(ListView):
    model = Order_detail

    def get_queryset(self):
        return self.model.objects.filter(order__pk=self.request.GET['id_order'])

    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            list_detail_order = []
            for detail in self.get_queryset():
                data = {}
                data['id_order'] = detail.order.id   
                data['product'] = detail.product.name                 
                data['quantity_product'] = detail.quantity_product
                data['sale_price'] = detail.product.sale_price 
                data['sale_price'] = detail.product.sale_price 
                list_detail_order.append(data)              
            
            response = JsonResponse({
                'data': list_detail_order,
            })
            
            return response        
# listar las mesas creadas
class TableListView(ListView):
    model = Table
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order_list'] = Order.objects.filter(status=True, table__status = True)
        return context