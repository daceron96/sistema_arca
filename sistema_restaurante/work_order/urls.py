from django.urls import path
from .views import AddOrderView,  GetProductList

work_order_patterns = ([    
    #path product
    path('',AddOrderView.as_view(), name='order'),
    path('get-products/',GetProductList.as_view(), name='peticion'),

],'order')