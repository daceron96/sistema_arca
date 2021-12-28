from django.urls import path
from .views import AddOrderView,  GetProductList, CreateOrder

work_order_patterns = ([    
    #path product
    path('',AddOrderView.as_view(), name='order'),
    path('get-product/',GetProductList.as_view(), name='get_product'),
    path('add-order/',CreateOrder.as_view(), name='create_order'),

],'order')