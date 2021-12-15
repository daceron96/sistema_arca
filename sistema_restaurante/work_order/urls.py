from django.urls import path
from .views import AddOrderView, prueba, peticion

work_order_patterns = ([    
    #path product
    path('',AddOrderView.as_view(), name='order'),
    path('prueba/',prueba.as_view(), name='prueba'),
    path('peticion/',peticion.as_view(), name='peticion'),

],'order')