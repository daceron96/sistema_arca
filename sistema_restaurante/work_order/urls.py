from django.urls import path
from .views import AddOrderView,TableListView, GetOrderDetail,GetProductList
from .views import CreateOrderView, UpdateOrderView

work_order_patterns = ([    
    #path order
    path('create/',CreateOrderView.as_view(), name='create_order'),
    path('new-order/<int:table>/',AddOrderView.as_view(), name='order'),
    path('update-order/<int:pk>/',UpdateOrderView.as_view(), name='update_order'),
    
    #PATH GETS json
    path('get-product/',GetProductList.as_view(), name='get_product'),
    path('get-detail-order/',GetOrderDetail.as_view(), name='get_product'),
    
    path('table-list/', TableListView.as_view(), name ='table_list'),
],'order')