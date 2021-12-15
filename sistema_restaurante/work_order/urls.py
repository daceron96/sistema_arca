from django.urls import path
from .views import AddOrderView

work_order_patterns = ([    
    #path product
    path('',AddOrderView.as_view(), name='order'),

],'order')