from django.urls import path
from .views import AddOrderView,TableListView, GetOrderDetail,GetProductList
from .views import CreateOrderView

work_order_patterns = ([    
    #path product
    path('add-order/',CreateOrderView.as_view(), name='create_order'),
    path('create-order/<int:table>/',AddOrderView.as_view(), name='order'),
    
    #PATH GETS json
    path('get-product/',GetProductList.as_view(), name='get_product'),
    path('get-detail-order/',GetOrderDetail.as_view(), name='get_product'),
    
    path('table-list/', TableListView.as_view(), name ='table_list'),
],'order')