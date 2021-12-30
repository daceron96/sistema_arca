from django.urls import path
from .import views

core_patterns = ([    
    path('',views.HomePageView.as_view(), name = 'home'),
    path('order-list/',views.ListOrderView.as_view(), name = 'order_list'),

],'core')
