from django.urls import path
from .views import CreateProductView, UpdateProductView, DeleteProductView, ProductListView
from .views import CategoryListView, CreateCategoryView , DeleteCategoryView,  UpdateCategoryView

product_patterns = ([    
    #path product
    path('create/',CreateProductView.as_view(), name='create_product'),
    path('update/<int:pk>/',UpdateProductView.as_view(), name='update_product'),
    path('delete/<int:pk>/',DeleteProductView.as_view(), name='delete_product'),
    path('', ProductListView.as_view(), name='list_products'),
    
    #path category
    path('category/', CategoryListView.as_view(), name='list_categorys'),
    path('category/create/',CreateCategoryView.as_view(), name='create_category'),
    path('category/delete/<int:pk>/',DeleteCategoryView.as_view(), name='delete_category'),
    path('category/update/<int:pk>/',UpdateCategoryView.as_view(), name='update_product'),
    
    
],'product')