
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from work_order.models import Order

class HomePageView(TemplateView):
    template_name = 'core/home.html'
    
class DeskListView(TemplateView):
    template_name = 'core/desk_list.html'


class ListOrderView(ListView):
    model = Order
    template_name = 'core/order_list.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order'] = Order.objects.all()
        return context


    