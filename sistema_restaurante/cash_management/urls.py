from django.urls import path
from .views import ListOrderView
cash_management_patterns = ([    
    #path order
    path('order-list/',ListOrderView.as_view(), name='order_list'),
   
],'cash')
