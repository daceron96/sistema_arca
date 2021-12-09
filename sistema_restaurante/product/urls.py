from django.urls import path
from .views import CategoryListView, ProductCreateView, ProductListView, filter_product_by_category

product_patterns = ([    
    #path product
    path('create/',ProductCreateView.as_view(), name='create'),
    path('', ProductListView.as_view(), name='list_products'),
    path('<int:pk>/filter/', filter_product_by_category, name='filter_category'),
    
    #path category
    path('category/', CategoryListView.as_view(), name='list_categorys'),
],'product')