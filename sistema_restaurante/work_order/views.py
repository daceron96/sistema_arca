import json
from django.http.response import HttpResponse, JsonResponse
from django.views.generic.base import TemplateView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView
from django.views.generic.list import ListView
from .models import Order, Order_Detail, Table
from product.models import Category, Product


# carga la vista principal ara agregar una nueva orden


class AddOrderView(TemplateView):
    template_name = 'work_order/order.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(status=True)
        return context


# -------------- Vistas de CRUD----------------
class CreateOrderView(CreateView):
    model = Order
    def post(self, *args, **kwargs):
        if self.request.is_ajax():
            array_detail = json.loads(self.request.POST['data'])
            new_order = self.model.objects.create(table=Table.objects.get(
            table_number=int(self.request.POST['table'])))
            for detail in array_detail:
                Order_Detail.objects.create(
                    order=new_order,
                    product=Product.objects.get(code=int(detail['code'])),
                    quantity_product=int(detail['quantity_product']),
                    comment=detail['comment']
                )
            Order.objects.filter(pk=new_order.pk).update(total_price=int(self.request.POST['total_price']))
            Table.objects.filter(pk=new_order.table.pk).update(status=True)
            response = JsonResponse({'menssaje':'mensaje'})
            return response

class UpdateOrderView(UpdateView):
    model = Order
    template_name = 'work_order/order.html'
    fields = '__all__'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(status=True)
        context['list_detail'] = Order_Detail.objects.filter(order__id = self.get_object().pk, status = True)
        return context

    def post(self,*args, **kwargs):
        if self.request.is_ajax():
            array_detail = json.loads(self.request.POST['data'])
            for detail in array_detail:
                try:
                    detail_exist = Order_Detail.objects.filter(pk = detail['id_detail'])
                    detail_exist.update(
                        quantity_product = int(detail['quantity_product']),
                        comment = detail['comment']
                    )
                except:
                    Order_Detail.objects.create(
                    order= self.get_object(),
                    product=Product.objects.get(code=int(detail['code'])),
                    quantity_product=int(detail['quantity_product']),
                    comment=detail['comment']
                )
            order = self.get_object()
            order.total_price = self.request.POST['total_price']
            order.save()
        response = JsonResponse({'menssaje':'mensaje'})
        return response        

class CancelDetailView(UpdateView):
    model = Order_Detail
    fields = '__all__'

    def post(self, *args, **kwargs):
        if self.request.is_ajax():
            detail = self.get_object()
            detail.comment = self.request.POST['comment']
            detail.status = False
            detail.save()
            order = detail.order
            order.total_price = order.total_price - (detail.quantity_product * detail.product.sale_price)
            order.save()
        response = JsonResponse({'menssaje':'mensaje'})
        return response    
#---------------Vistas de consulta----------------------
class GetProductList(ListView):
    model = Product

    def get_queryset(self):
        return self.model.objects.filter(category__pk=self.request.GET['id_category'])

    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            list_product = []
            for product in self.get_queryset():
                item = {}
                item['code'] = product.code
                item['name'] = product.name
                item['sale_price'] = product.sale_price
                list_product.append(item)
            data = json.dumps(list_product)
            return HttpResponse(data,'application/json')
#Editar orden de pedido

class GetDetail(DetailView):
    model = Order_Detail
        
    def get(self, request, *args, **kwargs):
        if self.request.is_ajax():
            detail = self.model.objects.get(pk = self.request.GET['pk'])
            return JsonResponse({
                "code": detail.product.code,
                'name' : detail.product.name,
                'sale_price' : detail.product.sale_price,
                'quantity_product' : detail.quantity_product,
                'comment' : detail.comment,
                'id_detail' : detail.pk
                })
        
# Mesas
class TableListView(ListView):
    model = Table
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order_list'] = Order.objects.filter(status=True, table__status = True)
        return context
    
class GetOrderDetail(ListView):
    model = Order_Detail

    def get_queryset(self):
        return self.model.objects.filter(order__pk=self.request.GET['id_order'], status = True)

    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            list_detail_order = []
            for detail in self.get_queryset():
                data = {}
                data['product'] = detail.product.name                 
                data['quantity_product'] = detail.quantity_product
                data['sale_price'] = detail.product.sale_price 
                list_detail_order.append(data)              
            
            response = JsonResponse({
                'data': list_detail_order,
                'id_order' : detail.order.id,
                'total_price' : detail.order.total_price,
                'table' : detail.order.table.table_number
            })
            
            return response     

class CancelOrderView(UpdateView):
    model = Order
    fields = '__all__'

    def post(self, *args, **kwargs):
        if self.request.is_ajax():
            order = self.get_object()
            order.comment = self.request.POST['comment']
            order.status = False
            order.save()
            table = order.table
            table.status= False
            table.save()
        response = JsonResponse({'menssaje':'mensaje'})
        return response    