from django.shortcuts import render
from django.views.generic.base import TemplateView

from .models import Order
from product.models import Category

class AddOrderView(TemplateView):
    template_name ='work_order/order.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(status = True)
        return context
    