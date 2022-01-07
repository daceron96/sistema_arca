from django.urls import path
from .views import CreateProductView, UpdateProductView, DeleteProductView, ProductListView
from .views import CategoryListView

product_patterns = ([    
    #path product
    path('create/',CreateProductView.as_view(), name='create'),
    path('update/<int:pk>/',UpdateProductView.as_view(), name='update'),
    path('delete/<int:pk>/',DeleteProductView.as_view(), name='delete'),
    path('', ProductListView.as_view(), name='list_products'),
    
    #path category
    path('category/', CategoryListView.as_view(), name='list_categorys'),
],'product')