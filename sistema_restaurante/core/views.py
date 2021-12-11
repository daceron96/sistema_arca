
from django.shortcuts import render
from django.views.generic.base import TemplateView

class HomePageView(TemplateView):
    template_name = 'core/home.html'
    
class DeskListView(TemplateView):
    template_name = 'core/desk_list.html'
    
class AddOrderView(TemplateView):
    template_name = 'core/add_order.html'