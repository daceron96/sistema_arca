from django.urls import path
from .views import AddOrderView,TableListView, GetOrderDetail,GetProductList, GetDetail
from .views import CreateOrderView, UpdateOrderView, CancelDetailView,CancelOrderView,OrderListView
from .views import CreateTableView

work_order_patterns = ([    
    #path order
    path('create/',CreateOrderView.as_view(), name='create_order'),
    path('new-order/<int:table>/',AddOrderView.as_view(), name='order'),
    path('update-order/<int:pk>/',UpdateOrderView.as_view(), name='update_order'),
    path('cancel-detail/<int:pk>/',CancelDetailView.as_view(), name='cancel_detail'),
    path('cancel-order/<int:pk>/',CancelOrderView.as_view(), name='cancel_order'),
    path('order-list/',OrderListView.as_view(),name = 'order_list'),
    
    #PATH GETS json
    path('get-product/',GetProductList.as_view(), name='get_product'),
    path('get-detail/',GetDetail.as_view(), name='get_detail'),
    path('get-detail-order/',GetOrderDetail.as_view(), name='get_product'),
    
    #PATH TABLE
    path('table-list/', TableListView.as_view(), name ='table_list'),
    path('create-table/',CreateTableView.as_view(), name='create_table'),  
    
],'order')

