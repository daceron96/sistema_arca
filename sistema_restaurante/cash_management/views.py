from django.shortcuts import render
from django.views.generic.list import ListView
from work_order.models import Order

class ListOrderView(ListView):
    model = Order
    